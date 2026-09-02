"use client";

import { motion } from "motion/react";
import type { Project } from "@/data/schemas";
import { ArrowDown, Download } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { DeviceFrame } from "@/components/ui/device-frame";
import { MediaPreview } from "@/components/ui/media-preview";

export function CaseStudyHero({ project }: { project: Project }) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] opacity-10 blur-[120px] pointer-events-none rounded-full"
      />

      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-variant border border-border mb-8"
        >
          <div className="w-2 h-2 rounded-full animate-pulse bg-primary" />
          <span className="text-sm font-semibold tracking-wide uppercase text-text-secondary">
            Case Study
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="text-5xl md:text-7xl font-display font-bold text-text mb-6"
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="text-xl md:text-2xl text-text-secondary max-w-2xl leading-relaxed mb-10"
        >
          {project.positioning}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          className="flex flex-wrap justify-center items-center gap-4 mb-20"
        >
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-medium shadow-[0_2px_15px_-3px_var(--primary-deep)] hover:shadow-[0_4px_25px_-3px_var(--primary)] transition-all duration-300 active:scale-[0.98]"
            >
              Explore Product
            </a>
          )}
          
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface text-text font-medium border border-border hover:bg-surface-variant transition-colors"
            >
              <FaGithub size={18} />
              Source Code
            </a>
          )}

          {project.downloads && (
            <a
              href="#downloads"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface text-text font-medium border border-border hover:bg-surface-variant transition-colors"
            >
              <Download size={18} />
              Download APK
            </a>
          )}
        </motion.div>

        {/* Large Device Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="w-full max-w-4xl relative"
        >
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
          
          <DeviceFrame className="w-full max-w-[340px] h-[720px] mx-auto z-10 relative">
            <MediaPreview media={project.media.hero} priority />
          </DeviceFrame>
        </motion.div>
      </div>
    </section>
  );
}
