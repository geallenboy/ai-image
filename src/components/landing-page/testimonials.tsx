import React from "react";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { cn } from "@/lib/utils";
import Image, { StaticImageData } from "next/image";
import Marquee from "@/components/ui/marquee";
import { useI18n } from "@/context";
import { reviewsList } from "@/context/home";
import { useTranslations } from "next-intl";

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: StaticImageData;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-4 sm:p-8 flex flex-col justify-between",
        "border-primary/[.15] bg-muted/70 hover:bg-muted/80"
      )}
    >
      <blockquote className="mt-2 text-sm">{body}</blockquote>
      <div className="flex flex-row items-center gap-2 mt-2">
        <Image
          className="rounded-full aspect-square"
          width="32"
          height="32"
          alt="img"
          src={img}
        />

        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
    </figure>
  );
};

const Testimonials = () => {
  const reviewT = useTranslations("home.review");
  const reviewsData = useI18n(reviewsList);
  const firstRow = reviewsData.slice(0, reviewsData.length / 2);
  const secondRow = reviewsData.slice(reviewsData.length / 2);
  return (
    <section
      id="testimonials"
      className="w-full py-32 flex flex-col items-center justify-center"
    >
      <AnimatedGradientText className="bg-background backdrop-blur-0">
        🎉 <hr className="mx-2 h-4 w-px shrink-0 bg-gray-300" />
        <span
          className={cn(
            `inline animate-gradient bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:var(--bg-size)_100%] bg-clip-text text-transparent`
          )}
        >
          {reviewT("title1")}
        </span>
      </AnimatedGradientText>
      <h2 className="subHeading mt-4"> {reviewT("title2")}</h2>
      <p className="subText mt-4 text-center">{reviewT("title3")}</p>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <Marquee
          pauseOnHover
          className="[--duration:30s][--gap:1rem] sm:[--gap:2rem]"
        >
          {firstRow.map((review: any) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee
          reverse
          pauseOnHover
          className="[--duration:30s][--gap:1rem] sm:[--gap:2rem] mt-1 sm:mt-4"
        >
          {secondRow.map((review: any) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 sm:w-1/4 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 sm:w-1/4 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </section>
  );
};

export default Testimonials;
