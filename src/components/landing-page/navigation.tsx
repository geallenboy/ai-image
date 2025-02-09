import React from "react";
import Logo from "@/components/logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { createClient } from "@/lib/supabase/server";
import { getUser } from "@/lib/supabase/queries";
import { LanguageSwitcher } from "./language-switcher";
import { ModeToggle } from "./mode-toggle";

const NavItemsRight = ({ user }: { user: any }) => {
  const homeT = useTranslations("home.navigtion");
  return (
    <>
      <LanguageSwitcher />
      <ModeToggle />
      {user ? (
        <Link
          href={"/dashboard"}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          <Button variant={"outline"}> {homeT("name")}</Button>
        </Link>
      ) : (
        <Link
          href={"/login"}
          className="text-sm font-medium hover:underline underline-offset-4"
        >
          <Button variant={"outline"}> {homeT("signin")}</Button>
        </Link>
      )}
    </>
  );
};
const NavItemsLeft = () => {
  const homeT = useTranslations("home.navigtion");
  return (
    <>
      <Link
        href={"#features"}
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        {homeT("features")}
      </Link>
      <Link
        href={"#pricing"}
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        {homeT("pricing")}
      </Link>
      <Link
        href={"#faqs"}
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        {homeT("faqs")}
      </Link>
      <Link
        href={"https://github.com/geallenboy"}
        className="text-sm font-medium hover:underline underline-offset-4"
      >
        {homeT("aboutMe")}
      </Link>
      <Link
        href={"https://github.com/geallenboy/ai-image"}
        className="text-sm font-medium hover:underline underline-offset-4 tracking-tighter"
      >
        {homeT("github")}
      </Link>
    </>
  );
};

const Navigtion = async () => {
  const supabase = await createClient();
  const user = await getUser(supabase);

  return (
    <div className="w-full bg-background/60 backdrop-blur-md fixed top-0 px-8 py-4 z-50 shadow-xl overflow-hidden">
      <header className="contariner mx-auto flex items-center ">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center justify-center gap-6">
            <Logo />
            <nav className="hidden md:flex items-center justify-center gap-3 ml-2">
              <NavItemsLeft />
            </nav>
          </div>
          <div className="hidden md:flex items-center justify-center gap-3">
            <NavItemsRight user={user} />
          </div>
        </div>
        <div className="ml-auto md:hidden overflow-hidden">
          <Sheet>
            <SheetTrigger>
              <Menu className="h-6 w-6" strokeWidth={1.5} />
            </SheetTrigger>
            <SheetContent>
              <SheetTitle className="sr-only">导航</SheetTitle>
              <nav className="flex flex-col gap-4 mt-12">
                <NavItemsLeft />
                <NavItemsRight user={user} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </div>
  );
};

export default Navigtion;
