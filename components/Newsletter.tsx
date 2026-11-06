"use client";

import React, { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubmitted(true);
    }
  };

  return (
    <section className="py-28 md:py-36 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/5 text-center">
      <div className="space-y-4 mb-10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-[#8E7E84] font-mono block">
          EDITIONS PRIVÉES
        </span>

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-[-0.03em] text-[#F5ECEE] leading-tight">
          Be the first to wear new shades.
        </h3>

        <p className="text-xs md:text-sm font-light text-[#8E7E84] max-w-md mx-auto leading-relaxed">
          Receive private invitations to archival pours, limited botanical releases,
          and atelier dispatches.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="inline-flex items-center gap-2.5 py-3 px-6 rounded-full bg-white/5 border border-white/10 text-xs text-[#F5ECEE]"
          >
            <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[2.5]" />
            <span>You are subscribed. We will be in touch with the next formulation.</span>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-md mx-auto flex items-center border-b border-white/20 pb-2 focus-within:border-white transition-colors"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full bg-transparent text-sm text-[#F5ECEE] placeholder:text-[#8E7E84]/50 focus:outline-none pr-4 font-light"
            />
            <button
              type="submit"
              className="py-1.5 px-4 rounded-full text-[11px] uppercase tracking-[0.18em] font-medium text-[#F5ECEE] hover:text-white transition-all flex items-center gap-1.5 flex-shrink-0"
            >
              <span>Join</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  );
}
