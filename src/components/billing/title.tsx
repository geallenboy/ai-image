import { useTranslations } from "next-intl";
import React from "react";

const Title = () => {
  const billingT = useTranslations("billing");

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {billingT("title")}
      </h1>
      <p className="text-muted-foreground mb-6">{billingT("desc")}</p>
    </>
  );
};

export default Title;
