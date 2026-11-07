"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { SHADES } from "../lib/shades";

export function Footer() {
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="relative w-full bg-[#0E080A] border-t border-white/10 text-white/70 overflow-hidden">
      {/* Background ambient radial tint */}
      <div
        className="absolute bottom-0 inset-x-0 h-[480px] opacity-25 pointer-events-none blur-3xl shade-transition"
        style={{
          background: "radial-gradient(circle at 50% 100%, var(--shade) 0%, transparent 70%)",
        }}
      />

      {/* ========================================================
          SECTION 1 (UPPER): DIRECTORY, BUTTONS & SOCIAL LINKS
          Zero AI slop — clean navigation, actions, and socials
          ======================================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 pb-14">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-8 lg:gap-12 pb-14 border-b border-white/10">
          
          {/* Col 1: Brand & Back to Top action (4 cols) */}
          <div className="col-span-2 lg:col-span-4 flex flex-col justify-between items-start space-y-6">
            <div className="space-y-3">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-base uppercase tracking-[0.3em] font-light text-[#F5ECEE] hover:opacity-80 transition-opacity"
              >
                <span className="font-semibold">VERNIS</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--shade)] shade-transition inline-block" />
              </Link>
              <div className="text-[11px] font-mono tracking-[0.2em] text-[#8E7E84]">
                HAUTE COUTURE LACQUER
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-mono text-[#8E7E84] hover:text-[#F5ECEE] transition-colors py-2 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-y-1 text-[var(--shade)]" />
            </button>
          </div>

          {/* Col 2: The Shades (3 cols) */}
          <div className="col-span-1 lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] font-mono block">
              SHADES
            </span>
            <ul className="space-y-2.5 text-xs font-light">
              {SHADES.map((shade) => (
                <li key={shade.id}>
                  <Link
                    href={`/products/${shade.id}`}
                    className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors flex items-center gap-2.5 group"
                  >
                    <span
                      className="w-2 h-2 rounded-full border border-black/50 group-hover:scale-125 transition-transform"
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

          {/* Col 3: Directory (2 cols) */}
          <div className="col-span-1 lg:col-span-2 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] font-mono block">
              DIRECTORY
            </span>
            <ul className="space-y-2.5 text-xs font-light">
              <li>
                <Link
                  href="/#shades"
                  className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors block"
                >
                  The Collection
                </Link>
              </li>
              <li>
                <Link
                  href="/#how-to-wear"
                  className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors block"
                >
                  Application Ritual
                </Link>
              </li>
              <li>
                <Link
                  href="/#about"
                  className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors block"
                >
                  Atelier
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Socials & Concierge (3 cols) */}
          <div className="col-span-2 lg:col-span-3 space-y-3">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] font-mono block">
              SOCIAL & CONTACT
            </span>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs font-light pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors flex items-center justify-between group"
              >
                <span>Instagram</span>
                <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">↗</span>
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors flex items-center justify-between group"
              >
                <span>TikTok</span>
                <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">↗</span>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors flex items-center justify-between group"
              >
                <span>Pinterest</span>
                <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">↗</span>
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#8E7E84] hover:text-[#F5ECEE] transition-colors flex items-center justify-between group"
              >
                <span>X (Twitter)</span>
                <span className="text-[10px] font-mono opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">↗</span>
              </a>
            </div>

            <div className="pt-4 border-t border-white/5">
              <a
                href="mailto:concierge@vernis.luxury"
                className="inline-block text-xs font-mono text-[#8E7E84] hover:text-[#F5ECEE] transition-colors"
              >
                concierge@vernis.luxury
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          SECTION 2 (LOWER): BRIGHT ARCHITECTURAL WORDMARK & BASE
          ======================================================== */}
      <div className="relative w-full pt-2 pb-10 overflow-hidden flex flex-col items-center justify-end select-none">
        {/* Brightened Wordmark in the background */}
        <div className="w-full overflow-hidden text-center leading-none">
          <span
            className="block font-light text-[19vw] tracking-[0.06em] uppercase text-transparent bg-clip-text select-none pointer-events-none transition-all duration-700"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(245, 236, 238, 0.48) 0%, rgba(245, 236, 238, 0.22) 55%, rgba(245, 236, 238, 0.08) 100%)",
              fontFamily: "var(--font-sans), serif",
              lineHeight: 0.82,
            }}
            aria-hidden="true"
          >
            VERNIS
          </span>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-light text-[#8E7E84]">
          <div>© 2026 VERNIS. ALL RIGHTS RESERVED.</div>

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
