"use client";

import React from "react";
import { motion } from "framer-motion";
import { useVernisStore } from "../lib/store";
import { ShieldCheck, Sparkles, Feather, Gem } from "lucide-react";

export function SpecsSection() {
  const { activeShade } = useVernisStore();

  const specs = [
    {
      value: "12 ml",
      badge: "0.4 FL. OZ.",
      label: "Volume",
      detail: "Heavy optical flint glass molded in northern France to protect pigments from light degradation.",
      icon: Gem,
    },
    {
      value: "6",
      badge: "HAUTE EDITIONS",
      label: "Curated Shades",
      detail: "Blackened cherry, withered botanical crimson, and cold-pressed mineral undertones.",
      icon: Sparkles,
    },
    {
      value: "Wide",
      badge: "400 BRISTLES",
      label: "Contour Brush",
      detail: "Laser-cut Italian fan curve that mirrors the natural cuticle bed in one fluid stroke.",
      icon: Feather,
    },
    {
      value: "High Gloss",
      badge: "10-FREE CLEAN",
      label: "Enamel Finish",
      detail: "Self-leveling resin enriched with sweet almond and camellia oils for 7–10 days mirror reflection.",
      icon: ShieldCheck,
    },
  ];

  const standards = [
    "10-Free Clean Base",
    "100% Vegan & Cruelty-Free",
    "Hand-Poured in Grasse, France",
    "Recyclable Flint Glass",
  ];

  return (
    <section
      id="about"
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 border-t border-white/5 relative flex flex-col items-center justify-center space-y-16 md:space-y-20"
    >
      {/* Background ambient radial tint */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] opacity-10 pointer-events-none blur-3xl shade-transition rounded-full"
        style={{
          background: `radial-gradient(ellipse, ${activeShade.hex} 0%, transparent 70%)`,
        }}
      />

      {/* Header Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl text-center space-y-4"
      >
        <div className="inline-flex items-center gap-2 mb-1">
          <span
            className="w-1.5 h-1.5 rounded-full shade-transition"
            style={{ backgroundColor: activeShade.hex }}
          />
          <span className="text-[10px] uppercase tracking-[0.28em] text-[#8E7E84] font-mono">
            MAISON CRAFTSMANSHIP & SPECIFICATIONS
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-[#F5ECEE] leading-[1.15]">
          See the colour on a hand{" "}
          <span
            className="shade-transition italic font-normal"
            style={{ color: "var(--shade-soft)" }}
          >
            before it reaches yours.
          </span>
        </h2>

        <p className="text-xs md:text-sm font-light text-[#8E7E84] max-w-lg mx-auto leading-relaxed pt-2">
          Formulated without toluene, formaldehyde, or harsh endocrine disruptors.
          Compounded with botanical extracts for deep pigment payoff and enduring mirror gloss.
        </p>
      </motion.div>

      {/* 4 Architectural Spec Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {specs.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 md:p-7 rounded-2xl bg-white/[0.015] border border-white/5 hover:border-white/15 hover:bg-white/[0.03] transition-all duration-300 flex flex-col justify-between space-y-6 group relative overflow-hidden"
            >
              {/* Top Accent Icon & Badge */}
              <div className="flex items-center justify-between">
                <span className="p-2 rounded-xl bg-white/[0.03] border border-white/5 text-[#8E7E84] group-hover:text-[var(--shade-soft)] transition-colors">
                  <Icon className="w-4 h-4" />
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#8E7E84] px-2 py-0.5 rounded border border-white/5 bg-white/[0.02]">
                  {item.badge}
                </span>
              </div>

              {/* Central Value */}
              <div className="space-y-1">
                <div className="text-2xl md:text-3xl font-light text-[#F5ECEE] tracking-tight group-hover:translate-x-0.5 transition-transform">
                  {item.value}
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] font-mono text-[#8E7E84]">
                  {item.label}
                </div>
              </div>

              {/* Micro Detail */}
              <p className="text-xs font-light text-[#8E7E84]/80 leading-relaxed border-t border-white/5 pt-4">
                {item.detail}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Maison Standards Row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full pt-8 border-t border-white/5 flex flex-wrap items-center justify-center gap-6 md:gap-10 text-[11px] font-mono tracking-wider text-[#8E7E84]"
      >
        {standards.map((std, i) => (
          <div key={i} className="flex items-center gap-2">
            <span
              className="w-1 h-1 rounded-full shade-transition"
              style={{ backgroundColor: activeShade.hex }}
            />
            <span>{std}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
