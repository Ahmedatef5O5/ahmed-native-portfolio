"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export interface RailSection {
  id: string;
  label: string;
  number: string;
}

interface SectionRailProps {
  sections: RailSection[];
}

export function SectionRail({ sections }: SectionRailProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id || "");
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (sections.length === 0) return;

    // Viewport vertical center detection using a narrow horizontal slice
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    setActiveId(id);
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="Case study section navigation"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-end gap-3 pointer-events-auto"
    >
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollTo(section.id)}
            aria-label={`Jump to section ${section.number}: ${section.label}`}
            aria-current={isActive ? "true" : undefined}
            className="group flex items-center gap-3 py-1 outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full cursor-pointer"
          >
            {/* Label displayed on hover or active */}
            <span
              className={cn(
                "hud-label text-[10px] tracking-widest transition-all duration-300 pointer-events-none opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0",
                isActive && "opacity-100 translate-x-0 text-text font-bold"
              )}
            >
              <span className="opacity-50 mr-1.5">{section.number}</span>
              {section.label}
            </span>

            {/* Dot indicator */}
            <div
              className={cn(
                "relative flex items-center justify-center transition-all duration-300",
                isActive ? "w-4 h-4" : "w-3 h-3 group-hover:w-4 group-hover:h-4"
              )}
            >
              <span
                className={cn(
                  "rounded-full transition-all duration-300",
                  isActive
                    ? "w-2.5 h-2.5 bg-[var(--project-accent,var(--primary))] shadow-[0_0_10px_var(--project-accent,var(--primary))]"
                    : "w-1.5 h-1.5 bg-border group-hover:bg-text-secondary"
                )}
              />
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full border border-[var(--project-accent,var(--primary))] animate-ping opacity-40 pointer-events-none"
                  style={{ animationDuration: "3s" }}
                />
              )}
            </div>
          </button>
        );
      })}
    </nav>
  );
}
