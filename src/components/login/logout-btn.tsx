"use client";

import { logoutAction } from "@/app/actions/auth-actions";
import React from "react";

export const LogoutBtn = () => {
  const handleLogout = async () => {
    await logoutAction();
  };
  return (
    <span
      onClick={handleLogout}
      className="inline-block w-full cursor-pointer text-destructive"
    >
      logout
    </span>
  );
};

export default LogoutBtn;
