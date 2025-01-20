"use client";
import React, { useState } from "react";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tables } from "@datatypes.types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

type Product = Tables<"products">;
type Price = Tables<"prices">;
interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PricingProps {
  products: ProductWithPrices[];
  mostPopularProduct?: string;
}

const Pricing = ({ products, mostPopularProduct = "Pro" }: PricingProps) => {
  const [billingInterval, setBillingInterval] = useState("month");
  const priceT = useTranslations("home.price");
  return (
    <section
      id="pricing"
      className="w-full bg-muted flex flex-col items-center justify-center"
    >
      <div className="w-full container mx-auto py-32 px-6 sm:px-8 sm:mx-8 lg:max-auto flex flex-col items-center justify-center space-y-8">
        <div className="text-center flex flex-col items-center justify-center">
          <AnimatedGradientText>
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              {priceT("name")}
            </span>
          </AnimatedGradientText>
          <h1 className="mt-4 capitalize text-4xl font-bold">
            {priceT("title1")}
          </h1>
          <p className="text-base text-muted-foreground max-w-3xl">
            {priceT("title2")}
          </p>
        </div>
        <div className="flex justify-center items-center space-x-4 py-8">
          <Label htmlFor="pricing-switch" className="font-semibold text-base">
            {priceT("title3")}
          </Label>
          <Switch
            id="pricing-switch"
            checked={billingInterval === "year"}
            onCheckedChange={(checked) =>
              setBillingInterval(checked ? "year" : "month")
            }
          />
          <Label htmlFor="pricing-switch" className="font-semibold text-base">
            {priceT("title4")}
          </Label>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center mx-auto gap-y-8 sm:gap-8 lg:max-w-4xl xl:max-w-none">
          {products.map((product) => {
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
                  product.name?.toLowerCase() ===
                    mostPopularProduct.toLowerCase()
                    ? "border-primary bg-background drop-shadow-md scale-105"
                    : "border-border"
                )}
                key={product.id}
              >
                <div className="p-6">
                  <h2 className="text-2xl leading-6 font-semibold text-foreground flex items-center justify-between">
                    {product.name}
                    {product.name?.toLowerCase() ===
                    mostPopularProduct.toLowerCase() ? (
                      <Badge className="border-border font-semibold">
                        {priceT("title5")}
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
                  <Link href={"/login?state-signup"}>
                    <Button
                      className="mt-8 w-full font-semibold"
                      variant={
                        product.name?.toLowerCase() ===
                        mostPopularProduct.toLowerCase()
                          ? "default"
                          : "secondary"
                      }
                    >
                      {priceT("title6")}
                    </Button>
                  </Link>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3> {priceT("title7")}</h3>
                  <ul className="mt-6 space-y-2">
                    {Object.values(product.metadata || {}).map(
                      (feature, index) => {
                        return (
                          <li className="flex space-x-3" key={index}>
                            <Check className="w-5 h-5 text-primary" />
                            <span className="text-sm text-muted-foreground">
                              {feature}
                            </span>
                          </li>
                        );
                      }
                    )}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
