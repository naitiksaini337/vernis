"use client";

import React, { useRef } from "react";
import { HandGraphic } from "./HandGraphic";
import { useVernisStore } from "../lib/store";
import { motion, useScroll, useTransform } from "framer-motion";

export function StepsSection() {
  const { activeShade } = useVernisStore();
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  const steps = [
    {
      number: "01",
      title: "Cleanse & Prime",
      instruction:
        "Wipe nail bed clean of natural oils with an alcohol pad. Ensure nails are completely dry before application.",
    },
    {
      number: "02",
      title: "Two Whispered Coats",
      instruction:
        "Glide the contoured bristle from cuticle to tip in one fluid stroke. Allow 90 seconds between coats for deep opacity.",
    },
    {
      number: "03",
      title: "Seal the Edge",
      instruction:
        "Cap the free tip with Glass Glaze topcoat to lock in depth and guarantee 7–10 days of chip-resistant reflection.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="how-to-wear"
      className="py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 border-t border-white/5"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] block mb-3 font-mono">
            APPLICATION RITUAL
          </span>
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

        <p className="text-xs md:text-sm font-light text-[#8E7E84] max-w-xs leading-relaxed">
          Compounded for salon longevity. Follow the three-stage ritual for
          uncompromising mirror gloss.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left: 4:3 Minimal Visual Frame */}
        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#140D10]"
        >
          {/* Ambient shade tint */}
          <div
            className="absolute inset-0 opacity-20 shade-transition pointer-events-none"
            style={{
              background: `radial-gradient(circle at 40% 40%, ${activeShade.hex} 0%, transparent 70%)`,
            }}
          />

          <div className="w-full h-full flex items-center justify-center">
            <HandGraphic
              colorHex="#E6DDD8"
              imageSrc="/images/hands/hand-white-crop.jpg"
              isCloseUp={false}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute bottom-4 left-5 text-[10px] uppercase font-mono tracking-widest text-[#8E7E84]/70 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/5">
            Stage 01 · Natural Prep
          </div>
        </motion.div>

        {/* Right: 3 Minimalist Step Blocks */}
        <div className="lg:col-span-6 space-y-6">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 md:p-7 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300 group flex items-start gap-6"
            >
              <span className="text-sm font-mono text-[var(--shade-soft)] mt-0.5 group-hover:scale-110 transition-transform">
                {step.number}
              </span>

              <div className="space-y-1.5 flex-1">
                <h3 className="text-base font-normal tracking-wide text-[#F5ECEE] group-hover:text-white transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs font-light text-[#8E7E84] leading-relaxed">
                  {step.instruction}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
