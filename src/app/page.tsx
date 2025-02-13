import React from "react";
import Faqs from "@/components/landing-page/faqs";
import Features from "@/components/landing-page/features";
import Footer from "@/components/landing-page/footer";
import Hero from "@/components/landing-page/hero";
import Navigtion from "@/components/landing-page/navigation";
import PricingPage from "@/components/landing-page/pricing";
import Testimonials from "@/components/landing-page/testimonials";
import { getProducts, getUser } from "@/lib/supabase/queries";
import { createServer } from "@/lib/supabase/server";
import Ready from "@/components/landing-page/ready";

export default async function HomePage() {
  const supabase = await createServer();
  const [user, products] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
  ]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <Navigtion user={user} />
      <Hero />
      <Features />
      <Testimonials />
      <Faqs />
      <PricingPage products={products ?? []} />
      <Ready />
      <Footer />
    </main>
  );
}
