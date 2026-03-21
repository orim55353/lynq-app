// ─── Story Tier System ─────────────────────────────────────────────────────

export type StoryTier = "standard" | "premium" | "featured";

// ─── Company Story ────────────────────────────────────────────────────────

export interface CompanyStory {
  id: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  brandColors: { primary: string; secondary: string };
  tier: StoryTier;
  status: "active" | "scheduled" | "expired";
  publishedAt: number;
  expiresAt: number;
  totalViews: number;
  linkedJobIds: string[];
  order: number;
  slides: StorySlide[];
}

// ─── Slide Types ──────────────────────────────────────────────────────────

export type SlideType =
  | "culture"
  | "job_highlight"
  | "testimonial"
  | "day_in_life"
  | "custom";

export interface StoryCTA {
  label: string;
  action: "navigate_job" | "apply" | "follow" | "external_link";
  targetId?: string;
}

export interface StorySlide {
  id: string;
  type: SlideType;
  mediaType: "image" | "video";
  mediaUrl: string;
  thumbnailUrl?: string;
  headline: string;
  body?: string;
  cta?: StoryCTA;
  brandOverlay?: {
    backgroundColor?: string;
    textColor?: string;
    opacity?: number;
  };
  duration: number;
  order: number;

  // Type-specific fields
  testimonial?: {
    employeeName: string;
    employeeRole: string;
    employeePhoto: string;
    tenure?: string;
    quote: string;
  };
  jobHighlight?: {
    jobTitle: string;
    location: string;
    salary: string;
    workType: string;
    schedule: string;
    experience: string;
    highlights: string[];
  };
  dayInLife?: {
    roleTitle: string;
    entries: Array<{
      time: string;
      title: string;
      imageUrl?: string;
    }>;
  };
}

// ─── Seen State ───────────────────────────────────────────────────────────

export interface SeenStoryState {
  lastSeenSlideIndex: number;
  lastSeenAt: number;
  fullyViewed: boolean;
}

export type SeenStoriesMap = Record<string, SeenStoryState>;

// ─── Tier Configuration ───────────────────────────────────────────────────

export interface TierConfig {
  circleSize: number;
  logoSize: number;
  ringWidth: number;
  ringAnimation: "none" | "pulse" | "spin";
  badgeSize: number;
}

export const TIER_CONFIG: Record<StoryTier, TierConfig> = {
  standard: {
    circleSize: 56,
    logoSize: 48,
    ringWidth: 2,
    ringAnimation: "none",
    badgeSize: 8,
  },
  premium: {
    circleSize: 56,
    logoSize: 48,
    ringWidth: 2.5,
    ringAnimation: "pulse",
    badgeSize: 10,
  },
  featured: {
    circleSize: 56,
    logoSize: 48,
    ringWidth: 3,
    ringAnimation: "spin",
    badgeSize: 10,
  },
};
