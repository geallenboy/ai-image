import LoginImage from "@/components/login/login-image";
import { ChangePassword } from "@/components/account/change-password";
import React from "react";

const AccountResetPasswwordPage = () => {
  return (
    <main className="h-screen grid grid-cols-2 relative">
      <LoginImage />
      <div className="relative flex flex-col items-center justify-center p-8 h-full w-full">
        <div className=" w-[400px] mx-auto">
          <ChangePassword />
        </div>
      </div>
    </main>
  );
};

export default AccountResetPasswwordPage;
