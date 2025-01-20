import React from "react";
import { getCreditsAction } from "@/app/actions/credits-action";
import { getImagesAction } from "@/app/actions/image-action";
import { getModelsAction } from "@/app/actions/model-actions";
import QuickAction from "@/components/dashboard/quick-action";
import RecentImage from "@/components/dashboard/recent-images";
import RecentModels from "@/components/dashboard/recent-models";
import StatsCards from "@/components/dashboard/stats-card";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Title from "@/components/dashboard/title";

const DashboardPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: models, count: modelCount } = await getModelsAction();
  const { data: images } = await getImagesAction();
  const { data: credits } = await getCreditsAction();
  const imageCount = images?.length || 0;
  if (!user) {
    return redirect("/login");
  }
  return (
    <section className="container mx-auto flex-1 space-y-6">
      <Title />
      <StatsCards
        imageCount={imageCount}
        modelCount={modelCount}
        credits={credits}
      />
      <div className="grid gap-6 grid-cols-3 md:grid-cols-4">
        <RecentImage images={images?.slice(0, 6) ?? ([] as any)} />
        <div className="h-full col-span-full xl:col-span-1 gap-0 sm:gap-6 xl:gap-0 xl:space-y-6 flex flex-col sm:flex-row xl:flex-col space-y-6">
          <QuickAction />
          <RecentModels models={models ?? []} />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
