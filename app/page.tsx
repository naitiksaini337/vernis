"use client";

import React, { useEffect } from "react";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ProductGrid } from "../components/ProductGrid";
import { StepsSection } from "../components/StepsSection";
import { SpecsSection } from "../components/SpecsSection";
import { Newsletter } from "../components/Newsletter";
import { Footer } from "../components/Footer";
import { BagDrawer } from "../components/BagDrawer";
import { useVernisStore } from "../lib/store";

export default function VernisHomePage() {
  const { activeShade } = useVernisStore();

  // Initialize CSS variables on initial client mount
  useEffect(() => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--shade", activeShade.hex);
      root.style.setProperty("--shade-deep", activeShade.hexDeep);
      root.style.setProperty("--shade-soft", activeShade.hexSoft);
    }
  }, [activeShade]);

  return (
    <main className="min-h-screen bg-[#0D090B] text-[#F5ECEE] relative overflow-hidden">
      {/* 1. Sticky Navigation Header */}
      <Header />

      {/* 2. Hero Section: Dual-mode (Browse 100svh & Try-On Mode) */}
      <Hero />

      {/* 3. Product Collection Grid: "Six shades, one finish." */}
      <ProductGrid />

      {/* 4. Application Ritual: "Three steps to a clean finish." */}
      <StepsSection />

      {/* 5. Specs & Manifesto: "See the colour on a hand before it reaches yours." */}
      <SpecsSection />

      {/* 6. Newsletter Subscription Card */}
      <Newsletter />

      {/* 7. Minimal Dark Grunge Footer */}
      <Footer />

      {/* 8. Slide-in Shopping Bag Drawer */}
      <BagDrawer />
    </main>
  );
}

