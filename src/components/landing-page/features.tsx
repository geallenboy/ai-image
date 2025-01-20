import React from "react";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import Image from "next/image";
import dashboardImg from "@/public/dashboard-img.png";
import { useI18n } from "@/context";
import { featureList } from "@/context/home";
import { useTranslations } from "next-intl";

const Features = () => {
  const featureData = useI18n(featureList);
  const featureT = useTranslations("home.features");
  return (
    <section
      id="features"
      className="w-full bg-muted py-32 flex flex-col items-center justify-center"
    >
      <div className="container px-6 xs:px-8 sm:px-0 sm:mx-8 lg:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 relative bg-muted">
        <div className="col-span-full space-y-4">
          <AnimatedGradientText className="ml-0 bg-background backdrop-blur-0">
            🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
            <span
              className={cn(
                `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
              )}
            >
              {featureT("name")}
            </span>
          </AnimatedGradientText>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold">
            {featureT("title")}
          </h2>
          <p className="text-base text-muted-foreground lg:max-w-[75%]">
            {featureT("text")}
          </p>
        </div>
        <div className="flex flex-col justify-start items-start order-2 lg:order-1">
          {featureData.map((featrue: any) => {
            return (
              <div
                key={featrue.title}
                className="flex items-start gap-2 sm:gap-4 rounded-lg py-8 lg:p-12"
              >
                <span className="p-0 sm:p-2 rounded-md text-foreground sm:text-background bg-background sm:bg-foreground">
                  {featrue.icon}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium">
                    {featrue.title}
                  </h3>
                  <p className="text-sm xs:text-base text-muted-foreground pt-2">
                    {featrue.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <div
          className={cn(
            "h-fit lg:sticky top-32 pl-16 pt-16 rounded-lg border border-r-gray-300 border-b-gray-300 animate-gradient bg-gradient-to-r from-[#627FAB] via-[#B95480] to-[#627FAB] bg-[length:var(--bg-size)_100%] [--bg-size:400%] order-1 lg:order-2"
          )}
        >
          <Image
            src={dashboardImg}
            alt="features Image"
            className="w-full h-auto rounded-tl-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
