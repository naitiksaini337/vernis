"use client";

import React from "react";
import Link from "next/link";
import { SHADES } from "../lib/shades";

export function Footer() {
  return (
    <footer className="relative w-full bg-[#0E080A] border-t border-white/10 text-white/70 overflow-hidden">
      {/* Background ambient radial tint */}
      <div
        className="absolute bottom-0 inset-x-0 h-[450px] opacity-15 pointer-events-none blur-3xl shade-transition"
        style={{
          background: "radial-gradient(circle at 50% 100%, var(--shade) 0%, transparent 70%)",
        }}
      />

      {/* ========================================================
          SECTION 1 (UPPER): ALL LINKS, PAGES & MAISON DIRECTORY
          ======================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-20 md:pt-28 pb-16 md:pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-10 lg:gap-12 pb-16 border-b border-white/10">
          {/* Col 1: Brand Ethos (4 cols) */}
          <div className="col-span-2 lg:col-span-4 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.28em] font-light text-[#F5ECEE] hover:opacity-80 transition-opacity"
            >
              <span className="font-medium">VERNIS</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--shade)] shade-transition inline-block" />
            </Link>

            <p className="text-xs font-light text-[#8E7E84] max-w-sm leading-relaxed">
              A single-coat luxury nail lacquer compounded for deep pigment saturation.
              10-Free, vegan, and hand-poured in Grasse, France.
            </p>

            <div className="pt-2 text-[11px] font-mono text-[#8E7E84]/70 tracking-wider">
              PARIS · GRASSE · EST. 2026
            </div>
          </div>

          {/* Col 2: The Collection (3 cols) */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] font-mono block">
              THE SHADES
            </span>
            <ul className="space-y-2 text-xs font-light">
              {SHADES.map((shade) => (
                <li key={shade.id}>
                  <Link
                    href={`/products/${shade.id}`}
                    className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors flex items-center gap-2 group"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full border border-black/40 group-hover:scale-125 transition-transform"
                      style={{ backgroundColor: shade.hex }}
                    />
                    <span>
                      {shade.number} {shade.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigation & Ritual (2 cols) */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] font-mono block">
              MAISON
            </span>
            <ul className="space-y-2 text-xs font-light">
              <li>
                <Link
                  href="/#shades"
                  className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors"
                >
                  All Lacquers
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-to-wear"
                  className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors"
                >
                  Application Ritual
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors"
                >
                  Philosophy
                </Link>
              </li>
              <li>
                <span className="text-[#8E7E84]/60 cursor-default">
                  10-Free Standard
                </span>
              </li>
              <li>
                <span className="text-[#8E7E84]/60 cursor-default">
                  Optical Flint Glass
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Client Services (3 cols) */}
          <div className="col-span-2 lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] font-mono block">
              CLIENT SERVICES
            </span>
            <ul className="space-y-2 text-xs font-light">
              <li className="text-[#8E7E84]">
                Complimentary shipping on orders over $50
              </li>
              <li className="text-[#8E7E84]">
                30-day complimentary shade exchange
              </li>
              <li>
                <a
                  href="mailto:concierge@vernis.luxury"
                  className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors"
                >
                  concierge@vernis.luxury
                </a>
              </li>
              <li className="pt-2 flex items-center gap-4 text-[11px] text-[#8E7E84]">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram ↗
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TikTok ↗
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ========================================================
          SECTION 2 (LOWER): BLENDED LARGE BRAND WORDMARK & BASE
          Reveals itself as the user scrolls a bit down.
          ======================================================== */}
      <div className="relative w-full pt-4 pb-12 overflow-hidden flex flex-col items-center justify-end select-none">
        {/* Blended Large Brand Wordmark in the background */}
        <div className="w-full overflow-hidden text-center leading-none">
          <span
            className="block font-light text-[18vw] tracking-[0.08em] uppercase text-transparent bg-clip-text select-none pointer-events-none transition-all duration-700"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(245, 236, 238, 0.14) 0%, rgba(245, 236, 238, 0.04) 55%, rgba(245, 236, 238, 0.01) 100%)",
              fontFamily: "var(--font-sans), serif",
              lineHeight: 0.85,
            }}
            aria-hidden="true"
          >
            VERNIS
          </span>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-light text-[#8E7E84]">
          <div>© 2026 VERNIS MAISON DE HAUTE LACQUER. ALL RIGHTS RESERVED.</div>

          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Sale
            </span>
            <span>·</span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Cookie Preferences
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
