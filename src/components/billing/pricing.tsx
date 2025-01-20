"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tables } from "@datatypes.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User } from "@supabase/supabase-js";
import { checkoutWithStripe, createStripePortal } from "@/lib/stripe/server";
import { usePathname, useRouter } from "next/navigation";
import { getErrorRedirect } from "@/lib/helpers";
import { getStripe } from "@/lib/stripe/client";
import { toast } from "sonner";

type Product = Tables<"products">;
type Price = Tables<"prices">;
type Subscription = Tables<"subscriptions">;

interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface PricingProps {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  products: ProductWithPrices[] | [];
  mostPopularProduct?: string;
  showInterval?: boolean;
  className?: string;
  activeProduct?: string;
}
const renderPricingButton = ({
  subscription,
  user,
  product,
  price,
  mostPopularProduct,
  hanleStripePortalRequest,
  hanleStripeCheckout,
}: {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  product: ProductWithPrices;
  price: Price;
  mostPopularProduct: string;
  hanleStripePortalRequest: () => Promise<void>;
  hanleStripeCheckout: (price: Price) => Promise<void>;
}) => {
  //case1:user has sactive sub for this product
  if (
    user &&
    subscription &&
    subscription.prices?.products?.name?.toLowerCase() ===
      product.name?.toLowerCase()
  ) {
    return (
      <Button
        className="mt-8 w-full font-semibold"
        variant={"default"}
        onClick={() => hanleStripePortalRequest}
      >
        Manage Subscription
      </Button>
    );
  }
  // case2: logged in user with no subs or defferent subscriptions
  if (user && subscription) {
    return (
      <Button
        className="mt-8 w-full font-semibold"
        variant={"secondary"}
        onClick={() => hanleStripePortalRequest}
      >
        Switch Plan
      </Button>
    );
  }
  //case1: user is logged in and has an active subscription for a different product
  if (user && !subscription) {
    return (
      <Button
        className="mt-8 w-full font-semibold"
        variant={
          product.name?.toLowerCase() === mostPopularProduct.toLowerCase()
            ? "default"
            : "secondary"
        }
        onClick={() => hanleStripeCheckout(price)}
      >
        Subscribe
      </Button>
    );
  }
  //case1: User has active subscription for this account

  return (
    <Button
      className="mt-8 w-full font-semibold"
      variant={
        product.name?.toLowerCase() === mostPopularProduct.toLowerCase()
          ? "default"
          : "secondary"
      }
      onClick={() => hanleStripeCheckout(price)}
    >
      Subscribe
    </Button>
  );
};

const Pricing = ({
  user,
  products,
  subscription,
  mostPopularProduct = "",
  showInterval = true,
  className = "",
  activeProduct = "",
}: PricingProps) => {
  const [billingInterval, setBillingInterval] = useState("month");
  const currentPath = usePathname();
  const router = useRouter();
  console.log(products, subscription);
  const hanleStripeCheckout = async (price: Price) => {
    console.log("Handle stripe checkout function:", price);
    if (!user) {
      return router.push("/login");
    }
    const { errorRedirect, sessionId } = await checkoutWithStripe(
      price,
      "/billing"
    );
    if (errorRedirect) {
      return router.push(errorRedirect);
    }

    if (!sessionId) {
      return router.push(
        getErrorRedirect(
          currentPath,
          "An unkniw error occurred",
          "Please try again laterr or contanct us."
        )
      );
    }

    const stripe = await getStripe();
    stripe?.redirectToCheckout({ sessionId });
  };
  const hanleStripePortalRequest = async () => {
    toast.info("Rediecting to stripe portal...");
    const redirectUrl = await createStripePortal(currentPath);
    return router.push(redirectUrl);
  };
  return (
    <section
      className={cn(
        " max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 w-full flex flex-col ",
        className
      )}
    >
      {showInterval && (
        <div className="flex justify-center items-center space-x-4 py-8">
          <Label htmlFor="pricing-switch" className="font-semibold text-base">
            Monthly
          </Label>
          <Switch
            id="pricing-switch"
            checked={billingInterval === "year"}
            onCheckedChange={(checked) =>
              setBillingInterval(checked ? "year" : "month")
            }
          />
          <Label htmlFor="pricing-switch" className="font-semibold text-base">
            Yearly
          </Label>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center mx-auto gap-8 space-y-0">
        {products?.map((product) => {
          const price = product?.prices?.find(
            (price) => price.interval === billingInterval
          );
          if (!price) return null;
          const priceString = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: price.currency!,
            minimumFractionDigits: 0,
          }).format((price?.unit_amount || 0) / 100);

          return (
            <div
              className={cn(
                "border bg-background rounded-xl shadow-sm h-fit divide-y divide-border border-border",
                product.name?.toLowerCase() === activeProduct.toLowerCase()
                  ? "border-primary bg-background drop-shadow-md "
                  : "border-border"
              )}
              key={product.id}
            >
              <div className="p-6">
                <h2 className="text-2xl leading-6 font-semibold text-foreground flex items-center justify-between">
                  {product.name}
                  {product.name?.toLowerCase() ===
                  activeProduct.toLowerCase() ? (
                    <Badge className="border-border font-semibold">
                      Selected
                    </Badge>
                  ) : null}
                  {product.name?.toLowerCase() ===
                  mostPopularProduct.toLowerCase() ? (
                    <Badge className="border-border font-semibold">
                      Most Popular
                    </Badge>
                  ) : null}
                </h2>
                <p className="text-muted-foreground mt-4 text-sm">
                  {product.description}
                </p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-foreground">
                    {priceString}
                  </span>
                  <span className="text-base font-medium text-muted-foreground">
                    /{billingInterval}
                  </span>
                </p>
                {renderPricingButton({
                  subscription,
                  user,
                  product,
                  price,
                  mostPopularProduct,
                  hanleStripeCheckout,
                  hanleStripePortalRequest,
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Pricing;
