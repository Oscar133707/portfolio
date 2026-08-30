export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  category: 'Webb' | 'AI' | 'E-handel';
}

// The one project highlighted above the grid. Carries the extra
// selling points (tagline, social proof, launch result) that the
// standard ProjectCard does not render.
export interface FeaturedCase extends Project {
  tagline: string;
  stats: { value: string; label: string }[];
  highlight: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  services: {
    webDev: boolean;
    aiAutomation: boolean;
    unsure?: boolean;
  };
  // Mobile-only dropdown value; mapped onto `services` before submit
  serviceChoice?: '' | 'webDev' | 'aiAutomation' | 'both' | 'unsure';
}