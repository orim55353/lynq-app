import type { CompanyStory } from "../types/story";

// ─── Logo images (reuse from jobs.ts image sources) ─────────────────────────
const coffeeLogo =
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=100&h=100&fit=crop";
const restaurantLogo =
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=100&h=100&fit=crop";
const supermarketLogo =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop";
const hotelLogo =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=100&h=100&fit=crop";
const constructionLogo =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100&h=100&fit=crop";
const warehouseLogo =
  "https://images.unsplash.com/photo-1553413077-190dd305871c?w=100&h=100&fit=crop";
const cleaningLogo =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop";
const securityLogo =
  "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=100&h=100&fit=crop";

export const companyStories: CompanyStory[] = [
  // ─── Featured: מלון הילטון תל אביב ─────────────────────────────────────
  {
    id: "story-hilton",
    companyId: "hilton",
    companyName: "הילטון ת״א",
    companyLogo: hotelLogo,
    brandColors: { primary: "#1E40AF", secondary: "#0EA5E9" },
    tier: "featured",
    status: "active",
    publishedAt: Date.now() - 2 * 60 * 60 * 1000,
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    totalViews: 1247,
    linkedJobIds: ["9"],
    order: 0,
    slides: [
      {
        id: "hilton-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "החיים במלון הילטון",
        body: "מלון 5 כוכבים על חוף הים. 600+ חדרים. שירות ברמה בינלאומית.",
        cta: { label: "צפה במשרות", action: "navigate_job", targetId: "9" },
        duration: 5000,
        order: 0,
      },
      {
        id: "hilton-s2",
        type: "job_highlight",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "מלצר/ית ארוחת בוקר",
        body: "לפתוח את היום עם חיוך.",
        cta: { label: "הגש מועמדות", action: "apply", targetId: "9" },
        duration: 5000,
        order: 1,
        jobHighlight: {
          jobTitle: "מלצר/ית ארוחת בוקר",
          location: "תל אביב",
          salary: "₪38 - ₪50/שעה",
          workType: "פרונטלי",
          schedule: "בוקר",
          experience: "שנה+",
          highlights: [
            "שעות נוחות - בוקר בלבד",
            "סביבת עבודה יוקרתית",
            "תנאי עבודה מעולים",
          ],
        },
      },
      {
        id: "hilton-s3",
        type: "testimonial",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "מהצוות שלנו",
        duration: 6000,
        order: 2,
        testimonial: {
          employeeName: "דנה כהן",
          employeeRole: "מנהלת חדר אוכל",
          employeePhoto:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
          tenure: "3 שנים",
          quote:
            "העבודה בהילטון נתנה לי הזדמנות לצמוח מקצועית בסביבה בינלאומית. כל יום הוא חוויה.",
        },
        cta: { label: "הצטרפו לצוות", action: "navigate_job", targetId: "9" },
      },
    ],
  },

  // ─── Featured: קבוצת רוטשילד ────────────────────────────────────────────
  {
    id: "story-rothschild",
    companyId: "rothschild",
    companyName: "קבוצת רוטשילד",
    companyLogo: restaurantLogo,
    brandColors: { primary: "#7C3AED", secondary: "#DB2777" },
    tier: "featured",
    status: "active",
    publishedAt: Date.now() - 3 * 60 * 60 * 1000,
    expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000,
    totalViews: 982,
    linkedJobIds: ["6"],
    order: 1,
    slides: [
      {
        id: "rothschild-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "מטבח ברמה אחרת",
        body: "מסעדות מובילות בתל אביב. סטנדרטים גבוהים. פיתוח עובדים.",
        cta: { label: "צפה במשרות", action: "navigate_job", targetId: "6" },
        duration: 5000,
        order: 0,
      },
      {
        id: "rothschild-s2",
        type: "job_highlight",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "עוזר/ת טבח",
        body: "להתחיל מהבסיס. לצמוח למעלה.",
        cta: { label: "הגש מועמדות", action: "apply", targetId: "6" },
        duration: 5000,
        order: 1,
        jobHighlight: {
          jobTitle: "עוזר/ת טבח",
          location: "תל אביב",
          salary: "₪33 - ₪40/שעה",
          workType: "פרונטלי",
          schedule: "גמיש",
          experience: "ללא ניסיון",
          highlights: [
            "הכשרה ולמידה ממטבחים מקצועיים",
            "אפשרות קידום לתפקיד טבח",
            "סביבת עבודה מקצועית ומלמדת",
          ],
        },
      },
    ],
  },

  // ─── Premium: רשת קפה קפה ──────────────────────────────────────────────
  {
    id: "story-cafe-cafe",
    companyId: "cafe-cafe",
    companyName: "קפה קפה",
    companyLogo: coffeeLogo,
    brandColors: { primary: "#92400E", secondary: "#D97706" },
    tier: "premium",
    status: "active",
    publishedAt: Date.now() - 4 * 60 * 60 * 1000,
    expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
    totalViews: 2103,
    linkedJobIds: ["1"],
    order: 2,
    slides: [
      {
        id: "cafe-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "המשפחה של קפה קפה",
        body: "100+ סניפים ברחבי הארץ. אנחנו מחויבים לאיכות, חיוך ואווירה ביתית.",
        cta: { label: "הצטרפו אלינו", action: "navigate_job", targetId: "1" },
        duration: 5000,
        order: 0,
      },
      {
        id: "cafe-s2",
        type: "testimonial",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1554118811-1e0d58224f24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "מהצוות שלנו",
        duration: 6000,
        order: 1,
        testimonial: {
          employeeName: "ליאור אברהם",
          employeeRole: "מלצר ראשי",
          employeePhoto:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
          tenure: "שנתיים",
          quote: "האווירה בקפה קפה היא כמו משפחה. כל יום אני בא לעבודה עם חיוך.",
        },
        cta: { label: "בואו לצוות", action: "navigate_job", targetId: "1" },
      },
    ],
  },

  // ─── Premium: ארומה ישראל ──────────────────────────────────────────────
  {
    id: "story-aroma",
    companyId: "aroma",
    companyName: "ארומה",
    companyLogo: coffeeLogo,
    brandColors: { primary: "#4A2C2A", secondary: "#92400E" },
    tier: "premium",
    status: "active",
    publishedAt: Date.now() - 5 * 60 * 60 * 1000,
    expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
    totalViews: 3210,
    linkedJobIds: ["7"],
    order: 3,
    slides: [
      {
        id: "aroma-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "כל כוס קפה - חיוך קטן",
        body: "200+ סניפים. קפה איכותי. אווירה ביתית. הצטרפו לרשת הקפה הגדולה בישראל.",
        cta: { label: "צפה במשרות", action: "navigate_job", targetId: "7" },
        duration: 5000,
        order: 0,
      },
      {
        id: "aroma-s2",
        type: "job_highlight",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "ברסיטה/ית",
        body: "מתאים לסטודנטים. לוח גמיש. הכשרה מלאה.",
        cta: { label: "הגש מועמדות", action: "apply", targetId: "7" },
        duration: 5000,
        order: 1,
        jobHighlight: {
          jobTitle: "מגיש/ת קפה (ברסיטה)",
          location: "ירושלים",
          salary: "₪34 - ₪42/שעה",
          workType: "פרונטלי",
          schedule: "גמיש",
          experience: "ללא ניסיון",
          highlights: [
            "מתאים לסטודנטים ולוח גמיש",
            "הכשרה מלאה על ציוד הקפה",
            "טיפים יומיים",
          ],
        },
      },
    ],
  },

  // ─── Premium: מקדונלד'ס ────────────────────────────────────────────────
  {
    id: "story-mcdonalds",
    companyId: "mcdonalds",
    companyName: "מקדונלד'ס",
    companyLogo: restaurantLogo,
    brandColors: { primary: "#D97706", secondary: "#DC2626" },
    tier: "premium",
    status: "active",
    publishedAt: Date.now() - 6 * 60 * 60 * 1000,
    expiresAt: Date.now() + 14 * 24 * 60 * 60 * 1000,
    totalViews: 4521,
    linkedJobIds: ["8"],
    order: 4,
    slides: [
      {
        id: "mcd-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "הקריירה מתחילה כאן",
        body: "200+ סניפים. אחד המעסיקים הגדולים בישראל. נתיב קריירה ברור.",
        cta: { label: "צפה במשרות", action: "navigate_job", targetId: "8" },
        duration: 5000,
        order: 0,
      },
      {
        id: "mcd-s2",
        type: "job_highlight",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1571091718767-18b5b1457add?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "מנהל/ת משמרת",
        body: "לנהל את הקצב. להוביל את הצוות.",
        cta: { label: "הגש מועמדות", action: "apply", targetId: "8" },
        duration: 5000,
        order: 1,
        jobHighlight: {
          jobTitle: "מנהל/ת משמרת",
          location: "חיפה",
          salary: "₪42 - ₪52/שעה",
          workType: "פרונטלי",
          schedule: "משמרות מתחלפות",
          experience: "שנה+",
          highlights: [
            "ניהול צוות ורכישת כישורי מנהיגות",
            "בונוס על עמידה ביעדים",
            "אפשרות קידום למנהל/ת סניף",
          ],
        },
      },
    ],
  },

  // ─── Standard: בר הצפון ────────────────────────────────────────────────
  {
    id: "story-bar-hatzafon",
    companyId: "bar-hatzafon",
    companyName: "בר הצפון",
    companyLogo: coffeeLogo,
    brandColors: { primary: "#1F2937", secondary: "#4B5563" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 8 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 756,
    linkedJobIds: ["2"],
    order: 5,
    slides: [
      {
        id: "bar-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "לשקשק, לערבב, ליצור",
        body: "בר ייל בפלורנטין. תפריט קוקטיילים מיוחד ואווירה ייחודית.",
        cta: { label: "צפה במשרות", action: "navigate_job", targetId: "2" },
        duration: 5000,
        order: 0,
      },
    ],
  },

  // ─── Standard: רמי לוי ─────────────────────────────────────────────────
  {
    id: "story-rami-levy",
    companyId: "rami-levy",
    companyName: "רמי לוי",
    companyLogo: supermarketLogo,
    brandColors: { primary: "#166534", secondary: "#16A34A" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 9 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 1432,
    linkedJobIds: ["3"],
    order: 6,
    slides: [
      {
        id: "rami-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "המשפחה של רמי לוי",
        body: "50+ סניפים. מחירים נמוכים. שירות טוב. תנאים סוציאליים מלאים.",
        cta: { label: "הצטרפו אלינו", action: "navigate_job", targetId: "3" },
        duration: 5000,
        order: 0,
      },
    ],
  },

  // ─── Standard: מסעדת אבו חסן ──────────────────────────────────────────
  {
    id: "story-abu-hassan",
    companyId: "abu-hassan",
    companyName: "אבו חסן",
    companyLogo: restaurantLogo,
    brandColors: { primary: "#B45309", secondary: "#D97706" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 10 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 891,
    linkedJobIds: ["5"],
    order: 7,
    slides: [
      {
        id: "abu-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "חומוס מ-1950",
        body: "מסעדה אגדית ביפו. לקוחות מהארץ ומהעולם. בישול מסורתי אותנטי.",
        cta: { label: "הצטרפו לצוות", action: "navigate_job", targetId: "5" },
        duration: 5000,
        order: 0,
      },
    ],
  },

  // ─── Standard: Fox Fashion ─────────────────────────────────────────────
  {
    id: "story-fox",
    companyId: "fox",
    companyName: "Fox",
    companyLogo: supermarketLogo,
    brandColors: { primary: "#BE185D", secondary: "#DB2777" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 11 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 1678,
    linkedJobIds: ["12"],
    order: 8,
    slides: [
      {
        id: "fox-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "אופנה שמרגישה טוב",
        body: "400+ סניפים. הנחה 40% לעובדים. סביבה דינמית.",
        cta: { label: "צפה במשרות", action: "navigate_job", targetId: "12" },
        duration: 5000,
        order: 0,
      },
    ],
  },

  // ─── Standard: מלון ישרוטל ─────────────────────────────────────────────
  {
    id: "story-isrotel",
    companyId: "isrotel",
    companyName: "ישרוטל",
    companyLogo: hotelLogo,
    brandColors: { primary: "#0F766E", secondary: "#0EA5E9" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 12 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 1123,
    linkedJobIds: ["10"],
    order: 9,
    slides: [
      {
        id: "isrotel-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "קבוצת המלונות הגדולה בישראל",
        body: "30+ מלונות. 4-5 כוכבים. לינה מסובסדת לעובדים מרחוק.",
        cta: { label: "הצטרפו אלינו", action: "navigate_job", targetId: "10" },
        duration: 5000,
        order: 0,
      },
    ],
  },

  // ─── Standard: מודיעין אזרחי ───────────────────────────────────────────
  {
    id: "story-modi-in",
    companyId: "modi-in",
    companyName: "מודיעין אזרחי",
    companyLogo: securityLogo,
    brandColors: { primary: "#1F2937", secondary: "#111827" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 14 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 645,
    linkedJobIds: ["15"],
    order: 10,
    slides: [
      {
        id: "modi-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "לשמור. לבקר. להגן.",
        body: "חברת אבטחה מובילה. אלפי לקוחות. הכשרה מלאה על חשבון החברה.",
        cta: { label: "צפה במשרות", action: "navigate_job", targetId: "15" },
        duration: 5000,
        order: 0,
      },
    ],
  },

  // ─── Standard: שופרסל ──────────────────────────────────────────────────
  {
    id: "story-shufersal",
    companyId: "shufersal",
    companyName: "שופרסל",
    companyLogo: supermarketLogo,
    brandColors: { primary: "#1D4ED8", secondary: "#3B82F6" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 15 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 2340,
    linkedJobIds: ["14"],
    order: 11,
    slides: [
      {
        id: "shuf-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1534723452862-4c874018d66d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "הרשת הגדולה בישראל",
        body: "350+ סניפים. תנאי סוציאליים מלאים. תוספת לילה.",
        cta: { label: "הצטרפו אלינו", action: "navigate_job", targetId: "14" },
        duration: 5000,
        order: 0,
      },
    ],
  },

  // ─── Standard: זארה ישראל ─────────────────────────────────────────────
  {
    id: "story-zara",
    companyId: "zara",
    companyName: "זארה",
    companyLogo: supermarketLogo,
    brandColors: { primary: "#111827", secondary: "#374151" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 16 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 1890,
    linkedJobIds: ["13"],
    order: 12,
    slides: [
      {
        id: "zara-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "אופנה בינלאומית",
        body: "2,000+ חנויות ב-96 מדינות. הנחה 25% על כל מותגי INDITEX.",
        cta: { label: "צפה במשרות", action: "navigate_job", targetId: "13" },
        duration: 5000,
        order: 0,
      },
    ],
  },

  // ─── Standard: מלון קינג דיוויד ───────────────────────────────────────
  {
    id: "story-king-david",
    companyId: "king-david",
    companyName: "קינג דיוויד",
    companyLogo: hotelLogo,
    brandColors: { primary: "#78350F", secondary: "#D97706" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 18 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 534,
    linkedJobIds: ["11"],
    order: 13,
    slides: [
      {
        id: "king-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1564501049412-61c2a3083791?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "100 שנה של יוקרה",
        body: "מלון 5 כוכבים אגדי בירושלים. אורחי VIP. טיפים גבוהים.",
        cta: { label: "הצטרפו אלינו", action: "navigate_job", targetId: "11" },
        duration: 5000,
        order: 0,
      },
    ],
  },

  // ─── Standard: לחמים ───────────────────────────────────────────────────
  {
    id: "story-lehamim",
    companyId: "lehamim",
    companyName: "לחמים",
    companyLogo: restaurantLogo,
    brandColors: { primary: "#92400E", secondary: "#F59E0B" },
    tier: "standard",
    status: "active",
    publishedAt: Date.now() - 20 * 60 * 60 * 1000,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
    totalViews: 412,
    linkedJobIds: ["4"],
    order: 14,
    slides: [
      {
        id: "lehamim-s1",
        type: "culture",
        mediaType: "image",
        mediaUrl:
          "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
        headline: "אהבה בכל כיכר",
        body: "מאפיות גורמה ייחודיות. חומרי גלם מעולים. צוות מקצועי ומלמד.",
        cta: { label: "צפה במשרות", action: "navigate_job", targetId: "4" },
        duration: 5000,
        order: 0,
      },
    ],
  },
];
