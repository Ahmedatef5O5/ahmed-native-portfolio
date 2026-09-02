import { projects } from "@/data/projects";
import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { Metadata } from "next";

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
          <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-6">
            Work
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
            A selection of my production-grade mobile applications, showcasing clean architecture, modern UI, and complex systems integration.
          </p>
        </div>
      </section>

      {/* Flagship Project */}
      {flagshipProject && (
        <section className="py-16 px-4 md:px-8 border-b border-border/50 bg-surface-variant/20">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-8 flex items-center gap-2">
              <span className="w-8 h-px bg-primary" />
              Flagship Project
            </h2>

            <Link
              href={`/projects/${flagshipProject.slug}`}
              className="group flex flex-col lg:flex-row bg-surface/50 backdrop-blur-md border border-primary/20 rounded-[2.5rem] overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
            >
              {/* Image Area */}
              <div 
                className="lg:w-3/5 p-8 md:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden"
                style={{ backgroundColor: `${flagshipProject.theme.primary}08` }}
              >
                <div 
                  className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 blur-3xl"
                  style={{ background: `radial-gradient(circle at center, ${flagshipProject.theme.primary}, transparent 60%)` }}
                />
                
                <div className="relative z-10 w-full aspect-[4/3] bg-background rounded-2xl border border-white/5 shadow-xl transform group-hover:scale-[1.02] group-hover:-translate-y-2 transition-all duration-700 ease-[0.16,1,0.3,1] flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-x-0 top-0 h-1.5" style={{ backgroundColor: flagshipProject.theme.primary }} />
                   <h3 className="font-display font-bold text-3xl md:text-4xl" style={{ color: flagshipProject.theme.primary }}>
                     {flagshipProject.title}
                   </h3>
                </div>
              </div>

              {/* Content Area */}
              <div className="lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-surface relative z-20">
                <div className="flex items-center gap-3 mb-4">
                  <Code2 size={24} className="text-primary" />
                  <h3 className="text-3xl font-display font-bold text-text group-hover:text-primary transition-colors duration-300">
                    {flagshipProject.title}
                  </h3>
                </div>
                
                <p className="text-lg text-text-secondary font-medium mb-6">
                  {flagshipProject.positioning}
                </p>

                <p className="text-text-secondary leading-relaxed mb-8">
                  {flagshipProject.description.full}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {flagshipProject.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="px-3 py-1.5 bg-background/80 text-text-secondary font-medium text-sm rounded-md border border-border/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 text-primary font-bold">
                  View Case Study <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Other Projects */}
      <section className="py-24 px-4 md:px-8 bg-background">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-12 flex items-center gap-2">
            <span className="w-8 h-px bg-text-secondary" />
            Selected Work
          </h2>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {otherProjects.map((project) => (
              <Link 
                key={project.slug} 
                href={`/projects/${project.slug}`}
                className="group relative flex flex-col bg-surface/50 backdrop-blur-md border border-border/80 rounded-3xl overflow-hidden hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
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
                  
                  <div className="relative z-10 w-full h-full bg-background rounded-2xl border border-white/5 shadow-xl transform group-hover:-translate-y-1.5 group-hover:scale-[1.02] transition-all duration-700 ease-[0.16,1,0.3,1] flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: project.theme.primary }} />
                    <h3 className="font-display font-bold text-2xl" style={{ color: project.theme.primary }}>
                       {project.title}
                     </h3>
                  </div>
                </div>

                {/* Content area */}
                <div className="p-8 flex flex-col flex-1 bg-surface relative z-20">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-text group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
