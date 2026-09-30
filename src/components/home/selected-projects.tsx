import { projects } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function SelectedProjects() {
  const selectedProjects = projects.filter((p) => p.slug !== "social-mate");

  return (
    <section id="projects" className="py-24 bg-surface-variant/20 border-t border-border/50">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <Reveal className="mb-12 md:flex md:items-end justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">
              Selected Projects
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl">
              Other production-grade applications built with modern architecture.
            </p>
          </div>
          <Link 
            href="/projects"
            className="hidden md:inline-flex items-center gap-2 text-primary font-medium hover:text-primary-light transition-colors mt-4 md:mt-0 group"
          >
            View all projects <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {selectedProjects.map((project, index) => (
            <Reveal key={project.slug} className="h-full" delay={index * 0.1}>
              <Link 
                href={`/projects/${project.slug}`}
                className="group relative flex h-full flex-col bg-surface/50 backdrop-blur-md border border-border/80 rounded-3xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
                {/* Media area */}
                <div 
                  className="aspect-video w-full p-8 flex items-center justify-center relative overflow-hidden"
                  style={{ backgroundColor: `${project.theme.primary}08` }}
                >
                  <div 
                    className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-opacity duration-700 blur-3xl"
                    style={{ background: `radial-gradient(circle at center, ${project.theme.primary}, transparent 60%)` }}
                  />
                  
                  {/* Mockup / Banner visual */}
                  <div className="relative z-10 w-full h-full bg-background rounded-2xl border border-white/5 shadow-xl transform group-hover:-translate-y-2 group-hover:scale-[1.02] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center overflow-hidden">
                    {project.media.cover ? (
                      <Image
                        src={project.media.cover.url}
                        alt={project.media.cover.alt}
                        fill
                        quality={92}
                        sizes="(max-width: 768px) 100vw, 520px"
                        className="object-cover object-center"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: project.theme.primary }} />
                        <h3 className="font-display font-bold text-2xl" style={{ color: project.theme.primary }}>
                          {project.title}
                        </h3>
                      </>
                    )}
                  </div>
                </div>

                {/* Content area */}
                <div className="p-8 flex flex-col flex-1 bg-surface relative z-20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      {project.icon && (
                        <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md shadow-primary/20 border border-border/80 flex-shrink-0 bg-[#060913]">
                          <Image
                            src={project.icon}
                            alt={`${project.title} App Icon`}
                            fill
                            sizes="40px"
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h3 className="text-2xl font-bold text-text group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-variant group-hover:bg-primary group-hover:text-white transition-colors duration-300"
                    >
                      <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                  
                  <p className="text-text-secondary mb-6 leading-relaxed flex-1">
                    {project.description.short}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.techStack.slice(0, 4).map(tech => (
                      <span 
                        key={tech} 
                        className="px-3 py-1 bg-background/80 border border-border/50 text-text-secondary text-xs font-medium rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-3 py-1 bg-background/80 border border-border/50 text-text-secondary text-xs font-medium rounded-md">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        
        <div className="mt-8 md:hidden">
          <Link 
            href="/projects"
            className="inline-flex items-center justify-center w-full gap-2 px-6 py-3 rounded-xl bg-surface/50 backdrop-blur-md text-text font-medium border border-border/80 hover:bg-surface-variant transition-colors"
          >
            View all projects <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
