import { useTranslations } from "next-intl";
import React from "react";

const Title = () => {
  const dashboardT = useTranslations("dashboard");
  return (
    <div className="flex items-center justify-center">
      <h2 className="text-3xl font-bold tracking-tight">
        {dashboardT("title")},garron
      </h2>
    </div>
  );
};

export default Title;
