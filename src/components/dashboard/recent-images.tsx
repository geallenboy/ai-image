import { Tables } from "@datatypes.types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

/**
 *  & {
    url: string | undefined;
  };
 */
interface RecetImagesProps {
  images: Tables<"generated_images">[];
}

const RecentImage = ({ images }: RecetImagesProps) => {
  if (images.length === 0) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Generations</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
          <p className="text-muted-foreground mt-16">
            No images generated yet!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-full xl:col-span-3">
      <CardHeader>
        <CardTitle>Recent Generations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Carousel className="w-full ">
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem
                key={image.id}
                className=" basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="space-y-2">
                  <div
                    className={cn(
                      "relative overflow-hidden rounded-lg",
                      image.height && image.width
                        ? `aspect-[${images.with} / ${image.height}]`
                        : "aspect-square"
                    )}
                  >
                    <Image
                      src={image?.url || ""}
                      alt={image.prompt || ""}
                      width={image.width || 100}
                      height={image.height || 100}
                      className="object-cover"
                    />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {image.prompt}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
        <div className="flex justify-end">
          <Link href={"/gallery"}>
            <Button variant={"ghost"}>
              View galler
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentImage;
