import LoginImage from "@/components/login/login-image";
import ResetPassword from "@/components/login/reset-password";
import React from "react";

const ResetPasswwordPage = () => {
  return (
    <main className="h-screen grid grid-cols-1 md:grid-cols-2 relative">
      <LoginImage />
      <div className="relative flex flex-col items-center justify-center p-8 h-full w-full">
        <div className=" w-full md:w-[400px] mx-auto">
          <ResetPassword />
        </div>
      </div>
    </main>
  );
};

export default ResetPasswwordPage;
