"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { MediaItem } from "@/data/schemas";
import { MediaPreview } from "@/components/ui/media-preview";

interface GalleryCategory {
  category: string;
  items: MediaItem[];
}

interface ProjectGalleryProps {
  categories: GalleryCategory[];
}

export function ProjectGallery({ categories }: ProjectGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.category || "");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  const currentItems = categories.find((c) => c.category === activeCategory)?.items || [];

  const openLightbox = useCallback((index: number) => {
    previousFocusRef.current = document.activeElement as HTMLElement;
    setSelectedIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
    if (previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, []);

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => Math.min(currentItems.length - 1, prev + 1));
  }, [currentItems.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => Math.max(0, prev - 1));
  }, []);

  // Keyboard navigation & Focus Trap
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      
      // Basic focus trap
      if (e.key === "Tab") {
        if (!lightboxRef.current) return;
        const focusableElements = lightboxRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Focus the close button when lightbox opens
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  if (!categories || categories.length === 0) return null;

  return (
    <div className="w-full">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-border/50 pb-4">
        {categories.map((c) => (
          <button
            key={c.category}
            onClick={() => setActiveCategory(c.category)}
            className={cn(
              "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
              activeCategory === c.category
                ? "bg-text text-background shadow-md"
                : "bg-surface-variant text-text-secondary hover:text-text hover:bg-border"
            )}
          >
            {c.category}
          </button>
        ))}
      </div>

      {/* Grid Layout (Premium: Featured items are larger) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <AnimatePresence mode="popLayout">
          {currentItems.map((item, index) => {
            const isFeatured = item.role === "storytelling" || item.role === "demo" || index === 0;
            return (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={cn(
                  "relative rounded-3xl overflow-hidden bg-surface-variant border border-border group cursor-zoom-in block outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  isFeatured ? "col-span-2 row-span-2 aspect-[4/5] md:aspect-square" : "col-span-1 aspect-[9/19]"
                )}
                onClick={() => openLightbox(index)}
                aria-label={`View ${item.alt} fullscreen`}
              >
                <MediaPreview 
                  media={item} 
                  objectFit="cover" 
                  className={cn("absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105", isFeatured ? "scale-100" : "scale-[1.02]")} 
                />
                
                {/* Optional overlay for caption preview */}
                {item.caption && isFeatured && (
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
                    <p className="text-white text-sm font-medium leading-relaxed">{item.caption}</p>
                  </div>
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div 
            ref={lightboxRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 md:p-8"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image gallery fullscreen"
          >
            <button 
              ref={closeButtonRef}
              onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
              className="absolute top-6 right-6 p-3 rounded-full bg-surface hover:bg-surface-variant text-text transition-colors z-[110] outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            
            <div 
              className="relative w-full max-w-5xl h-[70vh] md:h-[80vh] bg-transparent flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="relative w-full h-full flex flex-col items-center justify-center"
                >
                  <MediaPreview 
                    media={currentItems[selectedIndex]} 
                    priority 
                    objectFit="contain"
                    className="w-full h-full bg-transparent" 
                  />
                  {currentItems[selectedIndex].caption && (
                    <div className="absolute bottom-[-3rem] left-0 right-0 text-center">
                       <p className="text-text-secondary text-lg">{currentItems[selectedIndex].caption}</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div 
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 p-2.5 rounded-full bg-surface-variant/80 backdrop-blur-md border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={prevImage}
                disabled={selectedIndex === 0}
                className="p-3 rounded-full bg-surface hover:bg-surface-variant disabled:opacity-30 disabled:cursor-not-allowed transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <span className="text-sm font-semibold tabular-nums min-w-[3rem] text-center tracking-widest text-text">
                {selectedIndex + 1} <span className="opacity-40">/</span> {currentItems.length}
              </span>
              <button 
                onClick={nextImage}
                disabled={selectedIndex === currentItems.length - 1}
                className="p-3 rounded-full bg-surface hover:bg-surface-variant disabled:opacity-30 disabled:cursor-not-allowed transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
