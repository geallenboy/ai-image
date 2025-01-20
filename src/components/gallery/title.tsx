import { useTranslations } from "next-intl";
import React from "react";

const Title = () => {
  const galleryT = useTranslations("gallery");
  return (
    <>
      <h1 className="text-3xl font-semibold mb-2">{galleryT("title")}</h1>
      <p className="text-muted-foreground mb-6">{galleryT("desc")}</p>
    </>
  );
};

export default Title;
