import { useTranslations } from "next-intl";
import React from "react";

const Title = () => {
  const accountT = useTranslations("account");

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        {accountT("title")}
      </h1>
      <p className="text-muted-foreground mb-6">{accountT("desc")}</p>
    </div>
  );
};

export default Title;
