"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck } from "lucide-react";
import { useVernisStore } from "../lib/store";
import { motion, AnimatePresence } from "framer-motion";

export function BagDrawer() {
  const {
    isBagOpen,
    closeBag,
    bag,
    updateQuantity,
    removeFromBag,
    subtotal,
    totalCount,
  } = useVernisStore();

  const [checkoutNotice, setCheckoutNotice] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isBagOpen) {
        closeBag();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBagOpen, closeBag]);

  const handleCheckout = () => {
    setCheckoutNotice(true);
    setTimeout(() => setCheckoutNotice(false), 3000);
  };

  return (
    <AnimatePresence>
      {isBagOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeBag}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Right Sliding Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md h-full bg-[#120A0E] border-l border-white/10 shadow-2xl flex flex-col justify-between z-10"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.25em] font-medium text-[#F5ECEE]">
                  Your Bag
                </span>
                <span className="text-xs text-[#8E7E84] font-mono">
                  ({totalCount()})
                </span>
              </div>

              <button
                onClick={closeBag}
                className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 flex items-center justify-center text-[#F5ECEE] hover:bg-white/10 transition-colors"
                aria-label="Close Bag Drawer"
              >
                <X className="w-4 h-4 stroke-[1.8]" />
              </button>
            </div>

            {/* Content: List of Items or Empty State */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
              {bag.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-[#8E7E84]">
                    <span className="text-xl font-light">0</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-[#F5ECEE]">Your bag is empty</p>
                    <p className="text-xs font-light text-[#8E7E84] max-w-xs">
                      Select your signature lacquer shade to initiate your bespoke order.
                    </p>
                  </div>
                  <button
                    onClick={closeBag}
                    className="mt-4 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-[11px] uppercase tracking-[0.18em] font-medium text-[#F5ECEE] transition-all"
                  >
                    Explore shades
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {bag.map(({ shade, quantity }) => (
                    <div key={shade.id} className="py-5 first:pt-0 last:pb-0 flex items-center gap-4">
                      {/* Mini bottle photo (clickable) */}
                      <Link
                        href={`/products/${shade.id}`}
                        onClick={closeBag}
                        className="w-14 h-18 flex-shrink-0 flex items-center justify-center p-1.5 bg-white/5 rounded-xl border border-white/10 relative overflow-hidden group hover:border-white/30 transition-colors"
                      >
                        <img
                          src={shade.image}
                          alt={shade.name}
                          className="w-full h-full object-contain filter drop-shadow-md scale-105 group-hover:scale-110 transition-transform"
                        />
                      </Link>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/products/${shade.id}`}
                            onClick={closeBag}
                            className="text-sm font-medium text-[#F5ECEE] truncate hover:underline underline-offset-4 decoration-white/40"
                          >
                            {shade.name}
                          </Link>
                          <span className="text-xs font-mono text-[#F5ECEE]/90">
                            ${shade.price * quantity}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8E7E84]">
                          {shade.number} · {shade.volume}
                        </div>

                        {/* Quantity Stepper */}
                        <div className="pt-2 flex items-center justify-between">
                          <div className="flex items-center border border-white/10 rounded-full bg-[#1A0E14] px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(shade.id, -1)}
                              className="w-6 h-6 flex items-center justify-center text-[#8E7E84] hover:text-[#F5ECEE] transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-mono text-[#F5ECEE]">
                              {quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(shade.id, 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#8E7E84] hover:text-[#F5ECEE] transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromBag(shade.id)}
                            className="text-[#8E7E84] hover:text-red-400 p-1 transition-colors"
                            aria-label={`Remove ${shade.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer / Subtotal & Checkout */}
            {bag.length > 0 && (
              <div className="p-6 md:p-8 border-t border-white/10 bg-[#0E070A] space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#8E7E84] font-light">Subtotal</span>
                  <span className="font-mono text-base font-medium text-[#F5ECEE]">
                    ${subtotal().toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-[#8E7E84]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--shade-soft)]" />
                  <span>Complimentary express carbon-neutral dispatch</span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 px-6 rounded-full bg-[var(--shade)] hover:opacity-95 text-[#F5ECEE] text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-xl flex items-center justify-center gap-2 group"
                >
                  <span>Checkout</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {checkoutNotice && (
                  <p className="text-[11px] text-center text-[var(--shade-soft)] animate-fade-in">
                    Checkout simulator: Order processing initiated.
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

