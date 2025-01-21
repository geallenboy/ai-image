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
import { useTranslations } from "next-intl";

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
        files?.length > 0 &&
        files?.[0]?.type &&
        ACCEPTED_ZIP_FILES.includes(files?.[0]?.type),
      "Only zip files are accepted!"
    )
    .refine(
      (files) => files && files?.[0]?.size <= MAX_FILE_SIZE,
      "Max file size allowed is 45 mb"
    ),
});

const ModelTraningForm = () => {
  const toastId = useId();
  const settingT = useTranslations("modelTraining.settings");
  const infoT = useTranslations("modelTraining.info");
  const form = useForm<z.infer<typeof ModelTraningFormSchea>>({
    resolver: zodResolver(ModelTraningFormSchea),
    defaultValues: {
      modelName: undefined,
      gender: "man",
      zipFile: undefined,
    },
  });

  const fileRef = form.register("zipFile");

  const onSubmit = async (values: z.infer<typeof ModelTraningFormSchea>) => {
    toast.loading(infoT("infoLoading"), { id: toastId });
    console.log(values);
    try {
      const data = await getPresignedstorageUrlAction(values.zipFile[0].name);
      if (data.error) {
        toast.error(data.error || infoT("infoError1"), { id: toastId });
        return;
      }
      const urlResponse = await fetch(data.signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": values.zipFile[0].type,
        },
        body: values.zipFile[0],
      });
      console.log("urlResponse:", urlResponse);
      if (!urlResponse.ok) {
        throw new Error(infoT("infoError2"));
      }
      const res = await urlResponse.json();
      toast.success(infoT("infoSuccess"), { id: toastId });
      console.log("File upload:", res);
      const formData = new FormData();
      formData.append("fileKey", res.Key);
      formData.append("modelName", values.modelName);
      formData.append("gender", values.gender);

      toast.success(infoT("infoTraining"), { id: toastId });

      const response = await fetch("/api/train", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok || result?.error) {
        throw new Error(result?.error || infoT("infoError1"));
      }
      toast.success(infoT("infoTrainingSuccess"), { id: toastId });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : infoT("infoError2");
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
                <FormLabel>{settingT("name")}</FormLabel>
                <FormControl>
                  <Input placeholder={settingT("nameVal")} {...field} />
                </FormControl>
                <FormDescription>{settingT("desc")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>{settingT("value1")}</FormLabel>
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
                      <FormLabel className="font-normal">
                        {settingT("male")}
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="women" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {settingT("female")}
                      </FormLabel>
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
                  {settingT("info1")}|
                  <span className="text-destructive">{settingT("info2")}</span>
                </FormLabel>
                <div className="mb-4 rounded-lg shadow-sm pb-4 text-card-foreground">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>{settingT("info3")}</li>
                    <li>{settingT("info4")}</li>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>{settingT("info5")}</li>
                      <li>{settingT("info6")}</li>
                      <li>{settingT("info7")}</li>
                      <li>{settingT("info8")}</li>
                      <li>{settingT("info9")}</li>
                      <li>{settingT("info10")}</li>
                      <li>{settingT("info11")}</li>
                      <li>{settingT("info12")}</li>
                      <li>{settingT("info13")}</li>
                    </ul>
                  </ul>
                </div>
                <FormControl>
                  <Input type="file" accept=".zip" {...fileRef} />
                </FormControl>
                <FormDescription>{settingT("info14")}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {settingT("button")}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};

export default ModelTraningForm;
