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
import { toast } from "sonner";
import { loginAction } from "@/app/actions/auth-actions";
import { redirect } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const toastId = useId();
  const loginFormT = useTranslations("login.loginForm");
  const formSchema = z.object({
    email: z.string().email({
      message: loginFormT("emailMessage"),
    }),
    password: z.string().min(8, {
      message: loginFormT("passwordMessage"),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    toast.loading(loginFormT("info1"), { id: toastId });
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    const { success, error } = await loginAction(formData);
    if (!success) {
      toast.error(String(error), { id: toastId });
    } else {
      toast.success(loginFormT("info2"), { id: toastId });
      redirect("/dashboard");
    }
    setLoading(false);
  };
  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {loginFormT("name")}
        </h1>
        <p className="text-sm text-gray-400">{loginFormT("title1")}</p>
      </div>
      <div>
        <div className={cn("grid gap-6")}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> {loginFormT("email")}</FormLabel>
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
                    <FormLabel>{loginFormT("password")}</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder={loginFormT("passwordInfo")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loginFormT("btn")}
              </Button>
            </form>
          </Form>
        </div>
        <div className="text-center flex justify-between">
          <Link href={"/signup"}>
            <Button variant={"link"} className="p-0">
              {loginFormT("btn1")}
            </Button>
          </Link>
          <Link href={"/reset-password"}>
            <Button variant={"link"} className="p-0">
              {loginFormT("btn2")}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
