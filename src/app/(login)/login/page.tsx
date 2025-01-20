import React from "react";
import LoginForm from "@/components/login/login-form";
import LoginImage from "@/components/login/login-image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { getUser } from "@/lib/supabase/queries";

const LoginPage = async () => {
  const supabase = await createClient();
  const [user] = await Promise.all([getUser(supabase)]);

  if (user) {
    return redirect("/dashboard");
  }
  return (
    <main className="h-screen grid grid-cols-1 md:grid-cols-2 relative">
      <LoginImage />
      <div className="relative flex flex-col items-center justify-center p-8 h-full w-full">
        <div className=" w-full md:w-[400px] mx-auto">
          <LoginForm />
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
