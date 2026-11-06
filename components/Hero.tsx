"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, Check } from "lucide-react";
import { useVernisStore } from "../lib/store";
import { SHADES, Shade } from "../lib/shades";
import { BottleGraphic } from "./BottleGraphic";
import { HandGraphic } from "./HandGraphic";
import { atelierAudio } from "../lib/audio";
import { motion, AnimatePresence } from "framer-motion";

export function Hero() {
  const {
    activeShade,
    setActiveShade,
    mode,
    setMode,
    addToBag,
  } = useVernisStore();

  const [hoveredShadeId, setHoveredShadeId] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  // Lock scroll in try-on mode
  useEffect(() => {
    if (mode === "tryon") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mode]);

  // Handle ESC key to return from try-on mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mode === "tryon") {
        setMode("browse");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mode, setMode]);

  // Arrow key navigation for bottle radiogroup
  const handleKeyDownRadiogroup = useCallback(
    (e: React.KeyboardEvent) => {
      const currentIndex = SHADES.findIndex((s) => s.id === activeShade.id);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        const next = SHADES[(currentIndex + 1) % SHADES.length];
        setActiveShade(next);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        const prev = SHADES[(currentIndex - 1 + SHADES.length) % SHADES.length];
        setActiveShade(prev);
      }
    },
    [activeShade, setActiveShade]
  );

  const handleAdd = () => {
    atelierAudio.playBagAdd();
    addToBag(activeShade, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  return (
    <section
      id="hero"
      aria-label="Vernis Hero Experience"
      className="relative w-full h-[100svh] min-h-[680px] max-h-[1180px] overflow-hidden flex flex-col justify-end pt-20 pb-8 px-6 md:px-12 shade-transition select-none"
      style={{
        backgroundColor: "var(--bg-page)",
      }}
    >
      {/* 1. FULL-BLEED HERO BACKGROUND PHOTOS (6 Stacked Crossfading Photos) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none">
        {SHADES.map((shade) => {
          const isSelected = activeShade.id === shade.id;
          return (
            <motion.div
              key={shade.id}
              initial={false}
              animate={{
                opacity: isSelected ? 1 : 0,
                scale: mode === "tryon" ? 1.06 : 1,
              }}
              transition={{
                opacity: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={shade.handHeroImage || shade.handImage}
                alt={`Hand wearing ${shade.name}`}
                className="w-full h-full object-cover object-[32%_45%] filter brightness-[0.92] contrast-[1.04]"
                loading="eager"
              />
            </motion.div>
          );
        })}

        {/* Ambient Dark Overlays for High-Contrast Luxury Typography */}
        {/* Top gradient for Header and Headline legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/25 to-transparent h-1/2 pointer-events-none" />

        {/* Bottom vignette so the standing bottles and captions stand out sharply */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D090B] via-[#0D090B]/60 to-transparent top-1/3 pointer-events-none" />

        {/* Subtle radial atmosphere tinted with active shade */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 shade-transition"
          style={{
            background: `radial-gradient(circle at 65% 35%, ${activeShade.hex} 0%, transparent 65%)`,
          }}
        />
      </div>

      {/* 2. OVERLAY LAYER: Try-on Mode Back Button */}
      <AnimatePresence>
        {mode === "tryon" && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="absolute top-24 left-6 md:left-12 z-40"
          >
            <button
              onClick={() => setMode("browse")}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel hover:bg-white/10 text-xs font-light tracking-wider text-[#F5ECEE] transition-all shadow-xl"
              aria-label="Back to browse mode (Esc)"
            >
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <ChevronLeft className="w-4 h-4 stroke-[2]" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium pr-1">
                Browse
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP Top-Right Hero Text Block (Browse Mode) */}
      <AnimatePresence>
        {mode === "browse" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.35 } }}
            transition={{ duration: 0.5 }}
            className="hidden md:flex absolute top-24 right-6 md:right-12 flex-col items-end text-right z-30 max-w-md space-y-4"
          >
            {/* Category label */}
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#8E7E84] font-medium drop-shadow-sm">
              {activeShade.number} · NAIL LACQUER
            </div>

            {/* Huge Shade Name with vertical slide + blur (clickable to product page) */}
            <div className="h-24 overflow-hidden relative w-full flex justify-end items-center">
              <AnimatePresence mode="popLayout">
                <Link
                  key={activeShade.id}
                  href={`/products/${activeShade.id}`}
                  className="group"
                >
                  <motion.h1
                    initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -40, opacity: 0, filter: "blur(6px)" }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    aria-live="polite"
                    className="font-light text-6xl lg:text-7xl xl:text-8xl tracking-[-0.03em] text-[#F5ECEE] whitespace-nowrap drop-shadow-lg group-hover:text-white group-hover:opacity-90 transition-opacity"
                  >
                    {activeShade.name}
                  </motion.h1>
                </Link>
              </AnimatePresence>
            </div>

            {/* Tagline */}
            <p className="text-xs md:text-sm font-light text-[#F5ECEE]/85 max-w-xs leading-relaxed drop-shadow-sm">
              Glossy, chip-resistant colour. 12 ml.
            </p>

            {/* CTA Buttons: Add to Bag, Product Page, Try it on */}
            <div className="pt-2 flex items-center gap-2.5">
              <button
                onClick={handleAdd}
                className="group relative flex items-center gap-3 pl-4 pr-2 py-2 rounded-full bg-[#160E12] hover:bg-[#25171F] border border-white/20 transition-all duration-300"
              >
                <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#F5ECEE]">
                  {justAdded ? "Added ✓" : "Add to bag"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-semibold text-[#F5ECEE]">
                  ${activeShade.price}
                </span>
              </button>

              <Link
                href={`/products/${activeShade.id}`}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/40 hover:border-white/80 hover:bg-white/10 transition-all text-[11px] uppercase tracking-[0.18em] font-medium text-[#F5ECEE]"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => setMode("tryon")}
                className="flex items-center gap-1 px-3.5 py-2 rounded-full border border-white/15 hover:border-white/40 hover:bg-white/5 transition-all text-[11px] uppercase tracking-[0.18em] font-medium text-[#8E7E84] hover:text-[#F5ECEE]"
              >
                <span>Try on</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LOWER SECTION - BROWSE MODE: 6 Standing Bottles Radiogroup */}
      <AnimatePresence>
        {mode === "browse" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30, transition: { duration: 0.3 } }}
            transition={{ duration: 0.6 }}
            className="relative z-30 w-full max-w-7xl mx-auto pb-4"
          >
            {/* Accessible Radiogroup */}
            <div
              role="radiogroup"
              aria-label="Select Nail Lacquer Shade"
              tabIndex={0}
              onKeyDown={handleKeyDownRadiogroup}
              className="grid grid-cols-6 gap-2 sm:gap-4 md:gap-6 items-end justify-center focus:outline-none"
            >
              {SHADES.map((shade) => {
                const isSelected = activeShade.id === shade.id;
                const isHovered = hoveredShadeId === shade.id;

                return (
                  <div
                    key={shade.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={isSelected ? 0 : -1}
                    onClick={() => {
                      setActiveShade(shade);
                      atelierAudio.playBottleSelect();
                    }}
                    onMouseEnter={() => {
                      setHoveredShadeId(shade.id);
                      setActiveShade(shade);
                    }}
                    onMouseLeave={() => setHoveredShadeId(null)}
                    className="flex flex-col items-center cursor-pointer group"
                  >
                    {/* Bottle Graphic with 6px lift on hover - Extra Large & Prominent */}
                    <div className="w-24 sm:w-28 md:w-36 lg:w-44 xl:w-48 h-36 sm:h-44 md:h-52 lg:h-64 flex items-center justify-center">
                      <BottleGraphic
                        colorHex={shade.hex}
                        imageSrc={shade.image}
                        isHovered={isHovered || isSelected}
                        className="w-full h-full scale-110"
                      />
                    </div>

                    {/* Caption under each bottle: number, name, $28 */}
                    <div className="text-center mt-3 space-y-0.5">
                      <div className="text-[11px] sm:text-xs uppercase tracking-[0.18em] font-medium text-[#F5ECEE]/90">
                        {shade.number}
                      </div>
                      <div className="hidden sm:block text-xs sm:text-sm font-light text-[#F5ECEE] tracking-tight">
                        {shade.name}
                      </div>
                      <div className="text-[10px] sm:text-xs text-[#8E7E84] font-normal">
                        ${shade.price}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE LOWER BAR (Browse Mode) */}
      {mode === "browse" && (
        <div className="md:hidden flex flex-col gap-3 z-30 pt-4">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#8E7E84]">
              {activeShade.number} · NAIL LACQUER
            </span>
            <Link href={`/products/${activeShade.id}`} className="block group">
              <h2 className="text-4xl font-light text-[#F5ECEE] tracking-tight group-hover:text-white flex items-center justify-between">
                <span>{activeShade.name}</span>
                <span className="text-sm font-mono text-[#8E7E84]">DETAILS →</span>
              </h2>
            </Link>
            <p className="text-[11px] text-[#8E7E84]">
              Glossy, chip-resistant colour. 12 ml.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handleAdd}
              className="py-3 px-4 rounded-full bg-[#160E12] border border-white/10 text-[11px] uppercase tracking-wider font-medium text-[#F5ECEE] flex items-center justify-center gap-2 shadow-lg"
            >
              <span>{justAdded ? "Added ✓" : "Add to bag"}</span>
              <span className="text-[10px] font-semibold text-[#8E7E84]">
                ${activeShade.price}
              </span>
            </button>
            <button
              onClick={() => setMode("tryon")}
              className="py-3 px-4 rounded-full glass-pill text-[11px] uppercase tracking-wider font-medium text-[#F5ECEE] flex items-center justify-center gap-1.5"
            >
              <span>Try it on</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* TRY-ON MODE: Glass Panel (Desktop side panel ~280px wide / Mobile bottom sheet) */}
      <AnimatePresence>
        {mode === "tryon" && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-0 inset-x-0 md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:right-12 md:left-auto md:w-[280px] z-40"
          >
            <div className="glass-panel-tinted rounded-t-[24px] md:rounded-3xl p-6 pb-8 md:pb-6 flex flex-col gap-5 border-b-0 md:border-b">
              {/* Header */}
              <div className="space-y-1">
                <div className="text-[9px] uppercase tracking-[0.25em] text-[#8E7E84] font-medium">
                  TRY IT ON
                </div>
                <Link
                  href={`/products/${activeShade.id}`}
                  className="text-2xl font-light text-[#F5ECEE] tracking-tight hover:underline flex items-center justify-between group"
                >
                  <span>{activeShade.name}</span>
                  <span className="text-[10px] font-mono text-[#8E7E84] group-hover:text-white transition-colors">
                    DETAILS →
                  </span>
                </Link>
              </div>

              {/* Row of 6 glossy circular swatches */}
              <div className="flex items-center justify-between gap-2 py-1">
                {SHADES.map((shade) => {
                  const isCurrent = activeShade.id === shade.id;
                  return (
                    <button
                      key={shade.id}
                      onClick={() => {
                        setActiveShade(shade);
                        atelierAudio.playSwatchTap();
                      }}
                      className="group relative focus:outline-none"
                      aria-label={`Select shade ${shade.name}`}
                    >
                      {/* Active offset ring */}
                      {isCurrent && (
                        <motion.span
                          layoutId="activeSwatchRing"
                          className="absolute -inset-1 rounded-full border border-white/60"
                          transition={{ duration: 0.3 }}
                        />
                      )}
                      {/* Swatch circle with specular highlight */}
                      <span
                        className="relative block w-7 h-7 rounded-full shadow-inner transition-transform group-hover:scale-110"
                        style={{
                          backgroundColor: shade.hex,
                          boxShadow:
                            "inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -2px 4px rgba(0,0,0,0.5)",
                        }}
                      >
                        <span className="absolute top-1 left-1.5 w-2 h-1 rounded-full bg-white/50 blur-[0.5px]" />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Caption */}
              <div className="text-xs text-[#8E7E84] font-light flex items-center justify-between">
                <span>
                  {activeShade.number} — {activeShade.name}
                </span>
                <span className="text-[10px] text-[#F5ECEE]/70">
                  {activeShade.descriptor}
                </span>
              </div>

              {/* Full-width Add to bag CTA pill */}
              <button
                onClick={handleAdd}
                className="w-full py-3 px-4 rounded-full bg-[var(--shade)] hover:opacity-90 text-[#F5ECEE] text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-lg flex items-center justify-center gap-2"
              >
                {justAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added ✓</span>
                  </>
                ) : (
                  <span>Add to bag · ${activeShade.price}</span>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

