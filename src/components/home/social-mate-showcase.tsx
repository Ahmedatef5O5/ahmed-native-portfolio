"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import { DeviceFrame } from "@/components/ui/device-frame";
import { MediaPreview } from "@/components/ui/media-preview";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";

export function SocialMateShowcase({ hideCTA = false }: { hideCTA?: boolean } = {}) {
  const socialMate = projects.find((p) => p.slug === "social-mate");
  const [activeIndex, setActiveIndex] = useState(0);
  const [deviceType, setDeviceType] = useState<"ios" | "android">("ios");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!socialMate || !mounted) return <div className="h-screen" />; // SSR placeholder

  const nextFeature = () => {
    setActiveIndex((prev) => (prev + 1) % socialMate.features.length);
  };

  const prevFeature = () => {
    setActiveIndex((prev) => (prev - 1 + socialMate.features.length) % socialMate.features.length);
  };

  const activeFeature = socialMate.features[activeIndex];
  const Icon = Icons[activeFeature.icon as keyof typeof Icons] as React.ElementType || Icons.Circle;

  // Resolve media item
  const categoryMapping: Record<string, string> = {
    "Real-time Messaging": "Messaging",
    "Audio & Video Calls": "Calls",
    "Stories": "Stories",
    "Push Notifications": "Themes",
  };
  const targetCategory = categoryMapping[activeFeature.title] || "Messaging";
  const categoryMedia = socialMate.media.gallery?.find(g => g.category === targetCategory);
  const mediaItem = categoryMedia?.items.find(item => item.role === "storytelling" || item.role === "demo") || categoryMedia?.items[0];

  return (
    <section className="py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        <div className="text-center mb-16 md:mb-20">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase mb-3 block">
            Featured Project
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text mb-6">
            {socialMate.title}
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            {socialMate.positioning}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left Column: Interactive Device */}
          <div className="flex flex-col items-center justify-center w-full">
            {/* Device Switcher (iOS / Android) */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-surface-variant/80 border border-border/60 mb-6 backdrop-blur-sm shadow-sm">
              {(["ios", "android"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setDeviceType(type)}
                  className={cn(
                    "px-4 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-all duration-300",
                    deviceType === type 
                      ? "bg-surface shadow-sm text-primary border border-border/80" 
                      : "text-text-secondary hover:text-text hover:bg-surface/40 border border-transparent"
                  )}
                >
                  {type === "ios" ? "iOS" : "Android"}
                </button>
              ))}
            </div>

            <DeviceFrame glowColor={socialMate.theme.primary} type={deviceType} className="transition-all duration-500 ease-[0.16,1,0.3,1]">
              <div className="w-full h-full relative group">
                <AnimatePresence mode="popLayout" custom={activeIndex}>
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center bg-surface"
                  >
                    {mediaItem ? (
                      <MediaPreview media={mediaItem} className="w-full h-full" objectFit="cover" />
                    ) : (
                      <div className="p-6 text-center flex flex-col items-center justify-center h-full">
                        <div className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center shadow-lg bg-gradient-to-br from-primary to-accent">
                          <Icon size={28} className="text-white" />
                        </div>
                        <h3 className="font-bold text-lg">{activeFeature.title}</h3>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Overlay Navigation Areas */}
                <div 
                  className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize z-20"
                  onClick={prevFeature}
                />
                <div 
                  className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize z-20"
                  onClick={nextFeature}
                />
              </div>
            </DeviceFrame>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between w-full max-w-[280px] mt-8">
              <button onClick={prevFeature} className="p-2 rounded-full hover:bg-surface-variant transition-colors text-text-secondary hover:text-primary">
                <ChevronLeft size={24} />
              </button>
              
              <div className="flex gap-2">
                {socialMate.features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-500",
                      i === activeIndex ? "w-8 bg-primary" : "w-2 bg-border hover:bg-text-secondary"
                    )}
                  />
                ))}
              </div>

              <button onClick={nextFeature} className="p-2 rounded-full hover:bg-surface-variant transition-colors text-text-secondary hover:text-primary">
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Right Column: Feature Text */}
          <div className="flex flex-col min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-primary/10">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <h3 className="font-display font-bold text-3xl text-text">{activeFeature.title}</h3>
                </div>
                <p className="text-lg text-text-secondary leading-relaxed">
                  {activeFeature.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {!hideCTA && (
              <div className="flex flex-wrap items-center gap-4 mt-12 pt-8 border-t border-border/50">
                <Link
                  href={`/projects/${socialMate.slug}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-medium shadow-[0_2px_15px_-3px_var(--primary-deep)] hover:shadow-[0_4px_25px_-3px_var(--primary)] transition-all duration-300 active:scale-[0.98]"
                >
                  Explore Full Case Study
                  <ArrowRight size={18} />
                </Link>
                
                {socialMate.links.github && (
                  <a
                    href={socialMate.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface/50 backdrop-blur-md text-text font-medium border border-border/80 hover:bg-surface hover:border-primary/30 transition-all duration-300 shadow-sm"
                  >
                    <FaGithub size={18} />
                    GitHub Repository
                  </a>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
