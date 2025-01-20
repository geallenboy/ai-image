import { useTranslations } from "next-intl";
import React from "react";

const Title = () => {
  const appT = useTranslations("app");

  return (
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-semibold">{appT("name")}</span>
      <span className="truncate text-xs">{appT("textPro")}</span>
    </div>
  );
};

export default Title;
