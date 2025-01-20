import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
const Ready = () => {
  const readyT = useTranslations("home.ready");
  return (
    <section className="w-full py-16 ">
      <div className="container px-6 xs:px-8 sm:px-0 lg:mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="subHeading font-bold">{readyT("title1")}</h2>
          <p className="subText mt-4 text-center">{readyT("title2")}</p>
          <Link href={"/login?state=signup"}>
            <Button className=" rounded-md text-base h-12">
              {readyT("title3")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Ready;
