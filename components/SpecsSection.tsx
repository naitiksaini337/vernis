"use client";

import React from "react";
import { motion } from "framer-motion";

export function SpecsSection() {
  const specs = [
    { value: "12 ml", label: "Volume" },
    { value: "6", label: "Curated Shades" },
    { value: "Wide", label: "Contour Brush" },
    { value: "High Gloss", label: "Enamel Finish" },
  ];

  return (
    <section
      id="about"
      className="py-28 md:py-36 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 border-t border-white/5 text-center flex flex-col items-center justify-center space-y-20"
    >
      {/* Centred Display Text (max 18ch, 48-64px, weight 300) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl"
      >
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[-0.03em] text-[#F5ECEE] leading-[1.15]">
          See the colour on a hand{" "}
          <span
            className="shade-transition italic font-normal"
            style={{ color: "var(--shade-soft)" }}
          >
            before it reaches yours.
          </span>
        </h2>
      </motion.div>

      {/* Four-up Spec Row, Centred, Evenly Spaced */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/10"
      >
        {specs.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-1.5">
            <span className="text-2xl md:text-3xl font-light text-[#F5ECEE] tracking-tight">
              {item.value}
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8E7E84] font-medium">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}

