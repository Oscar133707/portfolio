export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  link: string;
  category: 'Webb' | 'AI' | 'E-handel';
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
  };
}