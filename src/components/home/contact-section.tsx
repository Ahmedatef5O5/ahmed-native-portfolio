"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { profileData, type SocialLink } from "@/data/profile";
import { ArrowUpRight, Copy, Check } from "lucide-react";
import { FaGithub, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { cn } from "@/lib/utils";

function getContactIcon(icon: string) {
  switch (icon) {
    case "whatsapp":
      return <FaWhatsapp className="text-[#25D366] text-2xl shrink-0" />;
    case "email":
      return <SiGmail className="text-[#EA4335] text-xl shrink-0" />;
    case "linkedin":
      return <FaLinkedinIn className="text-[#0A66C2] text-xl shrink-0" />;
    case "github":
    default:
      return <FaGithub className="text-text text-2xl shrink-0" />;
  }
}

function getIconBadgeStyle(icon: string) {
  switch (icon) {
    case "whatsapp":
      return "bg-[#25D366]/10 border-[#25D366]/25 group-hover:border-[#25D366]/50 group-hover:shadow-[0_0_15px_rgba(37,211,102,0.2)]";
    case "email":
      return "bg-[#EA4335]/10 border-[#EA4335]/25 group-hover:border-[#EA4335]/50 group-hover:shadow-[0_0_15px_rgba(234,67,53,0.2)]";
    case "linkedin":
      return "bg-[#0A66C2]/10 border-[#0A66C2]/25 group-hover:border-[#0A66C2]/50 group-hover:shadow-[0_0_15px_rgba(10,102,194,0.2)]";
    case "github":
    default:
      return "bg-white/5 border-white/10 group-hover:border-white/20 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.08)]";
  }
}

function ContactCard({ link }: { link: SocialLink }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(link.value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center justify-between p-5 sm:p-6 rounded-2xl glass-panel hover:border-primary/50 transition-all duration-300 hover:shadow-primary/10 hover:-translate-y-0.5"
      aria-label={`${link.actionText}: ${link.value}`}
    >
      <div className="flex items-center gap-4 min-w-0">
        {/* Real Brand Icon */}
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center border transition-all duration-300 shrink-0",
            getIconBadgeStyle(link.icon)
          )}
        >
          {getContactIcon(link.icon)}
        </div>

        {/* Text Info */}
        <div className="flex flex-col min-w-0 text-left">
          <span className="text-xs font-semibold tracking-wider uppercase text-text-secondary group-hover:text-primary transition-colors">
            {link.label}
          </span>
          <span className="text-sm sm:text-base font-bold text-text truncate">
            {link.value}
          </span>
          <span className="text-xs text-text-secondary/70 flex items-center gap-1 mt-0.5">
            {link.actionText}
          </span>
        </div>
      </div>

      {/* Action / Copy Buttons */}
      <div className="flex items-center gap-2 shrink-0 ml-3">
        {(link.icon === "whatsapp" || link.icon === "email") && (
          <button
            onClick={handleCopy}
            title={`Copy ${link.label}`}
            className="p-2 rounded-lg bg-surface-variant/80 border border-border/60 text-text-secondary hover:text-text hover:bg-surface transition-all duration-200"
            aria-label={`Copy ${link.value}`}
          >
            {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
          </button>
        )}
        <div className="w-9 h-9 rounded-xl bg-surface-variant/80 border border-border/60 flex items-center justify-center text-text-secondary group-hover:text-white group-hover:bg-primary group-hover:border-primary transition-all duration-300 shadow-sm">
          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </div>
      </div>
    </a>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="py-28 sm:py-32 bg-background relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_bottom,var(--primary-deep)_0,transparent_70%)] opacity-[0.07] pointer-events-none blur-[100px]" />

      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="bg-surface/40 backdrop-blur-2xl border border-border/80 rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center shadow-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-primary/5 opacity-40 pointer-events-none" />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent pointer-events-none" />

          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Available for new opportunities
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-text mb-4 relative z-10">
            Let&apos;s build something.
          </h2>
          <p className="text-base sm:text-lg text-text-secondary mb-10 max-w-xl mx-auto relative z-10 leading-relaxed">
            Whether you have a product in mind, need architecture consulting, or want to discuss a full-time role, reach out directly.
          </p>

          {/* Rapid Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
            {profileData.socialLinks.map((link) => (
              <ContactCard key={link.id} link={link} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
