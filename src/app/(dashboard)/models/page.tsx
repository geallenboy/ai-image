import React from "react";
import Title from "@/components/model/title";
import { getModelsAction } from "@/app/actions/model-actions";
import ModelsList from "@/components/model/models-list";

const ModelsPage = async () => {
  const data = await getModelsAction();

  return (
    <section className="container mx-auto">
      <Title />
      <ModelsList models={data} />
    </section>
  );
};

export default ModelsPage;
