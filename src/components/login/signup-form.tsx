"use client";
import React, { useId, useState } from "react";
import {
  Form,
  FormControl,
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
import { signupAction } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import { useTranslations } from "next-intl";
import Link from "next/link";

const passwordValidationRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);

export const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const toastId = useId();
  const signUpFormT = useTranslations("login.signUpForm");
  const formSchema = z
    .object({
      fullName: z.string().min(3, {
        message: signUpFormT("fullNameMessage"),
      }),
      email: z.string().email({
        message: signUpFormT("emailMessage"),
      }),
      password: z
        .string({
          required_error: signUpFormT("passwordString"),
        })
        .min(8, {
          message: signUpFormT("passwordMin"),
        })
        .regex(passwordValidationRegex, {
          message: signUpFormT("passwordRegex"),
        }),
      confirmPassword: z.string({
        required_error: signUpFormT("confirmPasswordInfo"),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: signUpFormT("passwordRefine"),
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
      confirmPassword: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    toast.loading(signUpFormT("info1"), { id: toastId });
    const formData = new FormData();
    formData.append("fullName", values.fullName);
    formData.append("email", values.email);
    formData.append("password", values.password);

    const { success, error } = await signupAction(formData);
    if (!success) {
      toast.error(String(error), { id: toastId });
    } else {
      toast.success(signUpFormT("info2"), { id: toastId });
      redirect("/login");
    }
    setLoading(false);
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {signUpFormT("name")}
        </h1>
        <p className="text-sm text-gray-400">{signUpFormT("title1")}</p>
      </div>
      <div>
        <div className={cn("grid gap-6")}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{signUpFormT("fullName")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={signUpFormT("fullNameInfo")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{signUpFormT("email")}</FormLabel>
                    <FormControl>
                      <Input placeholder="name@ecample.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{signUpFormT("password")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={signUpFormT("passwordInfo")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{signUpFormT("confirmPassword")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={signUpFormT("confirmPasswordEnter")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {signUpFormT("btn1")}
              </Button>
            </form>
          </Form>
        </div>
        <div className="text-center flex items-center justify-center">
          <Link href={"/login"}>
            <Button variant={"link"} className="p-0">
              {signUpFormT("btn2")}
            </Button>
          </Link>
        </div>
        <p className="px-8 text-center text-sm text-muted-foreground">
          {signUpFormT("btn3")}
          <Link
            href={"#"}
            className="underline underline-offset-4 hover:text-primary"
          >
            {signUpFormT("btn4")}
          </Link>
          {signUpFormT("btn5")}
          <Link
            href={"#"}
            className="underline underline-offset-4 hover:text-primary"
          >
            {signUpFormT("btn6")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
