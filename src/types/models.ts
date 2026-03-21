export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tagline: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  companyAbout?: string;
  benefits: string[];
  logoImage: string;
  bgImage: string;
  compatibilityScore: number;
  experience: string;
  schedule: string;
  workType: string;
  gradient: [string, string];
}

export interface ChatMessage {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  unread?: boolean;
}
