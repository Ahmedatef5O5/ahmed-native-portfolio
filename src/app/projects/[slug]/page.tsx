import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { projects } from "@/data/projects";
import { CaseStudyHero } from "@/components/projects/case-study-hero";
import { CaseStudyOverview } from "@/components/projects/case-study-overview";
import { ArchitectureSection } from "@/components/projects/architecture-section";
import { EngineeringSection } from "@/components/projects/engineering-section";
import { ProjectGallery } from "@/components/projects/gallery";
import { DownloadCenter } from "@/components/projects/download-center";
import { FinalCTA } from "@/components/projects/final-cta";
import { SocialMateShowcase } from "@/components/home/social-mate-showcase";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SectionRail, type RailSection } from "@/components/projects/section-rail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) return {};

  return {
    title: `${project.title} Case Study`,
    description: project.description.short,
    openGraph: {
      title: `${project.title} — Case Study | Ahmed Atef`,
      description: project.description.short,
    },
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectCaseStudy({ params }: Props) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const galleryCategories = project.media.gallery || [
    { category: "All Screens", items: [project.media.hero] },
  ];

  const hasShowcase =
    project.slug === "social-mate" ||
    project.slug === "newswave" ||
    project.slug === "fin-dash";

  const hasArchitecture = Boolean(
    project.caseStudy?.architecture && project.caseStudy.architecture.length > 0
  );

  const hasEngineering = Boolean(
    (project.caseStudy?.decisions && project.caseStudy.decisions.length > 0) ||
      (project.caseStudy?.challenges && project.caseStudy.challenges.length > 0)
  );

  const hasDownloads = Boolean(project.downloads);

  // Dynamically derive active sections for the desktop section rail
  const railSections: RailSection[] = [];
  if (project.caseStudy?.overview) {
    railSections.push({ id: "overview", label: "Overview", number: "01" });
  }
  if (hasShowcase) {
    railSections.push({ id: "showcase", label: "Showcase", number: "02" });
  }
  if (hasArchitecture) {
    railSections.push({ id: "architecture", label: "Architecture", number: "03" });
  }
  if (hasEngineering) {
    railSections.push({ id: "engineering", label: "Engineering", number: "04" });
  }
  railSections.push({ id: "gallery", label: "Gallery", number: "05" });
  if (hasDownloads) {
    railSections.push({ id: "downloads", label: "Downloads", number: "06" });
  }

  return (
    <article
      style={
        {
          "--project-accent": project.theme.primary,
          "--project-accent-2": project.theme.secondary,
        } as React.CSSProperties
      }
      className="flex flex-col bg-background relative overflow-x-clip"
    >
      {/* Scroll-Driven Top Progress Bar */}
      <ScrollProgress />

      {/* Desktop Floating Section Rail */}
      <SectionRail sections={railSections} />

      {/* Hero Opening */}
      <CaseStudyHero project={project} />

      {/* Overview Section */}
      <CaseStudyOverview project={project} />

      {/* Feature Showcase: Direct Swipeable Carousel */}
      {hasShowcase && (
        <div className="py-6 overflow-x-clip">
          <SocialMateShowcase
            hideCTA={true}
            projectSlug={project.slug}
          />
        </div>
      )}

      {/* Architecture System Diagram */}
      <ArchitectureSection project={project} />

      {/* Engineering Tradeoffs & Challenges */}
      <EngineeringSection project={project} />

      {/* Screens & Viewports Gallery */}
      <section id="gallery" className="py-24 scroll-mt-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="mb-16 md:text-center">
            <span className="hud-label text-[var(--project-accent,var(--primary))] block mb-3">
              05 — GALLERY
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-text mb-4">
              {project.slug === "fin-dash"
                ? "Adaptive Responsive Layout System"
                : "Screens Gallery"}
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              {project.slug === "fin-dash"
                ? "One unified financial dashboard adapting across Desktop (≥ 1300px), Tablet (800px – 1299px), and Mobile (< 800px) breakpoints."
                : "A comprehensive high-resolution look at the user interface, micro-interactions, and themes."}
            </p>
          </div>
          <ProjectGallery categories={galleryCategories} />
        </div>
      </section>

      {/* Native Downloads Center */}
      {project.downloads && <DownloadCenter project={project} />}

      {/* Final CTA with Up Next Cross-Fade Teaser */}
      <FinalCTA project={project} />
    </article>
  );
}
