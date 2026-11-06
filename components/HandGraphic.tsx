"use client";

import React from "react";

export type SkinTone = "alabaster" | "honey" | "espresso";

interface HandGraphicProps {
  colorHex: string;
  imageSrc?: string;
  skinTone?: SkinTone;
  className?: string;
  isCloseUp?: boolean;
  objectPosition?: string;
}

const SKIN_TONE_GRADIENTS: Record<SkinTone, { stops: [string, string, string, string]; contour: string }> = {
  alabaster: {
    stops: ["#EFE3DF", "#D9C4BD", "#B69A92", "#7E6059"],
    contour: "rgba(95, 58, 52, 0.25)",
  },
  honey: {
    stops: ["#E8B997", "#CF9972", "#A66D49", "#6B3E22"],
    contour: "rgba(65, 35, 18, 0.3)",
  },
  espresso: {
    stops: ["#7A4F3D", "#5B3627", "#42241A", "#241009"],
    contour: "rgba(25, 8, 4, 0.45)",
  },
};

export function HandGraphic({
  colorHex,
  imageSrc,
  skinTone = "alabaster",
  className = "w-full h-full",
  isCloseUp = false,
  objectPosition = "center top",
}: HandGraphicProps) {
  const id = React.useId().replace(/:/g, "_");
  const tone = SKIN_TONE_GRADIENTS[skinTone] || SKIN_TONE_GRADIENTS.alabaster;

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
      {imageSrc ? (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
          <img
            src={imageSrc}
            alt="Hand wearing lacquer shade"
            style={{ objectPosition }}
            className={`w-full h-full object-cover transition-transform duration-700 ease-out ${
              isCloseUp ? "scale-100" : "scale-100"
            }`}
            loading="eager"
          />
          {/* Subtle micro vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
        </div>
      ) : (
        <svg
          viewBox="0 0 600 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full transition-transform duration-700 ease-out ${
            isCloseUp ? "scale-110" : "scale-100"
          }`}
        >
        <defs>
          {/* Surface subtle gradient matching shade */}
          <radialGradient id={`surface_grad_${id}`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={colorHex} stopOpacity="0.25" />
            <stop offset="60%" stopColor={colorHex} stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0D090B" stopOpacity="0.95" />
          </radialGradient>

          {/* Skin tone gradient with dynamic tone support */}
          <linearGradient id={`skin_grad_${id}`} x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor={tone.stops[0]} />
            <stop offset="40%" stopColor={tone.stops[1]} />
            <stop offset="80%" stopColor={tone.stops[2]} />
            <stop offset="100%" stopColor={tone.stops[3]} />
          </linearGradient>

          {/* Nail glossy lacquer gradient */}
          <linearGradient id={`nail_grad_${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={colorHex} />
            <stop offset="60%" stopColor={colorHex} />
            <stop offset="100%" stopColor="#1B040B" />
          </linearGradient>

          {/* Hand drop shadow */}
          <filter id={`hand_shadow_${id}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="16" />
            <feOffset dx="8" dy="18" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.45" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient background glow */}
        <rect width="600" height="500" fill={`url(#surface_grad_${id})`} className="shade-transition" />

        {/* Main Hand Silhouette (Palm down, fingers slightly parted in graceful pose) */}
        <g filter={`url(#hand_shadow_${id})`}>
          {/* Hand & Arm silhouette */}
          <path
            d="M 120 -40
               C 160 80, 220 180, 250 250
               C 270 290, 280 340, 290 380
               C 295 400, 310 405, 318 375
               C 335 310, 350 230, 360 170
               C 365 145, 380 150, 382 175
               C 390 240, 395 300, 400 370
               C 402 390, 415 390, 418 368
               C 425 305, 435 240, 442 195
               C 445 175, 460 180, 458 205
               C 455 260, 450 320, 448 375
               C 447 395, 460 395, 464 375
               C 475 320, 485 270, 495 240
               C 502 225, 518 235, 510 260
               C 490 325, 460 410, 410 440
               C 350 470, 260 440, 210 380
               C 160 320, 110 200, 80 -40
               Z"
            fill={`url(#skin_grad_${id})`}
          />

          {/* Subtle skin contour highlights / shadows */}
          <path
            d="M 270 260 C 290 300, 330 350, 345 370"
            stroke="rgba(95, 58, 52, 0.25)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 370 240 C 385 280, 395 320, 400 360"
            stroke="rgba(95, 58, 52, 0.2)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 430 250 C 438 290, 442 330, 445 365"
            stroke="rgba(95, 58, 52, 0.2)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* 5 High-Gloss Lacquered Fingernails */}
          {/* Thumb Nail */}
          <g className="shade-transition">
            <ellipse
              cx="292"
              cy="392"
              rx="12"
              ry="16"
              transform="rotate(15 292 392)"
              fill={`url(#nail_grad_${id})`}
            />
            {/* White specular curved light streak */}
            <path
              d="M 288 382 C 290 388, 292 396, 294 402"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* Index Finger Nail */}
          <g className="shade-transition">
            <ellipse
              cx="362"
              cy="165"
              rx="9"
              ry="15"
              transform="rotate(-5 362 165)"
              fill={`url(#nail_grad_${id})`}
            />
            <path
              d="M 360 156 C 361 162, 362 168, 363 173"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.65"
            />
          </g>

          {/* Middle Finger Nail */}
          <g className="shade-transition">
            <ellipse
              cx="441"
              cy="188"
              rx="9.5"
              ry="15"
              transform="rotate(6 441 188)"
              fill={`url(#nail_grad_${id})`}
            />
            <path
              d="M 439 179 C 440 185, 442 192, 443 197"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.7"
            />
          </g>

          {/* Ring Finger Nail */}
          <g className="shade-transition">
            <ellipse
              cx="496"
              cy="235"
              rx="8.5"
              ry="14"
              transform="rotate(18 496 235)"
              fill={`url(#nail_grad_${id})`}
            />
            <path
              d="M 493 226 C 495 232, 497 238, 498 243"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* Pinky Finger Nail */}
          <g className="shade-transition">
            <ellipse
              cx="466"
              cy="380"
              rx="8"
              ry="13"
              transform="rotate(22 466 380)"
              fill={`url(#nail_grad_${id})`}
            />
            <path
              d="M 464 372 C 465 377, 467 382, 468 386"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.55"
            />
          </g>
        </g>
      </svg>
      )}
    </div>
  );
}

