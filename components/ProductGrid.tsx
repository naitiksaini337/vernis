"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Check, Droplet } from "lucide-react";
import { SHADES, Shade } from "../lib/shades";
import { useVernisStore } from "../lib/store";
import { BottleGraphic } from "./BottleGraphic";
import { HandGraphic } from "./HandGraphic";
import { motion } from "framer-motion";

export function ProductGrid() {
  const { setActiveShade, addToBag } = useVernisStore();
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  const [addedShadeMap, setAddedShadeMap] = useState<Record<string, boolean>>({});

  const handleQuickAdd = (shade: Shade, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToBag(shade, 1);
    setAddedShadeMap((prev) => ({ ...prev, [shade.id]: true }));
    setTimeout(() => {
      setAddedShadeMap((prev) => ({ ...prev, [shade.id]: false }));
    }, 1600);
  };

  return (
    <section
      id="shades"
      className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-20 border-t border-white/5"
    >
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 md:mb-20">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] block mb-3 font-medium">
            THE COLLECTION
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.03em] text-[#F5ECEE] leading-tight">
            Six shades,{" "}
            <span
              className="shade-transition italic font-normal"
              style={{ color: "var(--shade-soft)" }}
            >
              one finish.
            </span>
          </h2>
        </div>

        <p className="text-xs md:text-sm font-light text-[#8E7E84] max-w-[280px] leading-relaxed">
          Every lacquer is compounded to the same chip-resistant, ultra-pigmented
          formula. Only the depth of colour evolves.
        </p>
      </div>

      {/* Grid: 3 cols x 2 rows desktop, 2 cols mobile, 16px gap */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {SHADES.map((shade, idx) => {
          const isHovered = hoveredCardId === shade.id;
          const isAdded = !!addedShadeMap[shade.id];

          return (
            <motion.div
              key={shade.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              onMouseEnter={() => setHoveredCardId(shade.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              className="flex flex-col gap-4 group"
            >
              {/* 1:1 Square Tile - Links to Product Page */}
              <Link
                href={`/products/${shade.id}`}
                onClick={() => {
                  setActiveShade(shade);
                }}
                className="relative w-full aspect-square rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 border border-white/10 group-hover:border-white/20 group-hover:shadow-2xl block"
                style={{
                  backgroundColor: shade.hex,
                }}
              >
                {/* Micro-grain vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30 pointer-events-none" />

                {/* Index tag top-left: "01" */}
                <div className="absolute top-3.5 left-3.5 z-20 text-[10px] font-mono tracking-widest text-[#F5ECEE]/90 bg-black/40 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
                  {shade.number}
                </div>

                {/* Crossfading Visual: Bottle <-> Hand wearing shade on hover */}
                <div className="absolute inset-0 flex items-center justify-center p-3 transition-opacity duration-500">
                  {/* Bottle (default) */}
                  <div
                    className={`w-full h-full flex items-center justify-center p-2 transition-opacity duration-500 ${
                      isHovered ? "opacity-0 scale-95" : "opacity-100 scale-100"
                    }`}
                  >
                    <BottleGraphic
                      colorHex={shade.hex}
                      imageSrc={shade.image}
                      className="w-full h-full scale-100 drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                    />
                  </div>

                  {/* Hand wearing shade (on hover) - 1:1 Square */}
                  <div
                    className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
                      isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <HandGraphic
                      colorHex={shade.hex}
                      imageSrc={shade.handSquareImage || shade.handImage}
                      isCloseUp={false}
                      className="w-full h-full"
                    />
                  </div>
                </div>

                {/* "Explore" chip bottom-left of tile (visible on hover) */}
                <div
                  className={`absolute bottom-3.5 left-3.5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel text-[10px] uppercase tracking-widest text-[#F5ECEE] hover:bg-white/20 transition-all duration-300 ${
                    isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none md:flex"
                  }`}
                >
                  <span>Explore</span>
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </Link>

              {/* Card Meta & CTA */}
              <div className="flex flex-col gap-2 px-1">
                {/* Row: Name & Price */}
                <div className="flex items-center justify-between">
                  <Link
                    href={`/products/${shade.id}`}
                    onClick={() => setActiveShade(shade)}
                    className="text-sm font-medium text-[#F5ECEE] tracking-wide hover:underline underline-offset-4 decoration-white/40 transition-colors"
                  >
                    {shade.name}
                  </Link>
                  <span className="text-xs font-mono text-[#8E7E84]">
                    ${shade.price}
                  </span>
                </div>

                {/* Descriptor */}
                <p className="text-[11px] font-light text-[#8E7E84] tracking-normal">
                  {shade.descriptor}
                </p>

                {/* Dark "Add to bag" Pill CTA */}
                <button
                  onClick={(e) => handleQuickAdd(shade, e)}
                  className={`mt-1 w-full py-2.5 px-4 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium transition-all duration-300 flex items-center justify-center gap-2 border ${
                    isAdded
                      ? "bg-[#6A0D23] text-white border-transparent"
                      : "bg-[#160E12] hover:bg-[#22171D] text-[#F5ECEE] border-white/10 hover:border-white/20"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>Added ✓</span>
                    </>
                  ) : (
                    <>
                      <span>Add to bag</span>
                      <Droplet className="w-3 h-3 text-[#8E7E84] group-hover:text-[#F5ECEE] transition-colors" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

