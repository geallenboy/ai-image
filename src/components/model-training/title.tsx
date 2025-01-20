import { useTranslations } from "next-intl";
import React from "react";

const Title = () => {
  const modelTrainingT = useTranslations("modelTraining");

  return (
    <>
      <h1 className="text-3xl font-bold mb-2">{modelTrainingT("title")}</h1>
      <p className="text-sm text-muted-foreground mb-6">
        {modelTrainingT("desc")}
      </p>
    </>
  );
};

export default Title;
