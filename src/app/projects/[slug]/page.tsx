import { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { CaseStudyHero } from "@/components/projects/case-study-hero";
import { CaseStudyOverview } from "@/components/projects/case-study-overview";
import { ArchitectureSection } from "@/components/projects/architecture-section";
import { EngineeringSection } from "@/components/projects/engineering-section";
import { ProjectGallery } from "@/components/projects/gallery";
import { DownloadCenter } from "@/components/projects/download-center";
import { FinalCTA } from "@/components/projects/final-cta";
// We can reuse SocialMateShowcase if project is Social Mate
import { SocialMateShowcase } from "@/components/home/social-mate-showcase";

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
      images: [
        {
          url: `/og/${project.slug}.png`, // Placeholder for actual dynamic OG
          width: 1200,
          height: 630,
          alt: `${project.title} Showcase`,
        },
      ],
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

  // The gallery needs categories, we can mock it here for now if not defined in schema
  const galleryCategories = project.media.gallery || [
    { category: "All Screens", items: [project.media.hero] }
  ];

  return (
    <article className="flex flex-col bg-background">
      <CaseStudyHero project={project} />
      <CaseStudyOverview project={project} />
      
      {project.slug === "social-mate" && (
        <div className="py-12">
          <SocialMateShowcase hideCTA={true} />
        </div>
      )}

      <ArchitectureSection project={project} />
      <EngineeringSection project={project} />
      
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="mb-16 md:text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-text mb-4">Screens Gallery</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              A comprehensive look at the user interface and interactions.
            </p>
          </div>
          <ProjectGallery categories={galleryCategories} />
        </div>
      </section>

      {project.downloads && <DownloadCenter project={project} />}

      <FinalCTA project={project} />
    </article>
  );
}
