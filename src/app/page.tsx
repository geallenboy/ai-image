import React from "react";
import Faqs from "@/components/landing-page/faqs";
import Features from "@/components/landing-page/features";
import Footer from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Navigtion from "@/components/landing-page/navigation";

export default async function HomePage() {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navigtion />
      <Hero />
      <Features />
      <Faqs />
      <Footer />
    </main>
  );
}
