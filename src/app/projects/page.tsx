import { projects } from "@/data/projects";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my production-grade mobile applications and digital products.",
};

export default function ProjectsPage() {
  const flagshipProject = projects.find((p) => p.slug === "social-mate");
  const otherProjects = projects.filter((p) => p.slug !== "social-mate");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="pt-32 pb-16 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <h1 className="type-headline font-display text-text mb-6">
              Work
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="type-lead text-text-secondary max-w-2xl">
              A selection of my production-grade mobile applications, showcasing clean architecture, modern UI, and complex systems integration.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Flagship Project */}
      {flagshipProject && (
        <section className="py-16 px-4 md:px-8 border-b border-border/50 bg-surface-variant/20">
          <div className="container mx-auto max-w-6xl">
            <Reveal>
              <h2 className="type-eyebrow text-primary mb-8 flex items-center gap-2">
                <span className="w-8 h-px bg-primary" />
                Flagship Project
              </h2>
            </Reveal>

            <Reveal y={40} duration={0.9} delay={0.1}>
              <Link
                href={`/projects/${flagshipProject.slug}`}
                className="group flex flex-col lg:grid lg:grid-cols-2 bg-surface/50 backdrop-blur-md border border-primary/20 rounded-[2.5rem] overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
              >
              {/* Cover panel: fills the full card height on lg+, 4:3 stage on smaller screens */}
              <div className="relative @container overflow-hidden bg-[#060913]">
                {/* Height driver: 4:3 below lg, 20:19 from lg up (sized so all three phones stay fully visible) */}
                <div aria-hidden="true" className="aspect-[4/3] lg:aspect-[20/19]" />

                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-25 group-hover:opacity-40 transition-opacity duration-700 blur-3xl pointer-events-none"
                  style={{ background: `radial-gradient(circle at center, ${flagshipProject.theme.primary}, transparent 70%)` }}
                />

                {flagshipProject.media.cover ? (
                  <div className="absolute left-1/2 top-1/2 aspect-[4/3] h-[min(100%,95cqw)] -translate-x-1/2 -translate-y-1/2">
                    <Image
                      src={flagshipProject.media.cover.url}
                      alt={flagshipProject.media.cover.alt}
                      fill
                      priority
                      quality={90}
                      sizes="(max-width: 1024px) 100vw, 560px"
                      className="object-contain object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.015]"
                    />
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                    <div className="h-1.5 w-24 mb-4 rounded-full" style={{ backgroundColor: flagshipProject.theme.primary }} />
                    <h3 className="font-display font-bold text-3xl md:text-4xl" style={{ color: flagshipProject.theme.primary }}>
                      {flagshipProject.title}
                    </h3>
                  </div>
                )}
              </div>

              {/* Content panel */}
              <div className="relative z-20 flex flex-col justify-center gap-5 bg-surface p-8 lg:p-10 border-t border-border/50 lg:border-t-0 lg:border-l">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden shadow-md shadow-primary/20 border border-border/80 flex-shrink-0 bg-[#060913]">
                    <Image
                      src="/assets/projects/social-mate/icon.png"
                      alt={`${flagshipProject.title} App Icon`}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="type-title font-display font-bold text-text group-hover:text-primary transition-colors duration-300">
                    {flagshipProject.title}
                  </h3>
                </div>

                <p className="text-lg text-text-secondary font-medium">
                  {flagshipProject.positioning}
                </p>

                <p className="text-text-secondary leading-relaxed line-clamp-4">
                  {flagshipProject.description.full}
                </p>

                <div className="flex flex-wrap gap-2">
                  {flagshipProject.techStack.slice(0, 6).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 bg-background/80 text-text-secondary font-medium text-xs rounded-md border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                  {flagshipProject.techStack.length > 6 && (
                    <span className="px-3 py-1.5 bg-background/80 text-text-secondary font-medium text-xs rounded-md border border-border/50">
                      +{flagshipProject.techStack.length - 6}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-primary font-bold">
                  View Case Study{" "}
                  <ArrowUpRight
                    size={20}
                    className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
        </section>
      )}

      {/* Other Projects */}
      <section className="py-24 px-4 md:px-8 bg-background">
        <div className="container mx-auto max-w-6xl">
          <Reveal>
            <h2 className="type-eyebrow text-text-secondary mb-12 flex items-center gap-2">
              <span className="w-8 h-px bg-text-secondary" />
              Selected Work
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {otherProjects.map((project, index) => (
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
                    
                    <div className="relative z-10 w-full h-full bg-background rounded-2xl border border-white/5 shadow-xl transform group-hover:-translate-y-1.5 group-hover:scale-[1.02] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center overflow-hidden">
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
                          className="px-3 py-1 bg-background/80 text-text-secondary text-xs font-medium rounded-md border border-border/50"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-3 py-1 bg-background/80 text-text-secondary text-xs font-medium rounded-md border border-border/50">
                          +{project.techStack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
