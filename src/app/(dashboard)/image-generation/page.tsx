import React from "react";
import Configurations from "@/components/image-generation/config-urations";
import GeneratedImages from "@/components/image-generation/generated-images";
import { getModelsAction } from "@/app/actions/model-actions";

interface searchParamsProps {
  model_id?: string;
}

const ImageGenerationPage = async ({
  searchParams,
}: {
  searchParams: Promise<searchParamsProps>;
}) => {
  const model_id = (await searchParams).model_id;
  const { data: userModels } = await getModelsAction();

  return (
    <section className="container mx-auto flex-1 grid gap-4 grid-cols-1 lg:grid-cols-3 overflow-hidden">
      <Configurations userModels={userModels || []} model_id={model_id} />
      <div className="col-span-2 p-0 lg:p-4 rounded-xl flex items-center justify-center h-fit">
        <GeneratedImages />
      </div>
    </section>
  );
};

export default ImageGenerationPage;
