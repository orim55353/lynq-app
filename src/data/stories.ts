import type { CompanyStory } from "../types/story";

const caesarsLogo =
  "https://download.logo.wine/logo/Caesars_Entertainment_Corporation/Caesars_Entertainment_Corporation-Logo.wine.png";

const googleLogo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png";

const airbnbLogo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Airbnb_Logo_B%C3%A9lo.svg/1200px-Airbnb_Logo_B%C3%A9lo.svg.png";

export const companyStories: CompanyStory[] = [
  // ─── Featured: Caesars Entertainment ───────────────────────────────────
  {
    id: "story-caesars",
    companyId: "caesars",
    companyName: "Caesars Entertainment",
    companyLogo: caesarsLogo,
    brandColors: { primary: "#DC2626", secondary: "#D97706" },
    tier: "featured",
    status: "active",
    publishedAt: Date.now() - 2 * 60 * 60 * 1000, // 2h ago
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    totalViews: 1247,
    linkedJobIds: ["1", "2", "5"],
    order: 0,
    slides: [
      {
        id: "caesars-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1764815643474-dc6a32b6021d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNpbm8lMjBzbG90JTIwbWFjaGluZXMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzExOTQ3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
        headline: "Life at Caesars",
        body: "Where every day is a showstopper. 50+ resorts. Infinite possibilities.",
        cta: { label: "View Open Roles", action: "navigate_job", targetId: "1" },
        duration: 5000,
        order: 0,
      },
      {
        id: "caesars-s2",
        type: "job_highlight",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwbHV4dXJ5JTIwYmVkcm9vbXxlbnwxfHx8fDE3NzExOTQ3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
        headline: "VIP Casino Host",
        body: "Roll out the red carpet. Every. Single. Time.",
        cta: { label: "Apply Now", action: "apply", targetId: "5" },
        duration: 5000,
        order: 1,
        jobHighlight: {
          jobTitle: "VIP Casino Host",
          location: "Las Vegas, NV",
          salary: "$35 - $45/hour",
          workType: "On-Site",
          schedule: "Full-Time",
          experience: "5+ Years",
          highlights: [
            "Build VIP guest relationships",
            "Arrange luxury experiences & events",
            "Hit monthly revenue & retention targets",
          ],
        },
      },
      {
        id: "caesars-s3",
        type: "testimonial",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlY2VwdGlvbiUyMGRlc2slMjBtb2Rlcm58ZW58MXx8fHwxNzcxMTk0NzcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
        headline: "Hear from our team",
        duration: 6000,
        order: 2,
        testimonial: {
          employeeName: "Maria Santos",
          employeeRole: "Floor Manager",
          employeePhoto:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
          tenure: "4 years",
          quote:
            "Working at Caesars has been the most rewarding chapter of my career. The energy on the floor is unmatched.",
        },
        cta: { label: "Join Maria's Team", action: "navigate_job", targetId: "1" },
      },
    ],
  },

  // ─── Premium: Google ───────────────────────────────────────────────────
  {
    id: "story-google",
    companyId: "google",
    companyName: "Google",
    companyLogo: googleLogo,
    brandColors: { primary: "#4285F4", secondary: "#34A853" },
    tier: "premium",
    status: "active",
    publishedAt: Date.now() - 5 * 60 * 60 * 1000, // 5h ago
    expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
    totalViews: 3892,
    linkedJobIds: [],
    order: 1,
    slides: [
      {
        id: "google-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        headline: "Build for everyone",
        body: "At Google, we build products that help billions of people. Your next chapter starts here.",
        cta: { label: "Explore Careers", action: "follow" },
        duration: 5000,
        order: 0,
      },
      {
        id: "google-s2",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        headline: "Our campuses",
        body: "World-class workspaces designed for collaboration, creativity, and your best work.",
        cta: { label: "See More", action: "follow" },
        duration: 5000,
        order: 1,
      },
    ],
  },

  // ─── Standard: Airbnb ──────────────────────────────────────────────────
  {
    id: "story-airbnb",
    companyId: "airbnb",
    companyName: "Airbnb",
    companyLogo: airbnbLogo,
    brandColors: { primary: "#FF5A5F", secondary: "#00A699" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 12 * 60 * 60 * 1000, // 12h ago
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 891,
    linkedJobIds: [],
    order: 2,
    slides: [
      {
        id: "airbnb-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        headline: "Belong anywhere",
        body: "We're building a world where anyone can belong anywhere. Join the team making it happen.",
        cta: { label: "View Roles", action: "follow" },
        duration: 5000,
        order: 0,
      },
      {
        id: "airbnb-s2",
        type: "day_in_life",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1497366754035-f200968a6e72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
        headline: "A day at Airbnb",
        duration: 6000,
        order: 1,
        dayInLife: {
          roleTitle: "Product Designer",
          entries: [
            { time: "9:00 AM", title: "Team standup & coffee" },
            { time: "10:30 AM", title: "Design critique session" },
            { time: "1:00 PM", title: "User research debrief" },
            { time: "3:00 PM", title: "Prototype & iterate" },
          ],
        },
        cta: { label: "Join Our Team", action: "follow" },
      },
    ],
  },
];
