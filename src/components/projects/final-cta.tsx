"use client";

import type { Project } from "@/data/schemas";
import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";
import { projects } from "@/data/projects";

export function FinalCTA({ project }: { project: Project }) {
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects.length > 1 ? projects[(currentIndex + 1) % projects.length] : null;

  return (
    <section className="py-24 border-t border-border/50 relative overflow-hidden">
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[400px] opacity-5 blur-[100px] pointer-events-none rounded-full"
        style={{ background: project.theme.primary }}
      />
      
      <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-6">
          Ready to dive deeper?
        </h2>
        <p className="text-lg text-text-secondary mb-12 max-w-2xl mx-auto">
          Explore the source code or see how this architecture translates to other projects in my portfolio.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-primary-light text-white font-medium shadow-[0_2px_15px_-3px_var(--primary-deep)] hover:shadow-[0_4px_25px_-3px_var(--primary)] transition-all duration-300 active:scale-[0.98]"
            >
              <FaGithub size={18} />
              View on GitHub
            </a>
          )}
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-surface/50 backdrop-blur-md text-text font-medium border border-border/80 hover:bg-surface hover:border-primary/30 transition-all duration-300 shadow-sm"
          >
            Back to Portfolio
          </Link>
        </div>

        {/* Next Project Teaser */}
        {nextProject && (
          <Link href={`/projects/${nextProject.slug}`} className="group block max-w-md mx-auto text-left">
            <div className="p-6 rounded-3xl bg-surface/50 backdrop-blur-md border border-border/80 hover:border-primary/40 hover:bg-surface transition-all duration-300 flex items-center justify-between shadow-sm hover:shadow-lg">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1 block">Up Next</span>
                <h4 className="text-xl font-bold text-text group-hover:text-primary transition-colors duration-300">{nextProject.title}</h4>
              </div>
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-surface-variant group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </Link>
        )}
      </div>
    </section>
  );
}
