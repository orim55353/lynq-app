export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  tagline: string;
  description: string;
  /** Short bullet points for the preview card (3 max) */
  highlights: [string, string, string];
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
  /** AI-generated paragraph explaining the match score reasoning */
  matchExplanation?: string;
}

export interface ChatMessage {
  id: string;
  jobId: string;
  sender: string;
  text: string;
  timestamp: string;
  unread?: boolean;
}
