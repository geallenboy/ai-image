import { toDateTime } from '@/lib/helpers';
import { stripe } from '@/lib/stripe/config';
import Stripe from 'stripe';
import type { Json, Tables, TablesInsert } from '@datatypes.types';
import { supabaseAdmin } from '@/lib/supabase/admin';

type Product = Tables<'ai_image_products'>;
type Price = Tables<'ai_image_prices'>;

// Change to control trial period length
const TRIAL_PERIOD_DAYS = 0;



const upsertProductRecord = async (product: Stripe.Product) => {
    const productData: Product = {
        id: product.id,
        active: product.active,
        name: product.name,
        description: product.description ?? null,
        image: product.images?.[0] ?? null,
        metadata: product.metadata
    };

    const { error: upsertError } = await supabaseAdmin
        .from('ai_image_products')
        .upsert([productData]);
    if (upsertError)
        throw new Error(`Product insert/update failed: ${upsertError.message}`);
    console.log(`Product inserted/updated: ${product.id}`);
};

const upsertPriceRecord = async (
    price: Stripe.Price,
    retryCount = 0,
    maxRetries = 3
) => {
    const priceData: Price = {
        id: price.id,
        product_id: typeof price.product === 'string' ? price.product : '',
        active: price.active,
        currency: price.currency,
        type: price.type,
        unit_amount: price.unit_amount ?? null,
        interval: price.recurring?.interval ?? null,
        interval_count: price.recurring?.interval_count ?? null,
        trial_period_days: price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS,
        description: null,
        metadata: price.metadata ?? null
    };

    const { error: upsertError } = await supabaseAdmin
        .from('ai_image_prices')
        .upsert([priceData]);

    if (upsertError?.message.includes('foreign key constraint')) {
        if (retryCount < maxRetries) {
            console.log(`Retry attempt ${retryCount + 1} for price ID: ${price.id}`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await upsertPriceRecord(price, retryCount + 1, maxRetries);
        } else {
            throw new Error(
                `Price insert/update failed after ${maxRetries} retries: ${upsertError.message}`
            );
        }
    } else if (upsertError) {
        throw new Error(`Price insert/update failed: ${upsertError.message}`);
    } else {
        console.log(`Price inserted/updated: ${price.id}`);
    }
};

const deleteProductRecord = async (product: Stripe.Product) => {
    const { error: deletionError } = await supabaseAdmin
        .from('ai_image_products')
        .delete()
        .eq('id', product.id);
    if (deletionError)
        throw new Error(`Product deletion failed: ${deletionError.message}`);
    console.log(`Product deleted: ${product.id}`);
};

const deletePriceRecord = async (price: Stripe.Price) => {
    const { error: deletionError } = await supabaseAdmin
        .from('ai_image_prices')
        .delete()
        .eq('id', price.id);
    if (deletionError) throw new Error(`Price deletion failed: ${deletionError.message}`);
    console.log(`Price deleted: ${price.id}`);
};

const upsertCustomerToSupabase = async (uuid: string, customerId: string) => {
    const { error: upsertError } = await supabaseAdmin
        .from('ai_image_customers')
        .upsert([{ id: uuid, stripe_customer_id: customerId }]);

    if (upsertError)
        throw new Error(`Supabase customer record creation failed: ${upsertError.message}`);

    return customerId;
};

const createCustomerInStripe = async (uuid: string, email: string) => {
    const customerData = { metadata: { supabaseUUID: uuid }, email: email };
    const newCustomer = await stripe.customers.create(customerData);
    if (!newCustomer) throw new Error('Stripe customer creation failed.');

    return newCustomer.id;
};

const createOrRetrieveCustomer = async ({
    email,
    uuid
}: {
    email: string;
    uuid: string;
}) => {
    // Check if the customer already exists in Supabase
    const { data: existingSupabaseCustomer, error: queryError } =
        await supabaseAdmin
            .from('ai_image_customers')
            .select('*')
            .eq('id', uuid)
            .maybeSingle();

    if (queryError) {
        throw new Error(`Supabase customer lookup failed: ${queryError.message}`);
    }

    // Retrieve the Stripe customer ID using the Supabase customer ID, with email fallback
    let stripeCustomerId: string | undefined;
    if (existingSupabaseCustomer?.stripe_customer_id) {
        const existingStripeCustomer = await stripe.customers.retrieve(
            existingSupabaseCustomer.stripe_customer_id
        );
        stripeCustomerId = existingStripeCustomer.id;
    } else {
        // If Stripe ID is missing from Supabase, try to retrieve Stripe customer ID by email
        const stripeCustomers = await stripe.customers.list({ email: email });
        stripeCustomerId =
            stripeCustomers.data.length > 0 ? stripeCustomers.data[0].id : undefined;
    }

    // If still no stripeCustomerId, create a new customer in Stripe
    const stripeIdToInsert = stripeCustomerId
        ? stripeCustomerId
        : await createCustomerInStripe(uuid, email);
    if (!stripeIdToInsert) throw new Error('Stripe customer creation failed.');

    if (existingSupabaseCustomer && stripeCustomerId) {
        // If Supabase has a record but doesn't match Stripe, update Supabase record
        if (existingSupabaseCustomer.stripe_customer_id !== stripeCustomerId) {
            const { error: updateError } = await supabaseAdmin
                .from('ai_image_customers')
                .update({ stripe_customer_id: stripeCustomerId })
                .eq('id', uuid);

            if (updateError)
                throw new Error(
                    `Supabase customer record update failed: ${updateError.message}`
                );
            console.warn(
                `Supabase customer record mismatched Stripe ID. Supabase record updated.`
            );
        }
        // If Supabase has a record and matches Stripe, return Stripe customer ID
        return stripeCustomerId;
    } else {
        console.warn(
            `Supabase customer record was missing. A new record was created.`
        );

        // If Supabase has no record, create a new record and return Stripe customer ID
        const upsertedStripeCustomer = await upsertCustomerToSupabase(
            uuid,
            stripeIdToInsert
        );
        if (!upsertedStripeCustomer)
            throw new Error('Supabase customer record creation failed.');

        return upsertedStripeCustomer;
    }
};

/**
 * Copies the billing details from the payment method to the customer object.
 */
const copyBillingDetailsToCustomer = async (
    uuid: string,
    payment_method: Stripe.PaymentMethod
) => {
    //Todo: check this assertion
    const customer = payment_method.customer as string;
    const { name, phone, address } = payment_method.billing_details;
    if (!name || !phone || !address) return;
    // 添加正确的类型定义来避免类型错
    // 处理 address 中可能存在的 null 值，转换为 undefined
    const sanitizedAddress = address ? {
        ...address,
        city: address.city || undefined,
        country: address.country || undefined,
        line1: address.line1 || undefined,
        line2: address.line2 || undefined,
        postal_code: address.postal_code || undefined,
        state: address.state || undefined
    } : undefined;

    await stripe.customers.update(customer, {
        name: name || undefined,
        phone: phone || undefined,
        address: sanitizedAddress
    });
    const { error: updateError } = await supabaseAdmin
        .from('ai_image_users')
        .update({
            billing_address: { ...address },
            payment_method: { ...payment_method[payment_method.type] }
        })
        .eq('id', uuid);
    if (updateError) throw new Error(`Customer update failed: ${updateError.message}`);
};

const manageSubscriptionStatusChange = async (
    subscriptionId: string,
    customerId: string,
    createAction = false
) => {
    // Get customer's UUID from mapping table.
    const { data: customerData, error: noCustomerError } = await supabaseAdmin
        .from('ai_image_customers')
        .select('id')
        .eq('stripe_customer_id', customerId)
        .single();

    if (noCustomerError)
        throw new Error(`Customer lookup failed: ${noCustomerError.message}`);

    const { id: uuid } = customerData!;

    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
        expand: ['default_payment_method']
    });
    // Upsert the latest status of the subscription object.
    const subscriptionData: TablesInsert<'ai_image_subscriptions'> = {
        id: subscription.id,
        user_id: uuid,
        metadata: subscription.metadata,
        // 将 subscription.status 转换为符合目标类型的值
        status: subscription.status as "active" | "canceled" | "incomplete" | "incomplete_expired" | "past_due" | "trialing" | "unpaid" | null | undefined,
        price_id: subscription.items.data[0].price.id,
        // 处理 quantity 属性不存在的情况
        quantity: subscription.items.data[0].quantity,
        cancel_at_period_end: subscription.cancel_at_period_end,
        cancel_at: subscription.cancel_at
            ? toDateTime(subscription.cancel_at).toISOString()
            : null,
        canceled_at: subscription.canceled_at
            ? toDateTime(subscription.canceled_at).toISOString()
            : null,
        current_period_start: toDateTime(
            subscription.current_period_start
        ).toISOString(),
        current_period_end: toDateTime(
            subscription.current_period_end
        ).toISOString(),
        created: toDateTime(subscription.created).toISOString(),
        ended_at: subscription.ended_at
            ? toDateTime(subscription.ended_at).toISOString()
            : null,
        trial_start: subscription.trial_start
            ? toDateTime(subscription.trial_start).toISOString()
            : null,
        trial_end: subscription.trial_end
            ? toDateTime(subscription.trial_end).toISOString()
            : null
    };

    const { error: upsertError } = await supabaseAdmin
        .from('ai_image_subscriptions')
        .upsert([subscriptionData]);
    if (upsertError)
        throw new Error(`Subscription insert/update failed: ${upsertError.message}`);
    console.log(
        `Inserted/updated subscription [${subscription.id}] for user [${uuid}]`
    );


    if (createAction && subscription.default_payment_method && uuid)

        await copyBillingDetailsToCustomer(
            uuid,
            subscription.default_payment_method as Stripe.PaymentMethod
        );
};

const updateUserCredits = async (userId: string, metadata: Json) => {
    const creditsData: TablesInsert<"ai_image_credits"> = {
        user_id: userId,
        image_generation_count: (metadata as { image_generation_count?: number }).image_generation_count ?? 0,
        model_training_count: (metadata as { model_training_count?: number }).model_training_count ?? 0,
        max_image_generation_count: (metadata as { image_generation_count?: number }).image_generation_count ?? 0,
        max_model_training_count: (metadata as { model_training_count?: number }).model_training_count ?? 0,
    }
    const { error: upsertError } = await supabaseAdmin.from("ai_image_credits").upsert(creditsData).eq("user_id", userId)
    if (upsertError) {
        throw new Error(`Credits update failed:${upsertError.message}`)
    }
    console.log("update credits for the user", userId)
}

export {
    upsertProductRecord,
    updateUserCredits,
    upsertPriceRecord,
    deleteProductRecord,
    deletePriceRecord,
    createOrRetrieveCustomer,
    manageSubscriptionStatusChange
};