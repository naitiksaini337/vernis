"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag, Volume2, VolumeX } from "lucide-react";
import { useVernisStore } from "../lib/store";
import { atelierAudio } from "../lib/audio";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const { mode, bag, isBagOpen, openBag, lastAddedTimestamp, totalCount } = useVernisStore();
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const count = totalCount();

  const toggleAudio = () => {
    const next = atelierAudio.toggleMute();
    setIsMuted(next);
  };

  // Scroll detection for header style
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0D090B]/85 backdrop-blur-xl border-b border-white/10 py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Left: VERNIS Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-2 text-sm uppercase tracking-[0.28em] font-light text-[#F5ECEE] hover:opacity-80 transition-opacity"
          aria-label="VERNIS Home"
        >
          <span className="font-medium">VERNIS</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--shade)] shade-transition inline-block" />
        </Link>

        {/* Centre: Nav links (fade out in try-on mode) */}
        <nav
          aria-label="Primary Navigation"
          className={`hidden md:flex items-center gap-8 text-[11px] uppercase tracking-[0.18em] font-light transition-all duration-500 ${
            mode === "tryon" ? "opacity-0 pointer-events-none -translate-y-1" : "opacity-90 translate-y-0"
          }`}
        >
          <Link
            href="/#shades"
            className="text-[#F5ECEE]/75 hover:text-[#F5ECEE] transition-colors"
          >
            Shades
          </Link>
          <span className="text-[#8E7E84]/40">·</span>
          <Link
            href="/#how-to-wear"
            className="text-[#F5ECEE]/75 hover:text-[#F5ECEE] transition-colors"
          >
            How to wear
          </Link>
          <span className="text-[#8E7E84]/40">·</span>
          <Link
            href="/#about"
            className="text-[#F5ECEE]/75 hover:text-[#F5ECEE] transition-colors"
          >
            About
          </Link>
        </nav>

        {/* Right: Bag Pill Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={openBag}
            className="group relative flex items-center gap-2.5 px-4 py-2 rounded-full glass-pill hover:bg-white/15 transition-all focus:outline-none"
            aria-label={`Open shopping bag, ${count} items`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-[#F5ECEE] stroke-[1.8] group-hover:scale-105 transition-transform" />
            <span className="text-[11px] uppercase tracking-[0.18em] font-medium text-[#F5ECEE]">
              Bag
            </span>

            {/* Bump badge on item added */}
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={lastAddedTimestamp || count}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="min-w-4 h-4 px-1 rounded-full text-[9px] font-semibold flex items-center justify-center text-white bg-[var(--shade)] shade-transition"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
}

