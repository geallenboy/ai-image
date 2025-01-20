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

interface PricingSheetProps {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  products: ProductWithPrices[] | null;
}

const PricingSheet = ({ subscription, user, products }: PricingSheetProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>upgrade</Button>
      </SheetTrigger>
      <SheetContent className=" max-w-full sm:max-w-[90vw] lg:max-w-[70vw] text-left w-full">
        <SheetHeader>
          <SheetTitle>Change subscription plan</SheetTitle>
          <SheetDescription>
            choose a plan that fits your needs and budget to continue using our
            service.
          </SheetDescription>
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
