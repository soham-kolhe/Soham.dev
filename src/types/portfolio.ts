export interface Project {
  id: string;
  number?: string;
  name: string;
  tagline: string;
  problem: string;
  approach: string;
  outcome: string;
  stack: string[];
  links?: {
    repo?: string;
    live?: string;
  };
  canvasType?: "collab" | "ai" | "system";
  imageSrc?: string;
  reversed?: boolean;
}

export interface Certification {
  id: string;
  code: string;
  name: string;
  issuer: string;
  level?: string;
  date?: string;
  credentialId?: string;
  verifyUrl?: string;
  isFlagship?: boolean;
  imageSrc?: string;
}

export interface TimelineEntry {
  id: string;
  period: string;
  role: string;
  organization: string;
  location?: string;
  description: string;
  highlights: string[];
  stack?: string[];
  type: "education" | "opensource" | "hackathon" | "work";
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

