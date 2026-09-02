import { profileData } from "@/data/profile";
import { FaGithub, FaWhatsapp, FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

function getFooterIcon(icon: string) {
  switch (icon) {
    case "whatsapp":
      return <FaWhatsapp size={17} className="hover:text-[#25D366] transition-colors" />;
    case "email":
      return <SiGmail size={15} className="hover:text-[#EA4335] transition-colors" />;
    case "linkedin":
      return <FaLinkedinIn size={16} className="hover:text-[#0A66C2] transition-colors" />;
    case "github":
    default:
      return <FaGithub size={17} className="hover:text-text transition-colors" />;
  }
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border py-12 bg-surface">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-bold text-lg text-text">
            {profileData.name}
          </span>
          <p className="text-sm text-text-secondary">
            © {currentYear} All rights reserved. Built with <span className="text-primary font-medium">Next.js</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {profileData.socialLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-300"
              aria-label={`Visit ${link.label}`}
              title={link.label}
            >
              {getFooterIcon(link.icon)}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
