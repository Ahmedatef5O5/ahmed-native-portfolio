import { Hero } from "@/components/home/hero";
import { SocialMateShowcase } from "@/components/home/social-mate-showcase";
import { SelectedProjects } from "@/components/home/selected-projects";
import { AboutSection } from "@/components/home/about-section";
import { EngineeringPhilosophy } from "@/components/home/engineering-philosophy";
import { ContactSection } from "@/components/home/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <SocialMateShowcase />
      <SelectedProjects />
      <AboutSection />
      <EngineeringPhilosophy />
      <ContactSection />
    </div>
  );
}
