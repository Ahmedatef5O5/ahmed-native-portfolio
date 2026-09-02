import { projects } from "@/data/projects";
import { DeviceFrame } from "@/components/ui/device-frame";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import * as Icons from "lucide-react";

export function FeaturedProject() {
  const socialMate = projects.find((p) => p.slug === "social-mate");

  if (!socialMate) return null;

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl relative z-10">
        
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase mb-3 block">
            Featured Project
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-text mb-6">
            {socialMate.title}
          </h2>
          <p className="text-xl text-text-secondary">
            {socialMate.positioning}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Showcase */}
          <div className="relative flex items-center justify-center">
            {/* Background glow */}
            <div 
              className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${socialMate.theme.primary}, transparent 70%)` }}
            />
            
            <DeviceFrame className="relative z-10 -rotate-2 hover:rotate-0 transition-transform duration-500">
              {/* Fallback mockup content since real images don't exist yet */}
              <div className="w-full h-full flex flex-col items-center justify-center bg-surface-variant text-center p-6">
                <div 
                  className="w-16 h-16 rounded-2xl mb-4 flex items-center justify-center shadow-lg"
                  style={{ background: `linear-gradient(135deg, ${socialMate.theme.primary}, ${socialMate.theme.secondary})` }}
                >
                  <Icons.MessageSquare size={28} className="text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">Social Mate</h3>
                <p className="text-sm text-text-secondary mb-8">Sign in to continue</p>
                <div className="w-full space-y-3">
                  <div className="h-12 w-full bg-surface rounded-xl border border-border" />
                  <div className="h-12 w-full bg-surface rounded-xl border border-border" />
                  <div className="h-12 w-full rounded-xl mt-4" style={{ backgroundColor: socialMate.theme.primary }} />
                </div>
              </div>
            </DeviceFrame>
          </div>

          {/* Project Details */}
          <div className="flex flex-col">
            <p className="text-lg text-text-secondary leading-relaxed mb-8">
              {socialMate.description.short}
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {socialMate.features.slice(0, 4).map((feature) => {
                const Icon = Icons[feature.icon as keyof typeof Icons] as React.ElementType || Icons.Circle;
                return (
                  <div key={feature.id} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Icon size={18} style={{ color: socialMate.theme.primary }} />
                      <h4 className="font-semibold text-text">{feature.title}</h4>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-auto">
              <Link
                href={`/projects/${socialMate.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-text text-background font-medium hover:opacity-90 transition-opacity"
              >
                Explore Case Study
                <ArrowRight size={18} />
              </Link>
              
              {socialMate.links.github && (
                <a
                  href={socialMate.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-surface text-text font-medium border border-border hover:bg-surface-variant transition-colors"
                >
                  <FaGithub size={18} />
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
