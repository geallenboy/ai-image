import { Database, Tables } from "@datatypes.types";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageIcon, LayersIcon, Wallet, ZapIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface StatsCardsProps {
  imageCount: number;
  modelCount: number;
  credits: Database["public"]["Tables"]["ai_image_credits"]["Row"] | null;
}

const StatsCards = ({ imageCount, modelCount, credits }: StatsCardsProps) => {
  const statsCardsT = useTranslations("dashboard.statsCards");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            {statsCardsT("name1")}
          </CardTitle>
          <ImageIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{imageCount}</div>
          <p className="text-xs text-muted-foreground">
            {statsCardsT("info1")}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            {statsCardsT("name2")}
          </CardTitle>
          <LayersIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{modelCount}</div>
          <p className="text-xs text-muted-foreground">
            {statsCardsT("info2")}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            {statsCardsT("name3")}
          </CardTitle>
          <ZapIcon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {credits?.image_generation_count || 0}/
            {credits?.max_image_generation_count || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {statsCardsT("info3")}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm text-muted-foreground">
            {statsCardsT("name4")}
          </CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {credits?.model_training_count || 0}/
            {credits?.max_model_training_count || 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {statsCardsT("info4")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
