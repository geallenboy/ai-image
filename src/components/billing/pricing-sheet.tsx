import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tables } from "@datatypes.types";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import Pricing from "./pricing";
import { useTranslations } from "next-intl";

type Product = Tables<"ai_image_products">;
type Price = Tables<"ai_image_prices">;
type Subscription = Tables<"ai_image_subscriptions">;

interface ProductWithPrices extends Product {
  prices: Price[];
}
interface PriceWithProduct extends Price {
  products: Product | null;
}

interface SubscriptionWithProduct extends Subscription {
  prices: PriceWithProduct | null;
}

interface PricingSheetProps {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  products: ProductWithPrices[] | null;
}

const PricingSheet = ({ subscription, user, products }: PricingSheetProps) => {
  const T = useTranslations("billing.pricingSheet");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>{T("name")}</Button>
      </SheetTrigger>
      <SheetContent className=" max-w-full sm:max-w-[90vw] lg:max-w-[70vw] text-left w-full">
        <SheetHeader>
          <SheetTitle>{T("title")}</SheetTitle>
          <SheetDescription>{T("desc")}</SheetDescription>
        </SheetHeader>
        <Pricing
          user={user}
          products={products ?? []}
          subscription={subscription}
          mostPopularProduct="pro"
        />
      </SheetContent>
    </Sheet>
  );
};

export default PricingSheet;
