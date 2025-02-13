"use client";
import React, { useId, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { changePasswordAction } from "@/app/actions/auth-actions";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
const passwordValidationRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

export const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toastId = useId();
  const changePasswordT = useTranslations("account.changePassword");
  const formSchema = z
    .object({
      password: z
        .string()
        .min(8, {
          message: changePasswordT("passwordMessage"),
        })
        .regex(passwordValidationRegex, {
          message: changePasswordT("passwordRegex"),
        }),
      confirmPassword: z.string({
        required_error: changePasswordT("passwordConfirmPassword"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: changePasswordT("passwordRefine"),
      path: ["confirmPassword"],
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    toast.loading(changePasswordT("infoLoading"), { id: toastId });
    setLoading(true);

    try {
      const { success, error } = await changePasswordAction(values.password);
      if (!success) {
        toast.error(String(error), { id: toastId });
        setLoading(false);
      } else {
        toast.success(changePasswordT("infoSuccess"), { id: toastId });
        setLoading(false);
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(String(error?.message), { id: toastId });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("grid gap-6")}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {changePasswordT("name")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {changePasswordT("desc")}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel> {changePasswordT("password")}</FormLabel>
                <FormControl>
                  <Input type={"password"} {...field} />
                </FormControl>
                <FormDescription>
                  {changePasswordT("passwordDesc")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{changePasswordT("confirmPassword")}</FormLabel>
                <FormControl>
                  <Input type={"password"} {...field} />
                </FormControl>
                <FormDescription>
                  {changePasswordT("confirmPasswordDesc")}
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full p-4">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading
              ? changePasswordT("loading1")
              : changePasswordT("loading2")}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            {changePasswordT("info")}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChangePassword;
