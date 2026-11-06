"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  Check,
  ChevronDown,
} from "lucide-react";
import { Shade, SHADES } from "../lib/shades";
import { useVernisStore } from "../lib/store";
import { BottleGraphic } from "./BottleGraphic";
import { HandGraphic } from "./HandGraphic";
import { Header } from "./Header";
import { BagDrawer } from "./BagDrawer";
import { Footer } from "./Footer";
import { atelierAudio } from "../lib/audio";
import { motion, AnimatePresence } from "framer-motion";

interface ProductDetailViewProps {
  initialShade: Shade;
}

export function ProductDetailView({ initialShade }: ProductDetailViewProps) {
  const { setActiveShade, addToBag, openBag } = useVernisStore();

  const [currentShade, setCurrentShade] = useState<Shade>(initialShade);
  const [activeView, setActiveView] = useState<"bottle" | "hand">("bottle");
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("origin");

  // Sync global store and CSS variables on shade switch
  useEffect(() => {
    setActiveShade(currentShade);
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      root.style.setProperty("--shade", currentShade.hex);
      root.style.setProperty("--shade-deep", currentShade.hexDeep);
      root.style.setProperty("--shade-soft", currentShade.hexSoft);
      document.title = `${currentShade.number} ${currentShade.name} · VERNIS Haute Lacquer`;
    }
  }, [currentShade, setActiveShade]);

  const handleSelectShade = (shade: Shade) => {
    atelierAudio.playBottleSelect();
    setCurrentShade(shade);
    window.history.replaceState(null, "", `/products/${shade.id}`);
  };

  const handleAddToCart = () => {
    atelierAudio.playBagAdd();
    addToBag(currentShade, quantity);
    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      openBag();
    }, 400);
  };

  const otherShades = SHADES.filter((s) => s.id !== currentShade.id);

  return (
    <div className="min-h-screen bg-[#0D090B] text-[#F5ECEE] selection:bg-[#8E0C2D] selection:text-white flex flex-col justify-between">
      <Header />

      <main className="flex-1 pt-24 md:pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto w-full">
        {/* Minimal Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[#8E7E84] mb-8 md:mb-12"
        >
          <Link
            href="/"
            className="hover:text-[#F5ECEE] transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>VERNIS</span>
          </Link>
          <span className="text-white/20">/</span>
          <Link
            href="/#shades"
            className="hover:text-[#F5ECEE] transition-colors"
          >
            Collection
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-[#F5ECEE]">
            {currentShade.number} {currentShade.name}
          </span>
        </nav>

        {/* PRODUCT-FIRST TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24">
          {/* LEFT: Large Minimal Product Canvas (Bottle & Hand views) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Viewport: 1:1 square aspect ratio */}
            <div
              className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center transition-all duration-500 shadow-2xl"
              style={{
                backgroundColor: "#110A0D",
                backgroundImage: `radial-gradient(circle at 50% 50%, ${currentShade.hexDeep}40 0%, #0D090B 85%)`,
              }}
            >
              {/* Minimal View Toggle Tabs */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10">
                <button
                  onClick={() => setActiveView("bottle")}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-medium transition-all duration-200 ${
                    activeView === "bottle"
                      ? "bg-white text-black shadow-sm"
                      : "text-[#8E7E84] hover:text-[#F5ECEE]"
                  }`}
                >
                  Flacon
                </button>
                <button
                  onClick={() => setActiveView("hand")}
                  className={`px-3.5 py-1.5 rounded-full text-[10px] uppercase tracking-[0.18em] font-medium transition-all duration-200 ${
                    activeView === "hand"
                      ? "bg-white text-black shadow-sm"
                      : "text-[#8E7E84] hover:text-[#F5ECEE]"
                  }`}
                >
                  On Nails
                </button>
              </div>

              {/* Shade Number Badge */}
              <div className="absolute top-4 right-4 z-20 text-[10px] font-mono tracking-widest text-[#F5ECEE]/80 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                NO. {currentShade.number}
              </div>

              {/* Crossfading Display */}
              <AnimatePresence mode="wait">
                {activeView === "bottle" ? (
                  <motion.div
                    key={`bottle-${currentShade.id}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 w-full h-full flex items-center justify-center p-8 md:p-12"
                  >
                    <div className="w-56 sm:w-64 md:w-72 lg:w-80 h-72 sm:h-88 md:h-96 lg:h-[440px] flex items-center justify-center">
                      <BottleGraphic
                        colorHex={currentShade.hex}
                        imageSrc={currentShade.image}
                        className="w-full h-full scale-125 drop-shadow-[0_20px_40px_rgba(0,0,0,0.85)]"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`hand-${currentShade.id}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden"
                  >
                    <HandGraphic
                      colorHex={currentShade.hex}
                      imageSrc={currentShade.handSquareImage || currentShade.handImage}
                      isCloseUp={false}
                      className="w-full h-full"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Thumbnail Quick Switcher */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveView("bottle")}
                className={`relative aspect-[16/9] rounded-xl overflow-hidden border p-2.5 flex items-center gap-3 transition-all duration-200 text-left ${
                  activeView === "bottle"
                    ? "border-white/40 bg-white/5"
                    : "border-white/10 hover:border-white/20 bg-black/20"
                }`}
              >
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
                  <BottleGraphic
                    colorHex={currentShade.hex}
                    imageSrc={currentShade.image}
                    className="w-full h-full"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-medium text-[#F5ECEE] block">
                    Flacon View
                  </span>
                  <span className="text-[10px] text-[#8E7E84]">
                    Crystal Bottle
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveView("hand")}
                className={`relative aspect-[16/9] rounded-xl overflow-hidden border p-2.5 flex items-center gap-3 transition-all duration-200 text-left ${
                  activeView === "hand"
                    ? "border-white/40 bg-white/5"
                    : "border-white/10 hover:border-white/20 bg-black/20"
                }`}
              >
                  <div className="w-8 h-8 flex-shrink-0 rounded-md overflow-hidden border border-white/10">
                    <img
                      src={currentShade.handSquareImage || currentShade.handImage}
                      alt={currentShade.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                <div>
                  <span className="text-[11px] font-medium text-[#F5ECEE] block">
                    On Nails View
                  </span>
                  <span className="text-[10px] text-[#8E7E84]">
                    Full Hand Finish
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* RIGHT: Minimalist, Product-First Buying Dossier */}
          <div className="lg:col-span-5 flex flex-col justify-start">
            {/* Header info */}
            <div className="border-b border-white/10 pb-6 mb-6">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] font-mono block mb-2">
                NAIL LACQUER NO. {currentShade.number}
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.03em] text-[#F5ECEE] mb-2">
                {currentShade.name}
              </h1>

              <p className="text-sm font-light text-[#8E7E84] mb-4">
                {currentShade.descriptor} · {currentShade.finishType}
              </p>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-light text-[#F5ECEE] font-mono">
                  ${currentShade.price}
                </span>
                <span className="text-xs text-[#8E7E84]">
                  · {currentShade.volume} / 0.4 fl. oz.
                </span>
              </div>
            </div>

            {/* COLOR SWITCHER */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E7E84] font-mono">
                  SHADE
                </span>
                <span className="text-xs font-mono text-[#F5ECEE]">
                  {currentShade.number} · {currentShade.name}
                </span>
              </div>

              {/* 6 Minimal Color Dots */}
              <div className="flex items-center gap-2 p-1.5 rounded-full bg-black/30 border border-white/10 w-fit">
                {SHADES.map((shade) => {
                  const isSelected = shade.id === currentShade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => handleSelectShade(shade)}
                      className={`group relative p-1 rounded-full transition-all duration-200 ${
                        isSelected
                          ? "ring-1 ring-white/60 bg-white/10"
                          : "hover:bg-white/5"
                      }`}
                      aria-label={`Select shade ${shade.name}`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full border transition-transform duration-200 ${
                          isSelected
                            ? "scale-105 border-white ring-2 ring-white/20"
                            : "border-black/50 group-hover:scale-105"
                        }`}
                        style={{ backgroundColor: shade.hex }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BUYING CONTROLS: Quantity + Add to Bag */}
            <div className="flex gap-3 mb-8">
              {/* Stepper */}
              <div className="flex items-center justify-between border border-white/15 rounded-full px-3.5 py-3 w-28 bg-black/30">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-sm text-[#8E7E84] hover:text-[#F5ECEE] transition-colors px-1"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-xs font-mono font-medium text-[#F5ECEE]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-sm text-[#8E7E84] hover:text-[#F5ECEE] transition-colors px-1"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-3 px-6 rounded-full text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 flex items-center justify-center gap-2.5 ${
                  justAdded
                    ? "bg-[#6A0D23] text-white border border-[#8E0C2D]"
                    : "bg-[#180E13] hover:bg-[#27151F] text-[#F5ECEE] border border-white/20 hover:border-white/40"
                }`}
              >
                {justAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>Added</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 stroke-[2]" />
                    <span>
                      Add to Bag · ${(currentShade.price * quantity).toFixed(0)}
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* QUICK FORMULA SPECS (Product-first & Concise) */}
            <div className="grid grid-cols-2 gap-2.5 pb-6 border-b border-white/10 mb-6 text-xs">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] uppercase tracking-widest text-[#8E7E84] font-mono block">
                  Coverage
                </span>
                <span className="text-xs text-[#F5ECEE] mt-0.5 block">
                  {currentShade.details.coverage}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] uppercase tracking-widest text-[#8E7E84] font-mono block">
                  Drying Time
                </span>
                <span className="text-xs text-[#F5ECEE] mt-0.5 block">
                  {currentShade.details.dryingTime}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] uppercase tracking-widest text-[#8E7E84] font-mono block">
                  Standard
                </span>
                <span className="text-xs text-[#F5ECEE] mt-0.5 block">
                  10-Free Clean · Vegan
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="text-[9px] uppercase tracking-widest text-[#8E7E84] font-mono block">
                  Origin
                </span>
                <span className="text-xs text-[#F5ECEE] mt-0.5 block truncate">
                  {currentShade.origin}
                </span>
              </div>
            </div>

            {/* MINIMALIST ACCORDIONS: Shade Origin, Application, Ingredients */}
            <div className="divide-y divide-white/10 text-xs">
              {/* Accordion 1: The Shade & Origin */}
              <div className="py-3">
                <button
                  onClick={() =>
                    setOpenAccordion(
                      openAccordion === "origin" ? null : "origin"
                    )
                  }
                  className="w-full flex items-center justify-between text-left py-1 text-[#F5ECEE] hover:text-white transition-colors"
                >
                  <span className="text-[11px] uppercase tracking-[0.16em] font-medium">
                    Shade & Pigment
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#8E7E84] transition-transform duration-200 ${
                      openAccordion === "origin" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "origin" && (
                  <div className="pt-2 pb-1 text-[#8E7E84] leading-relaxed">
                    <p>{currentShade.sourcingStory}</p>
                    <p className="mt-2 text-[11px] text-[#F5ECEE]/70">
                      Hand-poured in Grasse, France with optical crystal flacon and
                      contoured bristle.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion 2: Application */}
              <div className="py-3">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "how" ? null : "how")
                  }
                  className="w-full flex items-center justify-between text-left py-1 text-[#F5ECEE] hover:text-white transition-colors"
                >
                  <span className="text-[11px] uppercase tracking-[0.16em] font-medium">
                    Application
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#8E7E84] transition-transform duration-200 ${
                      openAccordion === "how" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "how" && (
                  <div className="pt-2 pb-1 text-[#8E7E84] leading-relaxed space-y-1.5">
                    <p>1. Wipe nail bed clean and dry.</p>
                    <p>2. Apply two thin coats, waiting 90 seconds between coats.</p>
                    <p>3. Seal with clear topcoat for 7–10 days chip-resistant wear.</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Full Ingredients */}
              <div className="py-3">
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === "inci" ? null : "inci")
                  }
                  className="w-full flex items-center justify-between text-left py-1 text-[#F5ECEE] hover:text-white transition-colors"
                >
                  <span className="text-[11px] uppercase tracking-[0.16em] font-medium">
                    Ingredients (INCI)
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#8E7E84] transition-transform duration-200 ${
                      openAccordion === "inci" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openAccordion === "inci" && (
                  <div className="pt-2 pb-1 text-[#8E7E84] font-mono text-[10px] leading-relaxed">
                    {currentShade.ingredients.join(" · ")}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* OTHER SHADES (Product-First Collection Row) */}
        <section className="pt-12 border-t border-white/10">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] font-mono">
              THE COLLECTION
            </span>
            <Link
              href="/#shades"
              className="text-[11px] uppercase tracking-[0.18em] text-[#8E7E84] hover:text-[#F5ECEE] transition-colors flex items-center gap-1"
            >
              <span>View all</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {otherShades.map((shade) => (
              <Link
                key={shade.id}
                href={`/products/${shade.id}`}
                onClick={() => {
                  setCurrentShade(shade);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="group flex flex-col gap-2.5 p-2.5 rounded-2xl bg-black/20 border border-white/10 hover:border-white/30 transition-all duration-200"
              >
                <div
                  className="w-full aspect-square rounded-xl overflow-hidden relative flex items-center justify-center p-2"
                  style={{ backgroundColor: shade.hex }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  <div className="w-full h-full flex items-center justify-center">
                    <BottleGraphic
                      colorHex={shade.hex}
                      imageSrc={shade.image}
                      className="w-full h-full scale-105 group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <span className="absolute top-2 left-2 text-[9px] font-mono tracking-widest text-white/90 bg-black/50 px-2 py-0.5 rounded-full">
                    {shade.number}
                  </span>
                </div>

                <div className="px-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-[#F5ECEE] group-hover:text-white transition-colors">
                      {shade.name}
                    </span>
                    <span className="text-[11px] font-mono text-[#8E7E84]">
                      ${shade.price}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8E7E84] block truncate">
                    {shade.descriptor}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <BagDrawer />
    </div>
  );
}
