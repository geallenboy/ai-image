"use client";
import { User } from "@supabase/supabase-js";
import React, { useId } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { resetPasswordAction } from "@/app/actions/auth-actions";
import { useTranslations } from "next-intl";

interface SecuritySettingProps {
  user: User | null;
}
const SecuritySetting = ({ user }: SecuritySettingProps) => {
  const toastId = useId();
  const securitySettingT = useTranslations("account.securitySetting");
  const handleChangePassword = async () => {
    toast.loading(securitySettingT("infoLoading"), { id: toastId });
    try {
      const { success, error } = await resetPasswordAction({
        email: user?.email || "",
      });
      if (!success) {
        toast.error(error, { id: toastId });
      } else {
        toast.success(securitySettingT("infoSuccess"), { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message || securitySettingT("infoError"), {
        id: toastId,
      });
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>{securitySettingT("name")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <h3 className="font-medium"> {securitySettingT("password")}</h3>
          <p className="text-sm text-muted-foreground">
            {securitySettingT("desc")}
          </p>
          <Button variant={"outline"} onClick={handleChangePassword}>
            {securitySettingT("button")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecuritySetting;
