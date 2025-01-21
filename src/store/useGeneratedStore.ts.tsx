import { create } from "zustand";
import { ImageGenerationFormSchema } from "@/components/image-generation/config-urations";
import { z } from "zod";
import {
  generateImageAction,
  storeImagesAction,
} from "@/app/actions/image-action";
import { toast } from "sonner";

interface GeneratedState {
  loading: boolean;
  images: Array<{ url: string }>;
  error: string | null;
  generateImage: (
    values: z.infer<ReturnType<typeof ImageGenerationFormSchema>>
  ) => Promise<void>;
}

const useGeneratedStore = create<GeneratedState>((set) => ({
  loading: false,
  images: [],
  error: null,
  generateImage: async (
    values: z.infer<ReturnType<typeof ImageGenerationFormSchema>>
  ) => {
    set({ loading: true, error: null });
    const toastId = toast.loading("Generating image...");
    try {
      const { error, success, data } = await generateImageAction(values);
      console.log(error);
      if (!success) {
        set({ error: error, loading: false });
        return;
      }
      const dataUrl = data.map((url: string) => {
        return { url, ...values };
      });
      toast.success("Image generated successfully!", { id: toastId });
      await storeImagesAction(dataUrl);
      toast.success("Image stored successfully!", { id: toastId });
      set({ images: dataUrl, loading: false });
    } catch (error: any) {
      set({
        error: "Failed to generate image. Please try again",
        loading: false,
      });
    }
  },
}));

export default useGeneratedStore;
