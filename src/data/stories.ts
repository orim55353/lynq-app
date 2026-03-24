import type { CompanyStory } from "../types/story";

const caesarsLogo =
  "https://download.logo.wine/logo/Caesars_Entertainment_Corporation/Caesars_Entertainment_Corporation-Logo.wine.png";
const mgmLogo =
  "https://upload.wikimedia.org/wikipedia/en/thumb/c/c0/MGM_Resorts_International_logo.svg/200px-MGM_Resorts_International_logo.svg.png";
const wynnLogo =
  "https://download.logo.wine/logo/Wynn_Resorts/Wynn_Resorts-Logo.wine.png";
const marriottLogo =
  "https://download.logo.wine/logo/Marriott_International/Marriott_International-Logo.wine.png";
const hiltonLogo =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/HiltonHotelsLogo.svg/200px-HiltonHotelsLogo.svg.png";
const hyattLogo =
  "https://download.logo.wine/logo/Hyatt/Hyatt-Logo.wine.png";
const hardRockLogo =
  "https://download.logo.wine/logo/Hard_Rock_International/Hard_Rock_International-Logo.wine.png";
const fourSeasonsLogo =
  "https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/Four_Seasons_logo.svg/200px-Four_Seasons_logo.svg.png";
const ritzCarltonLogo =
  "https://download.logo.wine/logo/The_Ritz-Carlton_Hotel_Company/The_Ritz-Carlton_Hotel_Company-Logo.wine.png";

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
    publishedAt: Date.now() - 2 * 60 * 60 * 1000,
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
        body: "50+ resorts. Real careers. The floor never sleeps and neither does the opportunity.",
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
            "The energy here is unlike anything else. You're constantly learning and the people push you to be better every shift.",
        },
        cta: { label: "Join Maria's Team", action: "navigate_job", targetId: "1" },
      },
    ],
  },

  // ─── Featured: MGM Resorts International ───────────────────────────────
  {
    id: "story-mgm",
    companyId: "mgm",
    companyName: "MGM Resorts International",
    companyLogo: mgmLogo,
    brandColors: { primary: "#1E3A5F", secondary: "#334155" },
    tier: "featured",
    status: "active",
    publishedAt: Date.now() - 1 * 60 * 60 * 1000,
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    totalViews: 2104,
    linkedJobIds: ["6", "7", "8", "9", "10"],
    order: 1,
    slides: [
      {
        id: "mgm-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1080&q=80",
        headline: "Work where the action is",
        body: "MGM runs 30+ destinations. The Strip, DC, Detroit, Boston — we're in the markets that matter.",
        cta: { label: "See All Roles", action: "navigate_job", targetId: "6" },
        duration: 5000,
        order: 0,
      },
      {
        id: "mgm-s2",
        type: "job_highlight",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1080&q=80",
        headline: "Executive Chef",
        body: "Own the menu. Lead the team. Las Vegas is where culinary careers are made.",
        cta: { label: "View Role", action: "navigate_job", targetId: "8" },
        duration: 5000,
        order: 1,
        jobHighlight: {
          jobTitle: "Executive Chef",
          location: "Las Vegas, NV",
          salary: "$90,000 - $120,000/year",
          workType: "On-Site",
          schedule: "Full-Time",
          experience: "8+ Years",
          highlights: [
            "Own menu development & seasonal updates",
            "Manage kitchen team of 20+ staff",
            "Control food cost within target margins",
          ],
        },
      },
      {
        id: "mgm-s3",
        type: "testimonial",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1080&q=80",
        headline: "From the team",
        duration: 6000,
        order: 2,
        testimonial: {
          employeeName: "James Carter",
          employeeRole: "Poker Dealer",
          employeePhoto:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
          tenure: "3 years",
          quote:
            "I started dealing blackjack and worked my way into poker. MGM actually trains you and promotes you if you put in the work.",
        },
        cta: { label: "Explore Dealer Roles", action: "navigate_job", targetId: "6" },
      },
    ],
  },

  // ─── Premium: Four Seasons Hotels ──────────────────────────────────────
  {
    id: "story-fourseasons",
    companyId: "fourseasons",
    companyName: "Four Seasons Hotels",
    companyLogo: fourSeasonsLogo,
    brandColors: { primary: "#92400E", secondary: "#B45309" },
    tier: "premium",
    status: "active",
    publishedAt: Date.now() - 3 * 60 * 60 * 1000,
    expiresAt: Date.now() + 21 * 24 * 60 * 60 * 1000,
    totalViews: 1876,
    linkedJobIds: ["36", "37", "38", "39", "40"],
    order: 2,
    slides: [
      {
        id: "fourseasons-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1080&q=80",
        headline: "The standard others aim for",
        body: "100+ properties. 45+ countries. A guest experience that doesn't cut corners.",
        cta: { label: "Explore Careers", action: "navigate_job", targetId: "36" },
        duration: 5000,
        order: 0,
      },
      {
        id: "fourseasons-s2",
        type: "job_highlight",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1080&q=80",
        headline: "Spa Director — Seattle",
        body: "Lead the space where guests exhale. Real P&L, real creative control.",
        cta: { label: "View Role", action: "navigate_job", targetId: "40" },
        duration: 5000,
        order: 1,
        jobHighlight: {
          jobTitle: "Spa Director",
          location: "Seattle, WA",
          salary: "$75,000 - $95,000/year",
          workType: "On-Site",
          schedule: "Full-Time",
          experience: "6+ Years",
          highlights: [
            "Manage spa staff & daily operations",
            "Own spa P&L & monthly revenue targets",
            "Develop spa menus, packages & retail strategy",
          ],
        },
      },
      {
        id: "fourseasons-s3",
        type: "testimonial",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1080&q=80",
        headline: "From the floor",
        duration: 6000,
        order: 2,
        testimonial: {
          employeeName: "Sophie Leclerc",
          employeeRole: "Restaurant Manager, Miami",
          employeePhoto:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
          tenure: "5 years",
          quote:
            "Four Seasons gives you the tools and then gets out of your way. You own the dining experience in a way that's rare at this level.",
        },
        cta: { label: "See Restaurant Roles", action: "navigate_job", targetId: "37" },
      },
    ],
  },

  // ─── Premium: Wynn Resorts ──────────────────────────────────────────────
  {
    id: "story-wynn",
    companyId: "wynn",
    companyName: "Wynn Resorts",
    companyLogo: wynnLogo,
    brandColors: { primary: "#6D28D9", secondary: "#4C1D95" },
    tier: "premium",
    status: "active",
    publishedAt: Date.now() - 4 * 60 * 60 * 1000,
    expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
    totalViews: 1452,
    linkedJobIds: ["11", "12", "13", "14", "15"],
    order: 3,
    slides: [
      {
        id: "wynn-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1080&q=80",
        headline: "Two properties. One standard.",
        body: "Wynn and Encore consistently top the Forbes Travel Guide. Working here is different.",
        cta: { label: "View Openings", action: "navigate_job", targetId: "11" },
        duration: 5000,
        order: 0,
      },
      {
        id: "wynn-s2",
        type: "job_highlight",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1080&q=80",
        headline: "Spa Therapist",
        body: "Wynn Spa guests tip well and book often. The gratuities are real.",
        cta: { label: "Apply Now", action: "apply", targetId: "11" },
        duration: 5000,
        order: 1,
        jobHighlight: {
          jobTitle: "Spa Therapist",
          location: "Las Vegas, NV",
          salary: "$20 - $28/hour + gratuities",
          workType: "On-Site",
          schedule: "Full-Time",
          experience: "2+ Years",
          highlights: [
            "Deliver Swedish, deep tissue & specialty treatments",
            "Maintain detailed client intake records",
            "Upsell spa packages & retail products",
          ],
        },
      },
      {
        id: "wynn-s3",
        type: "day_in_life",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1080&q=80",
        headline: "A shift at Wynn",
        duration: 6000,
        order: 2,
        dayInLife: {
          roleTitle: "Banquet Event Coordinator",
          entries: [
            { time: "8:00 AM", title: "Pre-event walkthrough with client" },
            { time: "10:00 AM", title: "Coordinate AV and catering setup" },
            { time: "12:30 PM", title: "Event goes live — manage floor" },
            { time: "3:00 PM", title: "Debrief and reset for evening event" },
          ],
        },
        cta: { label: "View Coordinator Role", action: "navigate_job", targetId: "12" },
      },
    ],
  },

  // ─── Standard: Marriott International ──────────────────────────────────
  {
    id: "story-marriott",
    companyId: "marriott",
    companyName: "Marriott International",
    companyLogo: marriottLogo,
    brandColors: { primary: "#B45309", secondary: "#D97706" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 6 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 934,
    linkedJobIds: ["16", "17", "18", "19", "20"],
    order: 4,
    slides: [
      {
        id: "marriott-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1080&q=80",
        headline: "8,000 properties. Your career starts at one.",
        body: "Marriott's internal mobility is real. Start anywhere, go everywhere.",
        cta: { label: "See Roles", action: "navigate_job", targetId: "16" },
        duration: 5000,
        order: 0,
      },
      {
        id: "marriott-s2",
        type: "job_highlight",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=80",
        headline: "Director of Sales — Chicago",
        body: "Own the group segment in one of the country's top meetings markets.",
        cta: { label: "View Role", action: "navigate_job", targetId: "18" },
        duration: 5000,
        order: 1,
        jobHighlight: {
          jobTitle: "Director of Sales",
          location: "Chicago, IL",
          salary: "$85,000 - $110,000/year",
          workType: "Hybrid",
          schedule: "Full-Time",
          experience: "7+ Years",
          highlights: [
            "Own group, corporate & SMERF sales segments",
            "Manage a team of 4 to 6 sales managers",
            "Drive occupancy & revenue against annual targets",
          ],
        },
      },
    ],
  },

  // ─── Standard: Hilton Hotels & Resorts ─────────────────────────────────
  {
    id: "story-hilton",
    companyId: "hilton",
    companyName: "Hilton Hotels & Resorts",
    companyLogo: hiltonLogo,
    brandColors: { primary: "#0891B2", secondary: "#0369A1" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 8 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 712,
    linkedJobIds: ["21", "22", "23", "24", "25"],
    order: 5,
    slides: [
      {
        id: "hilton-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1080&q=80",
        headline: "500+ properties. Consistent standards.",
        body: "From Nashville to Beverly Hills — Hilton's reputation for service is built by the people on the floor.",
        cta: { label: "Browse Openings", action: "navigate_job", targetId: "21" },
        duration: 5000,
        order: 0,
      },
      {
        id: "hilton-s2",
        type: "day_in_life",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1080&q=80",
        headline: "A day as Concierge",
        duration: 6000,
        order: 1,
        dayInLife: {
          roleTitle: "Concierge, Beverly Hills",
          entries: [
            { time: "7:00 AM", title: "Pre-arrival VIP briefing" },
            { time: "9:30 AM", title: "Restaurant reservations & itinerary requests" },
            { time: "12:00 PM", title: "Handle guest inquiries at the desk" },
            { time: "4:00 PM", title: "Coordinate evening activity bookings" },
          ],
        },
        cta: { label: "View Concierge Role", action: "navigate_job", targetId: "21" },
      },
    ],
  },

  // ─── Standard: Hyatt Hotels ────────────────────────────────────────────
  {
    id: "story-hyatt",
    companyId: "hyatt",
    companyName: "Hyatt Hotels",
    companyLogo: hyattLogo,
    brandColors: { primary: "#059669", secondary: "#047857" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 10 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 588,
    linkedJobIds: ["26", "27", "28", "29", "30"],
    order: 6,
    slides: [
      {
        id: "hyatt-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1080&q=80",
        headline: "1,000 properties. Global team.",
        body: "Hyatt operates in 70 countries. Your experience here travels with you.",
        cta: { label: "Explore Roles", action: "navigate_job", targetId: "26" },
        duration: 5000,
        order: 0,
      },
      {
        id: "hyatt-s2",
        type: "job_highlight",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1080&q=80",
        headline: "Sous Chef — Chicago",
        body: "Run your station. Back the chef. Build toward the top of the kitchen.",
        cta: { label: "Apply Now", action: "apply", targetId: "26" },
        duration: 5000,
        order: 1,
        jobHighlight: {
          jobTitle: "Sous Chef",
          location: "Chicago, IL",
          salary: "$55,000 - $72,000/year",
          workType: "On-Site",
          schedule: "Full-Time",
          experience: "4+ Years",
          highlights: [
            "Supervise line cooks & manage station prep",
            "Step in as acting chef when needed",
            "Assist with menu development & food cost control",
          ],
        },
      },
    ],
  },

  // ─── Standard: Hard Rock International ─────────────────────────────────
  {
    id: "story-hardrock",
    companyId: "hardrock",
    companyName: "Hard Rock International",
    companyLogo: hardRockLogo,
    brandColors: { primary: "#9F1239", secondary: "#DC2626" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 14 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 445,
    linkedJobIds: ["31", "32", "33", "34", "35"],
    order: 7,
    slides: [
      {
        id: "hardrock-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1080&q=80",
        headline: "Music. Hotels. Casinos. All of it.",
        body: "Hard Rock runs cafes, hotels, and live music venues worldwide. The culture shows up in the work.",
        cta: { label: "See Open Roles", action: "navigate_job", targetId: "31" },
        duration: 5000,
        order: 0,
      },
      {
        id: "hardrock-s2",
        type: "testimonial",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1080&q=80",
        headline: "From the bar",
        duration: 6000,
        order: 1,
        testimonial: {
          employeeName: "Derek Moore",
          employeeRole: "Bar Manager, Tampa",
          employeePhoto:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
          tenure: "2 years",
          quote:
            "You're not just managing a bar — you're part of a venue that draws real crowds. The energy keeps it interesting.",
        },
        cta: { label: "View Bar Manager Role", action: "navigate_job", targetId: "32" },
      },
    ],
  },

  // ─── Premium: The Ritz-Carlton ──────────────────────────────────────────
  {
    id: "story-ritzcarlton",
    companyId: "ritzcarlton",
    companyName: "The Ritz-Carlton",
    companyLogo: ritzCarltonLogo,
    brandColors: { primary: "#1E3A5F", secondary: "#2563EB" },
    tier: "premium",
    status: "active",
    publishedAt: Date.now() - 7 * 60 * 60 * 1000,
    expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
    totalViews: 1103,
    linkedJobIds: ["41", "42", "43", "44", "45"],
    order: 8,
    slides: [
      {
        id: "ritz-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1080&q=80",
        headline: "Ladies and gentlemen serving ladies and gentlemen.",
        body: "That's the Ritz-Carlton credo. It's not a tagline — it shapes how every department runs.",
        cta: { label: "Explore Careers", action: "navigate_job", targetId: "41" },
        duration: 5000,
        order: 0,
      },
      {
        id: "ritz-s2",
        type: "job_highlight",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1080&q=80",
        headline: "Housekeeping Manager — Dallas",
        body: "Luxury lives in the details. You manage the details.",
        cta: { label: "View Role", action: "navigate_job", targetId: "43" },
        duration: 5000,
        order: 1,
        jobHighlight: {
          jobTitle: "Housekeeping Manager",
          location: "Dallas, TX",
          salary: "$55,000 - $68,000/year",
          workType: "On-Site",
          schedule: "Full-Time",
          experience: "4+ Years",
          highlights: [
            "Manage housekeeping team of 30+ staff",
            "Conduct daily quality inspections of guest rooms",
            "Control labor & supply costs within budget",
          ],
        },
      },
      {
        id: "ritz-s3",
        type: "testimonial",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1080&q=80",
        headline: "From the team",
        duration: 6000,
        order: 2,
        testimonial: {
          employeeName: "Priya Nair",
          employeeRole: "Guest Relations Manager, Charlotte",
          employeePhoto:
            "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
          tenure: "3 years",
          quote:
            "Guest relations at Ritz-Carlton is genuinely challenging — and that's why it's worth it. You learn how to turn any situation around.",
        },
        cta: { label: "View Guest Relations Role", action: "navigate_job", targetId: "41" },
      },
    ],
  },
];
