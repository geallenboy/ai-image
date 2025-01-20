import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const footerT = useTranslations("home.footer");

  return (
    <footer className="container mx-auto flex flex-col gap-2 sm:flex-row py-6 w-full items-center border-t">
      <p>
        &copy; {new Date().getFullYear()}
        {footerT("title1")}
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4">
          {footerT("title2")}
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4">
          {footerT("title3")}
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
