"use client";
import React, { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

import useGeneratedStore from "@/store/useGeneratedStore.ts";
import { Tables } from "@datatypes.types";
import { useTranslations } from "next-intl";

interface ConfiguratinsPros {
  userModels: Tables<"models">[];
  model_id?: string;
}

export const ImageGenerationFormSchema = () => {
  const formSchemaT = useTranslations("imageGeneration.formSchema");
  return z.object({
    model: z.string({ required_error: formSchemaT("model") }),
    prompt: z.string({ required_error: formSchemaT("prompt") }),
    guidance: z
      .number()
      .min(1, { message: formSchemaT("guidanceMin") })
      .max(10, { message: formSchemaT("guidanceMax") }),
    num_outputs: z
      .number()
      .min(1, { message: formSchemaT("numOutputsMin") })
      .max(4, { message: formSchemaT("numOutputsMax") }),
    aspect_ratio: z.string({ required_error: formSchemaT("aspectRatio") }),
    output_format: z.string({ required_error: formSchemaT("outputFormat") }),
    output_quality: z
      .number()
      .min(1, { message: formSchemaT("outputQualityMin") })
      .max(100, { message: formSchemaT("outputQualityMax") }),
    num_inference_steps: z
      .number()
      .min(1, { message: formSchemaT("numInferenceStepsMin") })
      .max(50, { message: formSchemaT("numInferenceStepsMax") }),
  });
};
const Configurations = ({ userModels, model_id }: ConfiguratinsPros) => {
  const generateImageStore = useGeneratedStore((state) => state.generateImage);
  const settingsT = useTranslations("imageGeneration.settings");

  const form = useForm({
    resolver: zodResolver(ImageGenerationFormSchema()), // 动态调用 Schema 函数
    defaultValues: {
      model: model_id ? `geallenboy/${model_id}` : "black-forest-labs/flux-dev",
      prompt: "",
      guidance: 3.5,
      num_outputs: 1,
      aspect_ratio: "1:1",
      output_format: "jpg",
      output_quality: 80,
      num_inference_steps: 28,
    },
  });
  const onSubmit = async (
    values: z.infer<ReturnType<typeof ImageGenerationFormSchema>>
  ) => {
    console.log(values);
    const newValues = {
      ...values,
      prompt: values.model.startsWith("geallenboy")
        ? (() => {
            const modelId = values.model
              .replace("geallenboy/", "")
              .split(":")[0];
            console.log("modelId:", modelId);
            const selectedModel = userModels.find(
              (model) => model.model_id === modelId
            );
            console.log("selectedModel:", selectedModel);
            return `photo of a ${selectedModel?.trigger_word || "GJL"} ${
              selectedModel?.gender
            }, ${values.prompt}`;
          })()
        : values.prompt,
    };
    await generateImageStore(newValues);
  };
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "model") {
        let newSteps;
        if (value.model === "black-forest-labs/flux-schnell") {
          newSteps = 4;
        } else {
          newSteps = 28;
        }
        if (newSteps !== undefined) {
          form.setValue("num_inference_steps", newSteps);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);
  return (
    <TooltipProvider>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <fieldset className="grid gap-6 p-4 bg-background rounded-lg border">
            <legend className="text-sm -ml-1 px-1 font-medium">
              {settingsT("name")}
            </legend>
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    {settingsT("model")}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{settingsT("modelInfo")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="black-forest-labs/flux-dev">
                        Flux Dev
                      </SelectItem>
                      <SelectItem value="black-forest-labs/flux-schnell">
                        Flux Schnell
                      </SelectItem>
                      {userModels?.map(
                        (model) =>
                          model.training_status === "succeeded" && (
                            <SelectItem
                              key={model.model_id}
                              value={`geallenboy/${model.model_id}:${model.version}`}
                            >
                              {model.model_name}
                            </SelectItem>
                          )
                      )}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="aspect_ratio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      {settingsT("aspectRatio")}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p> {settingsT("aspectRatioInfo")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={settingsT("aspectRatio")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1:1">1:1</SelectItem>
                        <SelectItem value="16:9">16:9</SelectItem>
                        <SelectItem value="9:16">9:16</SelectItem>
                        <SelectItem value="21:9">21:9</SelectItem>
                        <SelectItem value="9:21">9:21</SelectItem>
                        <SelectItem value="4:5">4:5</SelectItem>
                        <SelectItem value="5:4">5:4</SelectItem>
                        <SelectItem value="4:3">4:3</SelectItem>
                        <SelectItem value="3:4">3:4</SelectItem>
                        <SelectItem value="2:3">2:3</SelectItem>
                        <SelectItem value="3:2">3:2</SelectItem>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="num_outputs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-1">
                      {settingsT("numOfOutputs")}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p> {settingsT("numOfOutputsInfo")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={4}
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="guidance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">
                    <div className="flex items-center gap-1">
                      {settingsT("guidance")}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p> {settingsT("guidanceInfo")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={0}
                      max={10}
                      step={0.5}
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="num_inference_steps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">
                    <div className="flex items-center gap-1">
                      {settingsT("numInferenceSteps")}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p> {settingsT("numInferenceStepsInfo")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={1}
                      max={
                        form.getValues("model") ===
                        "black-forest-labs/flux-schnell"
                          ? 4
                          : 50
                      }
                      step={1}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="output_quality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex justify-between">
                    <div className="flex items-center gap-1">
                      {settingsT("outputQuality")}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Info className="w-4 h-4" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{settingsT("outputQualityInfo")}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <span>{field.value}</span>
                  </FormLabel>
                  <FormControl>
                    <Slider
                      defaultValue={[field.value]}
                      min={50}
                      max={100}
                      step={1}
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="output_format"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    {settingsT("outputFormat")}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{settingsT("outputFormatInfo")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a output format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="webp">webp</SelectItem>
                      <SelectItem value="png">png</SelectItem>
                      <SelectItem value="jpg">jpg</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1">
                    {settingsT("prompt")}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p> {settingsT("promptInfo")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={6} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full font-medium">
              Generate
            </Button>
          </fieldset>
        </form>
      </Form>
    </TooltipProvider>
  );
};

export default Configurations;
