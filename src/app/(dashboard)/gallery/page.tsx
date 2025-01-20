import React from "react";
import Title from "@/components/gallery/title";
import GalleryComponent from "@/components/gallery/gallery-component";
import { getImagesAction } from "@/app/actions/image-action";

const GallerryPage = async () => {
  const { data: images } = await getImagesAction(10);
  console.log("images:", images);
  return (
    <section className=" container mx-auto">
      <Title />
      <GalleryComponent images={images as any} />
    </section>
  );
};

export default GallerryPage;
