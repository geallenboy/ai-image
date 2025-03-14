import { SupabaseClient } from '@supabase/supabase-js';
import { cache } from 'react';

export const getUser = cache(async (supabase: SupabaseClient) => {
    const {
        data: { user }
    } = await supabase.auth.getUser();
    const { data: session } = await supabase.auth.getSession();

    console.log(session, "session")
    return user;
});

export const getSubscription = cache(async (supabase: SupabaseClient) => {
    const { data: subscription } = await supabase
        .from('ai_image_subscriptions')
        .select('*, prices(*, products(*))')
        .in('status', ['trialing', 'active'])
        .maybeSingle();

    return subscription;
});

export const getProducts = cache(async (supabase: SupabaseClient) => {
    const { data: products } = await supabase
        .from('ai_image_products')
        .select('*, prices(*)')
        .eq('active', true)
        .eq('prices.active', true)
        .order('id')
        .order('unit_amount', { referencedTable: 'prices' });

    return products;
});

export const getUserDetails = cache(async (supabase: SupabaseClient) => {
    const { data: userDetails } = await supabase
        .from('ai_image_users')
        .select('*')
        .single();
    return userDetails;
});