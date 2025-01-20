import { useTranslations } from "next-intl";
import React from "react";

const Title = () => {
  const modelT = useTranslations("model");
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold">{modelT("title")}</h1>
      <p className="mt-2 text-muted-foreground">{modelT("desc")}</p>
    </div>
  );
};

export default Title;
