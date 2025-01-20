"use client";
import React, { useId } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getPresignedstorageUrlAction } from "@/app/actions/model-actions";

const ACCEPTED_ZIP_FILES = ["application/x-zip-compressed", "application/zip"];
const MAX_FILE_SIZE = 45 * 1024 * 1024; //45MB
const ModelTraningFormSchea = z.object({
  modelName: z.string({
    required_error: "Model name is required!",
  }),
  gender: z.enum(["man", "women"]),
  zipFile: z
    .any()
    .refine((files) => files?.[0] instanceof File, "please select a valid file")
    .refine(
      (files) =>
        files?.[0].type && ACCEPTED_ZIP_FILES.includes(files?.[0]?.type),
      "Only zip files are accepted!"
    )
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size allowed is 45 mb"
    ),
});

const ModelTraningForm = () => {
  const toastId = useId();
  const form = useForm<z.infer<typeof ModelTraningFormSchea>>({
    resolver: zodResolver(ModelTraningFormSchea),
    defaultValues: {
      modelName: "",
      gender: "man",
      zipFile: undefined,
    },
  });
  const fileRef = form.register("zipFile");

  const onSubmit = async (values: z.infer<typeof ModelTraningFormSchea>) => {
    toast.loading("Uploading file...", { id: toastId });
    console.log(values);
    try {
      const data = await getPresignedstorageUrlAction(values.zipFile[0].name);
      if (data.error) {
        toast.error(data.error || "Failed to upload the file", { id: toastId });
        return;
      }
      console.log("data:", data);
      //upload file
      const urlResponse = await fetch(data.signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": values.zipFile[0].type,
        },
        body: values.zipFile[0],
      });
      console.log("urlResponse:", urlResponse);
      if (!urlResponse.ok) {
        throw new Error("Upload Failed");
      }
      const res = await urlResponse.json();
      toast.success("File upload successfully!", { id: toastId });
      console.log("File upload:", res);
      const formData = new FormData();
      formData.append("fileKey", res.Key);
      formData.append("modelName", values.modelName);
      formData.append("gender", values.gender);

      toast.success("Initiating model training...!", { id: toastId });

      //use the /tranin handler
      const response = await fetch("/api/train", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok || result?.error) {
        throw new Error(result?.error || "Failed to train the");
      }
      toast.success(
        "Training started successfully! You'll recelve a notification once it gets completed!",
        { id: toastId }
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to start training";
      toast.error(errorMessage, { id: toastId });
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <fieldset className="grid max-w-5xl bg-background p-4 sm:p-8 rounded-lg gap-6 border">
          <FormField
            control={form.control}
            name="modelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Model</FormLabel>
                <FormControl>
                  <Input placeholder="Enter model name" {...field} />
                </FormControl>
                <FormDescription>
                  This will be the name of your trained model
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>please select the gender of the images</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="man" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="women" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipFile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Training Data(Zip File)|
                  <span className="text-destructive">
                    Read the requirements below
                  </span>
                </FormLabel>
                <div className="mb-4 rounded-lg shadow-sm pb-4 text-card-foreground">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Provide 10, 12 or 15 images in total</li>
                    <li>• Ideal breakdown for 12 images:</li>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>- 6 face closeups</li>
                      <li>- 3/4 half body closeups (till stomach)</li>
                      <li>- 2/3 full body shots</li>
                      <li>• No accessories on face/head ideally</li>
                      <li>• No other people in images</li>
                      <li>
                        • Different expressions, clothing, backgrounds with good
                        lighting
                      </li>
                      <li>
                        • Images to be in 1:1 resolution (1048x1048 or higher)
                      </li>
                      <li>
                        • Use images of similar age group (ideally within past
                        few months)
                      </li>
                      <li>• Provide only zip file (under 45MB size)</li>
                    </ul>
                  </ul>
                </div>
                <FormControl>
                  <Input type="file" accept=".zip" {...fileRef} />
                </FormControl>
                <FormDescription>
                  Upload a zip file containing your training images (max 45MB)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default ModelTraningForm;
