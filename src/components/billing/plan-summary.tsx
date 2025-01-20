import { Tables } from "@datatypes.types";
import { User } from "@supabase/supabase-js";
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PricingSheet from "./pricing-sheet";
import { format } from "date-fns";

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

interface PlanSummarryProps {
  subscription: SubscriptionWithProduct | null;
  user: User | null;
  products: ProductWithPrices[] | null;
  credits: Tables<"credits"> | null;
}

const PlanSummarry = ({
  credits,
  subscription,
  user,
  products,
}: PlanSummarryProps) => {
  console.log(subscription, "subscription:===>");
  console.log(products, "products:===>");
  console.log(user, "user:===>");
  console.log(credits, "credits:===>");
  if (!credits || !subscription || subscription?.status !== "active") {
    return (
      <Card className="max-w-5xl">
        <CardContent className="px-5 py-4 pb-8">
          <h3 className="pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2">
            <span>Plan Summary</span>
            <Badge variant={"secondary"} className="bg-primary/10">
              No Plan
            </Badge>
          </h3>
          <div className="grid grid-cols-8 gap-4">
            <div className="col-span-5 flex flex-col pr-12">
              <div className="flex-1 text-sm font-normal flex w-full justify-between pb-1">
                <span className="font-normal text-muted-foreground ml-1 lowercase">
                  Image Generation credits left
                </span>
                <span className="font-medium">0 rmmaining</span>
              </div>
              <div className="mb-1 flex items-center">
                <Progress value={0} className="w-full h-2" />
              </div>
              <div className="flex-1 text-sm font-normal flex w-full justify-between pb-1">
                <span className="font-normal text-muted-foreground ml-1 lowercase">
                  model training credits left
                </span>
                <span className="font-medium">0 rmmaining</span>
              </div>
              <div className="mb-1 flex items-center">
                <Progress value={0} className="w-full h-2" />
              </div>
            </div>
            <div className="col-span-5 flex flex-col">
              Please upgrade to a plan to continue using the app.
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t border-border px-4 py-3">
          <span className="flex ml-auto flex-row">
            <PricingSheet
              subscription={subscription}
              user={user}
              products={products ?? []}
            />
          </span>
        </CardFooter>
      </Card>
    );
  }
  const {
    products: subscriptionProduct,
    unit_amount,
    currency,
  } = subscription?.prices ?? {};

  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency!,
    minimumFractionDigits: 0,
  }).format((unit_amount || 0) / 100);
  const imageGenerationCount = credits.image_generation_count ?? 0;
  const maxImageGenerationCount = credits.max_image_generation_count ?? 0;
  const modelTrainingCount = credits.model_training_count ?? 0;
  const maxModelTrainingCount = credits.max_model_training_count ?? 0;
  return (
    <Card className="max-w-5xl">
      <CardContent className="px-5 py-4 pb-8">
        <h3 className="pb-4 text-base font-semibold flex flex-wrap items-center gap-x-2">
          <span>Plan Summary</span>
          <Badge variant={"secondary"} className="bg-primary/10">
            {subscriptionProduct?.name} Plan
          </Badge>
        </h3>
        <div className="grid grid-cols-3 xl:grid-cols-8 gap-4">
          <div className="col-span-full xl:col-span-5 flex flex-col xl:pr-12">
            <div className="flex-1 text-sm font-normal flex w-full justify-between items-center">
              <span className="font-normal text-muted-foreground ml-1 lowercase">
                Image Generation credits
              </span>
              <span className="font-medium text-base">
                {imageGenerationCount}/{maxImageGenerationCount}
              </span>
            </div>
            <div className="mb-1 flex items-end">
              <Progress
                value={(imageGenerationCount / maxImageGenerationCount) * 100}
                className="w-full h-2"
              />
            </div>
          </div>
          <div className="col-span-full xl:col-span-5 flex flex-col xl:pr-12">
            <div className="flex-1 text-sm font-normal flex w-full justify-between items-center">
              <span className="font-normal text-muted-foreground ml-1 lowercase">
                model training credits
              </span>
              <span className="font-medium text-base">
                {modelTrainingCount}/{maxModelTrainingCount}
              </span>
            </div>
            <div className="mb-1 flex items-end">
              <Progress
                value={(modelTrainingCount / maxModelTrainingCount) * 100}
                className="w-full h-2"
              />
            </div>
          </div>
          <div className="col-span-full xl:col-span-3 flex flex-row justify-between flex-wrap">
            <div className="flex flex-col pb-0">
              <div className="text-sm font-normal">Price/Month</div>
              <div className="flex-1 pt-1 text-sm font-medium">
                {priceString}
              </div>
            </div>
            <div className="flex flex-col pb-0">
              <div className="text-sm font-normal">Included Credits</div>
              <div className="flex-1 pt-1 text-sm font-medium">
                {maxImageGenerationCount}
              </div>
            </div>
            <div className="flex flex-col pb-0">
              <div className="text-sm font-normal">Renewal Date</div>
              <div className="flex-1 pt-1 text-sm font-medium">
                {format(
                  new Date(subscription.current_period_end),
                  "MMM d, yyy"
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlanSummarry;
