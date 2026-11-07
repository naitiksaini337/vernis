"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { HandGraphic } from "./HandGraphic";
import { useVernisStore } from "../lib/store";
import { atelierAudio } from "../lib/audio";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, ShieldCheck, Clock } from "lucide-react";

export function StepsSection() {
  const { activeShade } = useVernisStore();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  const steps = [
    {
      number: "01",
      stage: "Stage 01 · Natural Prep",
      tag: "PREPARATION",
      title: "Cleanse & Prime",
      instruction:
        "Wipe nail bed clean of natural oils with an alcohol pad. Ensure nails are completely dry before application.",
      proTip:
        "Pure alcohol only — avoid moisturizing soaps right before application to guarantee optimal resin bonding.",
      metric: "0% Oil Residue",
      time: "30 Seconds",
      image: "/images/hands/hand-white-crop.jpg",
      isPrepImage: true,
    },
    {
      number: "02",
      stage: `Stage 02 · Pigment Infusion · ${activeShade.name}`,
      tag: "APPLICATION",
      title: "Two Whispered Coats",
      instruction:
        "Glide the contoured bristle from cuticle to tip in one fluid stroke. Allow 90 seconds between coats for deep opacity.",
      proTip:
        "Start center, then fan to the sidewalls. The laser-cut Italian brush contours the cuticle line effortlessly.",
      metric: "100% Opaque",
      time: "90s Dry Time",
      image: activeShade.handSquareImage || activeShade.handImage,
      isPrepImage: false,
    },
    {
      number: "03",
      stage: "Stage 03 · Glass Glaze Seal",
      tag: "FINISH & LOCK",
      title: "Seal the Edge",
      instruction:
        "Cap the free tip with Glass Glaze topcoat to lock in depth and guarantee 7–10 days of chip-resistant reflection.",
      proTip:
        "Lightly sweep the brush horizontally along the tip edge to shield the pigment against daily micro-friction.",
      metric: "Mirror Reflection",
      time: "7–10 Days Wear",
      image: activeShade.handSquareImage || activeShade.handImage,
      isPrepImage: false,
    },
  ];

  const handleStepClick = (index: number) => {
    atelierAudio.playSwatchTap();
    setActiveStep(index);
  };

  const handleNextStep = () => {
    const next = (activeStep + 1) % steps.length;
    handleStepClick(next);
  };

  const handlePrevStep = () => {
    const prev = (activeStep - 1 + steps.length) % steps.length;
    handleStepClick(prev);
  };

  const current = steps[activeStep];

  return (
    <section
      ref={sectionRef}
      id="how-to-wear"
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 border-t border-white/5 relative"
    >
      {/* Background subtle radial glow */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] opacity-15 pointer-events-none blur-3xl shade-transition rounded-full"
        style={{
          background: `radial-gradient(circle, ${activeShade.hex} 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
        <div>
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--shade)] shade-transition" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] font-mono">
              APPLICATION RITUAL
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.03em] text-[#F5ECEE] leading-tight">
            Three steps to a{" "}
            <span
              className="shade-transition italic font-normal"
              style={{ color: "var(--shade-soft)" }}
            >
              clean finish.
            </span>
          </h2>
        </div>

        <p className="text-xs md:text-sm font-light text-[#8E7E84] max-w-sm leading-relaxed">
          Compounded for salon longevity. Follow the three-stage ritual for
          uncompromising mirror gloss and 10-day chip resistance.
        </p>
      </div>

      {/* Interactive Stage Step Tabs (Mobile & Desktop) */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-8 max-w-xl">
        {steps.map((s, idx) => {
          const isActive = activeStep === idx;
          return (
            <button
              key={s.number}
              onClick={() => handleStepClick(idx)}
              className={`py-3 px-3 rounded-xl border text-left transition-all duration-300 relative cursor-pointer ${
                isActive
                  ? "bg-white/[0.06] border-white/20 text-[#F5ECEE]"
                  : "bg-white/[0.01] border-white/5 text-[#8E7E84] hover:border-white/10 hover:text-white/70"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono tracking-widest">
                  {s.number}
                </span>
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shade-transition"
                    style={{ backgroundColor: activeShade.hex }}
                  />
                )}
              </div>
              <div className="text-xs font-medium tracking-wide truncate">
                {s.tag}
              </div>
              {isActive && (
                <motion.div
                  layoutId="activeStepIndicator"
                  className="absolute bottom-0 inset-x-3 h-[2px] rounded-full"
                  style={{ backgroundColor: activeShade.hex }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
        {/* Left: Interactive Visual Frame (col-span-6) */}
        <motion.div
          style={{ y: imageY }}
          className="lg:col-span-6 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#140D10] flex flex-col justify-between min-h-[420px] md:min-h-[500px]"
        >
          {/* Ambient shade tint */}
          <div
            className="absolute inset-0 opacity-20 shade-transition pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${activeShade.hex} 0%, transparent 70%)`,
            }}
          />

          {/* Interactive Image Crossfade */}
          <div className="relative flex-1 w-full h-full min-h-[360px] overflow-hidden flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {current.isPrepImage ? (
                  <img
                    src={current.image}
                    alt={current.stage}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="relative w-full h-full">
                    <img
                      src={current.image}
                      alt={current.stage}
                      className="w-full h-full object-cover"
                    />
                    {/* Glass topcoat gloss overlay in Step 3 */}
                    {activeStep === 2 && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/15 pointer-events-none"
                      />
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Top Stage Indicator Pill */}
            <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#F5ECEE] bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full shade-transition animate-pulse"
                  style={{ backgroundColor: activeShade.hex }}
                />
                {current.stage}
              </span>
            </div>

            {/* Floating Live Metric Badge */}
            <div className="absolute top-5 right-5 z-20 hidden sm:flex items-center gap-1.5 text-[10px] font-mono tracking-wider text-[#8E7E84] bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
              <Clock className="w-3 h-3 text-[var(--shade-soft)]" />
              <span>{current.time}</span>
            </div>
          </div>

          {/* Bottom Interactive Control Bar inside frame */}
          <div className="relative z-20 p-4 md:p-5 bg-[#0E080A]/80 backdrop-blur-md border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-[#8E7E84]">
                STEP {current.number} / 03
              </span>
              <span className="text-white/20">·</span>
              <span className="text-xs font-light text-[#F5ECEE]">
                {current.metric}
              </span>
            </div>

            {/* Step navigation buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevStep}
                aria-label="Previous step"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#8E7E84] hover:text-white hover:border-white/25 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleNextStep}
                aria-label="Next step"
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#8E7E84] hover:text-white hover:border-white/25 transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Right: 3 Interactive Step Cards (col-span-6) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                onClick={() => handleStepClick(idx)}
                className={`p-6 md:p-7 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                  isActive
                    ? "bg-white/[0.04] border-white/25 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
                    : "bg-white/[0.015] border-white/5 hover:border-white/15 hover:bg-white/[0.025]"
                }`}
              >
                {/* Active side glow line */}
                {isActive && (
                  <motion.div
                    layoutId="activeCardGlow"
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: activeShade.hex }}
                  />
                )}

                <div className="flex items-start gap-5">
                  <div className="flex flex-col items-center">
                    <span
                      className={`text-base font-mono transition-colors ${
                        isActive
                          ? "font-semibold text-[var(--shade-soft)]"
                          : "text-[#8E7E84] group-hover:text-white"
                      }`}
                    >
                      {step.number}
                    </span>
                    <span className="w-px h-6 bg-white/10 mt-2 block" />
                  </div>

                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3
                        className={`text-base md:text-lg font-normal tracking-wide transition-colors ${
                          isActive ? "text-[#F5ECEE]" : "text-[#8E7E84] group-hover:text-white"
                        }`}
                      >
                        {step.title}
                      </h3>
                      {isActive && (
                        <span className="text-[10px] font-mono tracking-widest text-[var(--shade-soft)] uppercase px-2 py-0.5 rounded border border-white/10 bg-white/5">
                          Active
                        </span>
                      )}
                    </div>

                    <p className="text-xs md:text-sm font-light text-[#8E7E84] leading-relaxed">
                      {step.instruction}
                    </p>

                    {/* Pro tip revealed on active */}
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="pt-3 mt-3 border-t border-white/10 text-[11px] font-light text-[#F5ECEE]/75 flex items-start gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 mt-0.5 text-[var(--shade-soft)] flex-shrink-0" />
                        <span>{step.proTip}</span>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
