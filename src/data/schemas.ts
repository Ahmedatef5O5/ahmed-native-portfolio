export type MediaType = "image" | "video" | "gif";

export type MediaRole = "hero" | "storytelling" | "gallery" | "supporting" | "demo";

export interface MediaItem {
  id: string;
  type: MediaType;
  url: string;
  alt: string;
  poster?: string;
  width?: number;
  height?: number;
  caption?: string;
  description?: string;
  category?: string;
  role?: MediaRole;
  priority?: boolean;
  featureId?: string;
}

export interface ProjectMedia {
  hero: MediaItem;
  cover?: MediaItem;
  showcase?: MediaItem[];
  gallery?: { category: string; items: MediaItem[] }[];
}

export type AndroidAbi = "arm64-v8a" | "armeabi-v7a" | "x86_64" | "universal";

export interface ApkVariant {
  id: string;
  abi: AndroidAbi;
  label: string;
  description?: string;
  fileUrl: string;
  fileName: string;
  sizeBytes?: number;
  sha256?: string;
  recommended?: boolean;
  status?: "available" | "pending";
}

export interface DownloadCenter {
  version?: string;
  buildNumber?: string;
  releaseDate?: string;
  releaseUrl?: string;
  commitSha?: string;
  androidCompatibility?: string;
  variants: ApkVariant[];
}

export interface ProjectFeature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface ArchitectureNode {
  title: string;
  description: string;
  items?: string[];
}

export interface EngineeringDecision {
  title: string;
  context: string;
  approach: string;
}

export interface EngineeringChallenge {
  title: string;
  context: string;
  approach: string;
  outcome?: string;
}

export interface CaseStudy {
  overview: string[];
  architecture?: ArchitectureNode[];
  decisions?: EngineeringDecision[];
  challenges?: EngineeringChallenge[];
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  icon?: string;
  description: {
    short: string;
    full: string;
  };
  positioning: string;
  isFeatured: boolean;
  theme: {
    primary: string;
    secondary: string;
  };
  techStack: string[];
  links: {
    github?: string;
    demo?: string;
    apk?: string;
  };
  features: ProjectFeature[];
  media: ProjectMedia;
  downloads?: DownloadCenter;
  caseStudy?: CaseStudy;
}
