export interface SocialLink {
  id: string;
  label: string;
  value: string;
  href: string;
  icon: "github" | "whatsapp" | "email" | "linkedin";
  actionText: string;
  color?: string;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: string[];
}

export interface EngineeringPrinciple {
  id: string;
  title: string;
  description: string;
}

export interface AboutProfile {
  name: string;
  role: string;
  shortIntro: string;
  description: string;
  socialLinks: SocialLink[];
  skillGroups: SkillGroup[];
  engineeringPhilosophy: EngineeringPrinciple[];
  technicalFocus: string[];
}

export const profileData: AboutProfile = {
  name: "Ahmed Atef",
  role: "Flutter Developer & Mobile Engineer",
  shortIntro: "Building production-grade digital products.",
  description: "I specialize in Feature-First Clean Architecture, crafting scalable, high-performance applications with beautiful user experiences. My focus is on creating mobile systems that are resilient, maintainable, and deeply connected to product goals.",
  socialLinks: [
    {
      id: "whatsapp",
      label: "WhatsApp",
      value: "+20 155 083 5238",
      href: "https://wa.me/201550835238",
      icon: "whatsapp",
      actionText: "Chat on WhatsApp",
      color: "#25D366"
    },
    {
      id: "email",
      label: "Gmail",
      value: "ahmedateif0@gmail.com",
      href: "mailto:ahmedateif0@gmail.com",
      icon: "email",
      actionText: "Send an Email",
      color: "#EA4335"
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      value: "Ahmed Atef",
      href: "https://www.linkedin.com/in/ahmed-ateif-00b77b28a/",
      icon: "linkedin",
      actionText: "Connect on LinkedIn",
      color: "#0A66C2"
    },
    {
      id: "github",
      label: "GitHub",
      value: "Ahmedatef5O5",
      href: "https://github.com/Ahmedatef5O5",
      icon: "github",
      actionText: "Explore Repositories",
      color: "#F0F6FC"
    }
  ],
  skillGroups: [
    {
      id: "mobile",
      title: "Mobile Development",
      skills: ["Flutter", "Dart", "Adaptive UI", "Animations"]
    },
    {
      id: "backend_data",
      title: "Backend & Data",
      skills: ["Supabase", "Firebase", "REST APIs", "Hive"]
    },
    {
      id: "architecture",
      title: "Architecture",
      skills: ["Clean Architecture", "BLoC / Cubit", "SOLID", "Feature-First"]
    },
    {
      id: "engineering",
      title: "Engineering",
      skills: ["Offline-First", "Realtime Systems", "Performance", "Dependency Inversion"]
    }
  ],
  engineeringPhilosophy: [
    {
      id: "architecture",
      title: "Architecture as a Foundation",
      description: "Structure code so complexity stays manageable as the product scales. I prefer a Feature-First approach where each domain remains isolated and testable."
    },
    {
      id: "reliability",
      title: "Design for Failure",
      description: "Network resilience isn't an afterthought. Products should handle captive portals, stale caches, and rate limits gracefully by construction."
    },
    {
      id: "ux",
      title: "Engineering serves UX",
      description: "Performance is a feature. Avoiding layout shifts, optimizing animations, and handling state reactively all contribute directly to product quality."
    }
  ],
  technicalFocus: [
    "Cross-Platform Mobile Applications",
    "Realtime & Offline-First Systems",
    "Clean Architecture & State Management",
    "Modern UI/UX Implementation"
  ]
};
