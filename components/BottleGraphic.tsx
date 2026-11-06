"use client";

import React from "react";

interface BottleGraphicProps {
  colorHex: string;
  imageSrc?: string;
  className?: string;
  showShadow?: boolean;
  isHovered?: boolean;
}

export function BottleGraphic({
  colorHex,
  imageSrc,
  className = "w-full h-full",
  showShadow = true,
  isHovered = false,
}: BottleGraphicProps) {
  // Generate safe SVG IDs
  const id = React.useId().replace(/:/g, "_");

  return (
    <div
      className={`relative flex flex-col items-center justify-center transition-transform duration-500 ease-out ${
        isHovered ? "-translate-y-2" : "translate-y-0"
      } ${className}`}
    >
      {imageSrc ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={imageSrc}
            alt="VERNIS Nail Lacquer Bottle"
            className="w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] select-none pointer-events-none scale-105"
            loading="eager"
          />
        </div>
      ) : (
        <svg
          viewBox="0 0 160 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-2xl"
        >
        <defs>
          {/* Glass & liquid gradients */}
          <linearGradient id={`liquid_${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#120409" stopOpacity="0.8" />
            <stop offset="25%" stopColor={colorHex} />
            <stop offset="60%" stopColor={colorHex} />
            <stop offset="100%" stopColor="#0B0305" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id={`cap_${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1E191C" />
            <stop offset="35%" stopColor="#322B2F" />
            <stop offset="55%" stopColor="#251F23" />
            <stop offset="100%" stopColor="#131012" />
          </linearGradient>

          <linearGradient id={`glass_specular_${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="15%" stopColor="#ffffff" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="85%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
          </linearGradient>

          <linearGradient id={`reflection_${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colorHex} stopOpacity="0.35" />
            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
          </linearGradient>

          {/* Heavy glass bottom lens */}
          <linearGradient id={`bottom_lens_${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.18)" />
          </linearGradient>
        </defs>

        {/* 1. Cap: Minimalist architectural black cylinder */}
        <g id="cap">
          {/* Cap Base */}
          <rect
            x="52"
            y="24"
            width="56"
            height="86"
            rx="4"
            fill={`url(#cap_${id})`}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth="0.75"
          />
          {/* Subtle cap vertical light reflection */}
          <rect
            x="64"
            y="24"
            width="6"
            height="86"
            fill="white"
            fillOpacity="0.08"
          />
          {/* Cap top bevel */}
          <ellipse
            cx="80"
            cy="24"
            rx="28"
            ry="3.5"
            fill="#3A3337"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="0.5"
          />
        </g>

        {/* 2. Bottle Body: Heavy crystal glass rectangular flacon */}
        <g id="bottle_body">
          {/* Outer thick crystal glass container */}
          <rect
            x="32"
            y="108"
            width="96"
            height="136"
            rx="12"
            fill="#100A0D"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1"
          />

          {/* Liquid Chamber - Filled with active pigment */}
          <rect
            x="42"
            y="120"
            width="76"
            height="96"
            rx="6"
            fill={`url(#liquid_${id})`}
            className="shade-transition"
          />

          {/* Meniscus curvature top of liquid */}
          <ellipse
            cx="80"
            cy="120"
            rx="38"
            ry="4"
            fill={colorHex}
            fillOpacity="0.85"
            className="shade-transition"
          />

          {/* Thick solid glass base (weighted luxury bottom) */}
          <rect
            x="33"
            y="216"
            width="94"
            height="26"
            rx="10"
            fill={`url(#bottom_lens_${id})`}
          />

          {/* Subtle internal glass refractive rim */}
          <path
            d="M 44 216 L 116 216 L 114 234 L 46 234 Z"
            fill="rgba(255, 255, 255, 0.05)"
          />

          {/* Glass specular highlights & reflections */}
          <rect
            x="33"
            y="109"
            width="94"
            height="134"
            rx="11"
            fill={`url(#glass_specular_${id})`}
            style={{ mixBlendMode: "screen" }}
          />

          {/* Razor-thin vertical specular line */}
          <line
            x1="45"
            y1="112"
            x2="45"
            y2="238"
            stroke="rgba(255, 255, 255, 0.35)"
            strokeWidth="1.2"
          />

          {/* Minimalist bottle label: VERNIS */}
          <g id="label" opacity="0.9">
            <rect
              x="50"
              y="148"
              width="60"
              height="40"
              rx="2"
              fill="rgba(13, 9, 11, 0.45)"
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="0.5"
            />
            <text
              x="80"
              y="164"
              textAnchor="middle"
              fill="#F5ECEE"
              fontSize="8"
              fontWeight="300"
              letterSpacing="0.22em"
              fontFamily="sans-serif"
            >
              VERNIS
            </text>
            <text
              x="80"
              y="176"
              textAnchor="middle"
              fill="rgba(245, 236, 238, 0.6)"
              fontSize="4.5"
              fontWeight="400"
              letterSpacing="0.12em"
              fontFamily="sans-serif"
            >
              12 ML · 0.4 FL OZ
            </text>
          </g>
        </g>
      </svg>
      )}

      {/* Floor reflection effect */}
      {showShadow && (
        <div
          className="absolute -bottom-3 w-[85%] h-6 rounded-full blur-md opacity-50 transition-all duration-500 pointer-events-none"
          style={{
            backgroundColor: colorHex,
            transform: isHovered ? "scale(0.9) translateY(4px)" : "scale(1)",
          }}
        />
      )}
    </div>
  );
}

