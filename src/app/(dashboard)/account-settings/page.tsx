import React from "react";
import Title from "@/components/account/title";
import { getUser } from "@/lib/supabase/queries";
import { redirect } from "next/navigation";
import AccountForm from "@/components/account/account-form";
import SecuritySetting from "@/components/account/security-setting";
import { createClient } from "@/lib/supabase/server";

const AccountSettingsPage = async () => {
  const supabase = await createClient();
  const user = await getUser(supabase);
  if (!user) {
    return redirect("/login");
  }
  return (
    <div className="container mx-auto space-y-4">
      <Title />
      <div className="gird space-y-4">
        <AccountForm user={user} />
        <SecuritySetting user={user} />
      </div>
    </div>
  );
};

export default AccountSettingsPage;
