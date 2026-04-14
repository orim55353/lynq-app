import { Job } from "../types/models";

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
const stationCasinosLogo =
  "https://download.logo.wine/logo/Station_Casinos/Station_Casinos-Logo.wine.png";

export const jobs: Job[] = [
  // ── Caesars Entertainment ──────────────────────────────────────────────
  {
    id: "1",
    title: "Casino Floor Supervisor",
    company: "Caesars Entertainment",
    location: "Las Vegas, NV",
    salary: "$28 - $35/hour",
    type: "Full-time",
    tagline: "Lead the floor. Own the energy. Run the show.",
    description:
      "Lead and supervise gaming operations on the casino floor. Ensure exceptional guest experiences while maintaining strict gaming regulations and security standards.",
    highlights: [
      "Supervise table games & slot operations",
      "Train and mentor floor staff",
      "VIP guest satisfaction & compliance",
    ],
    responsibilities: [
      "Supervise table games and slot operations during assigned shift",
      "Monitor and enforce gaming regulations and company policies",
      "Resolve guest complaints and ensure VIP satisfaction",
      "Train and mentor new floor staff",
      "Coordinate with security and surveillance teams",
    ],
    requirements: [
      "3+ years casino floor experience",
      "Nevada Gaming Control Board license",
      "Strong leadership and communication skills",
      "Ability to work nights, weekends, and holidays",
      "Fluent in English; Spanish a plus",
    ],
    companyAbout:
      "Caesars Entertainment runs over 50 resorts across the US. The company is big enough to offer real career paths but floor teams still tend to have tight-knit cultures.",
    benefits: ["Health insurance", "401k matching", "Employee gaming privileges", "Hotel discounts"],
    logoImage: caesarsLogo,
    bgImage:
      "https://images.unsplash.com/photo-1764815643474-dc6a32b6021d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNpbm8lMjBzbG90JTIwbWFjaGluZXMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzExOTQ3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    compatibilityScore: 85,
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#DC2626", "#D97706"],
    matchExplanation:
      "Good match. The experience level is realistic and the pay range is competitive for this type of supervisory role. Worth applying.",
  },
  {
    id: "2",
    title: "Hotel Front Desk Manager",
    company: "Caesars Entertainment",
    location: "Atlantic City, NJ",
    salary: "$24 - $30/hour",
    type: "Full-time",
    tagline: "Be the first face guests remember.",
    description:
      "Oversee front desk operations and lead a team handling check-ins, VIP arrivals, and guest issues. You'll also manage room inventory and rate strategy day to day.",
    highlights: [
      "Lead front desk team & daily operations",
      "Handle VIP arrivals & special requests",
      "Manage room inventory & rate strategy",
    ],
    responsibilities: [
      "Manage daily front desk operations and staff scheduling",
      "Handle VIP arrivals and special accommodation requests",
      "Resolve escalated guest issues with professionalism",
      "Oversee room inventory and rate management",
      "Train staff on hospitality standards and systems",
    ],
    requirements: [
      "5+ years in hotel front office management",
      "Experience with Opera PMS or similar systems",
      "Exceptional interpersonal and problem-solving skills",
      "Bachelor's degree in Hospitality Management preferred",
    ],
    companyAbout:
      "Caesars Entertainment runs over 50 resorts across the US. The company is big enough to offer real career paths but floor teams still tend to have tight-knit cultures.",
    benefits: ["Health & dental insurance", "Paid vacation", "Free meals", "Career advancement"],
    logoImage: caesarsLogo,
    bgImage:
      "https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlY2VwdGlvbiUyMGRlc2slMjBtb2Rlcm58ZW58MXx8fHwxNzcxMTk0NzcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    compatibilityScore: 90,
    experience: "5+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#2563EB", "#4F46E5"],
    matchExplanation:
      "Strong match. The role pays well for the level of responsibility, and Caesars tends to promote managers internally rather than hire externally.",
  },
  {
    id: "3",
    title: "Fine Dining Server",
    company: "Caesars Entertainment",
    location: "Las Vegas, NV",
    salary: "$15 - $20/hour + tips",
    type: "Full-time",
    tagline: "Serve unforgettable moments, not just meals.",
    description:
      "Work in one of the casino's award-winning restaurants delivering table service, presenting the menu, and making wine pairings. High volume, high standards.",
    highlights: [
      "Fine dining service in award-winning venues",
      "Wine & menu pairing expertise",
      "Luxury table presentation standards",
    ],
    responsibilities: [
      "Deliver fine dining service in a high-volume restaurant",
      "Present menu options and make pairing recommendations",
      "Maintain detailed knowledge of wine list and specials",
      "Ensure table settings meet luxury standards",
      "Collaborate with kitchen team on timing and presentation",
    ],
    requirements: [
      "2+ years fine dining experience",
      "Wine knowledge (WSET or Court of Master Sommeliers a plus)",
      "Professional appearance and demeanor",
      "Ability to lift 30+ lbs and stand for extended periods",
    ],
    companyAbout:
      "Caesars Entertainment runs over 50 resorts across the US. The company is big enough to offer real career paths but floor teams still tend to have tight-knit cultures.",
    benefits: ["Flexible schedules", "Employee meals", "Health coverage", "Tip pooling"],
    logoImage: caesarsLogo,
    bgImage:
      "https://images.unsplash.com/photo-1761095596849-608b6a337c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzcxMTA1NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    compatibilityScore: 75,
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#9333EA", "#DB2777"],
    matchExplanation:
      "Decent match. Fine dining experience is a plus but not a hard requirement here. The tips can push total comp well above the base rate.",
  },
  {
    id: "4",
    title: "Security Officer",
    company: "Caesars Entertainment",
    location: "New Orleans, LA",
    salary: "$22 - $28/hour",
    type: "Full-time",
    tagline: "Protect the experience. Keep the peace.",
    description:
      "Keep guests and staff safe across the property. You'll patrol assigned areas, monitor surveillance feeds, respond to incidents, and write up reports.",
    highlights: [
      "Patrol & monitor surveillance systems",
      "Respond to security & medical incidents",
      "Enforce gaming regulations on property",
    ],
    responsibilities: [
      "Patrol assigned areas and monitor surveillance feeds",
      "Respond to security incidents and medical emergencies",
      "Enforce property rules and gaming regulations",
      "Write detailed incident reports",
      "Coordinate with local law enforcement when needed",
    ],
    requirements: [
      "High school diploma or equivalent",
      "Security guard license for Louisiana",
      "First Aid/CPR certification preferred",
      "Clean background check required",
      "Ability to work rotating shifts",
    ],
    companyAbout:
      "Caesars Entertainment runs over 50 resorts across the US. The company is big enough to offer real career paths but floor teams still tend to have tight-knit cultures.",
    benefits: ["Comprehensive insurance", "Retirement plan", "Shift differentials", "Tuition reimbursement"],
    logoImage: caesarsLogo,
    bgImage:
      "https://images.unsplash.com/photo-1767395523614-53f52709c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwY2hhbmRlbGllcnxlbnwxfHx8fDE3NzExNTkyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    compatibilityScore: 80,
    experience: "N/A",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#374151", "#111827"],
    matchExplanation:
      "Good match. The entry requirements are reasonable and rotating shifts open up more scheduling flexibility than a standard 9-to-5 role.",
  },
  {
    id: "5",
    title: "VIP Casino Host",
    company: "Caesars Entertainment",
    location: "Las Vegas, NV",
    salary: "$35 - $45/hour",
    type: "Full-time",
    tagline: "Roll out the red carpet. Every. Single. Time.",
    description:
      "Build relationships with high-value guests and act as their personal point of contact for accommodations, dining, and events. Monthly revenue targets apply.",
    highlights: [
      "Build VIP guest relationships",
      "Arrange luxury experiences & events",
      "Hit monthly revenue & retention targets",
    ],
    responsibilities: [
      "Develop and maintain relationships with VIP guests",
      "Arrange luxury accommodations, dining, and entertainment",
      "Track guest preferences and anticipate needs",
      "Meet monthly revenue and retention targets",
      "Host exclusive events and tournaments",
    ],
    requirements: [
      "5+ years in casino hosting or luxury hospitality",
      "Proven book of business preferred",
      "Exceptional networking and relationship skills",
      "Flexible schedule including evenings and weekends",
      "Bachelor's degree preferred",
    ],
    companyAbout:
      "Caesars Entertainment runs over 50 resorts across the US. The company is big enough to offer real career paths but floor teams still tend to have tight-knit cultures.",
    benefits: ["Commission opportunities", "Premium benefits", "Travel perks", "Networking events"],
    logoImage: caesarsLogo,
    bgImage:
      "https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwbHV4dXJ5JTIwYmVkcm9vbXxlbnwxfHx8fDE3NzExOTQ3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    compatibilityScore: 95,
    experience: "5+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#D97706", "#EAB308"],
    matchExplanation:
      "Very strong match. The compensation ceiling is high once commission kicks in, and relationship-focused roles like this have low turnover.",
  },

  // ── MGM Resorts International ──────────────────────────────────────────
  {
    id: "6",
    title: "Poker Dealer",
    company: "MGM Resorts International",
    location: "Las Vegas, NV",
    salary: "$12 - $16/hour + tips",
    type: "Full-time",
    tagline: "Deal cards. Read rooms. Keep the game moving.",
    description:
      "Run poker tables at one of the busiest card rooms on the Strip. You'll deal multiple game formats, handle chip transactions, and keep the game fair and fast.",
    highlights: [
      "Deal Texas Hold'em, Omaha & mixed games",
      "Handle chips, payouts & pot calculations",
      "Maintain game integrity & pace",
    ],
    responsibilities: [
      "Deal poker and table card games accurately during each shift",
      "Calculate pots and process chip transactions",
      "Spot rule violations and escalate to the floor supervisor",
      "Maintain a steady game pace without rushing players",
      "Provide a professional and welcoming table atmosphere",
    ],
    requirements: [
      "Poker dealer school certificate or equivalent experience",
      "Nevada Gaming license (or willingness to obtain)",
      "Ability to deal at least two card game formats",
      "Strong math skills and attention to detail",
      "Available evenings, weekends, and holidays",
    ],
    companyAbout:
      "MGM Resorts runs about 30 destinations across the US and internationally. The poker rooms are among the busiest in Las Vegas and attract a mix of recreational players and regulars.",
    benefits: ["Health & vision insurance", "Free meals during shifts", "Tip pooling", "401k plan"],
    logoImage: mgmLogo,
    bgImage:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1080&q=80",
    compatibilityScore: 78,
    experience: "1+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#1E3A5F", "#334155"],
    matchExplanation:
      "Solid match. The licensing process is straightforward and MGM tends to have good support for new dealers getting their feet under them.",
  },
  {
    id: "7",
    title: "Beverage Server",
    company: "MGM Resorts International",
    location: "Las Vegas, NV",
    salary: "$10 - $14/hour + tips",
    type: "Full-time",
    tagline: "Keep the drinks coming. Keep the energy up.",
    description:
      "Deliver cocktails and non-alcoholic beverages to casino floor guests. Fast-paced, tip-heavy work that rewards people with high stamina and genuine friendliness.",
    highlights: [
      "Serve casino floor guests across multiple sections",
      "Process drink orders quickly & accurately",
      "Maintain tray service & presentation standards",
    ],
    responsibilities: [
      "Take and deliver beverage orders to guests on the casino floor",
      "Carry and balance full service trays for extended periods",
      "Maintain knowledge of available drinks and promotions",
      "Check IDs and refuse service when required",
      "Keep assigned section clean and well-stocked",
    ],
    requirements: [
      "Valid Alcohol Awareness (TAM) card",
      "Ability to stand and walk for an 8-hour shift",
      "Strong customer service instincts",
      "Previous serving or hospitality experience preferred",
    ],
    companyAbout:
      "MGM Resorts runs about 30 destinations across the US and internationally. Beverage roles here have high tip potential, especially on weekend nights.",
    benefits: ["Health insurance", "Shift meals", "Tip income", "Employee discounts"],
    logoImage: mgmLogo,
    bgImage:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1080&q=80",
    compatibilityScore: 70,
    experience: "N/A",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#059669", "#0D9488"],
    matchExplanation:
      "Good entry point. Tips are the real draw here and the hours are flexible enough to work around other commitments.",
  },
  {
    id: "8",
    title: "Executive Chef",
    company: "MGM Resorts International",
    location: "Las Vegas, NV",
    salary: "$90,000 - $120,000/year",
    type: "Full-time",
    tagline: "Run the kitchen. Shape the menu. Set the standard.",
    description:
      "Lead the culinary team across one of MGM's signature restaurant outlets. You'll own the menu, manage food cost, hire and train kitchen staff, and keep quality consistent across every service.",
    highlights: [
      "Own menu development & seasonal updates",
      "Manage kitchen team of 20+ staff",
      "Control food cost within target margins",
    ],
    responsibilities: [
      "Develop and execute seasonal menus with the culinary team",
      "Manage all kitchen staff including hiring, scheduling, and reviews",
      "Monitor food cost and waste to meet budget targets",
      "Maintain health code compliance and kitchen safety standards",
      "Collaborate with F&B director on promotions and special events",
    ],
    requirements: [
      "8+ years in professional kitchen environments",
      "3+ years as a head chef or executive chef",
      "Culinary degree or equivalent professional training",
      "Strong financial acumen and food cost management",
      "ServSafe Manager certification",
    ],
    companyAbout:
      "MGM Resorts runs about 30 destinations across the US. The culinary program is taken seriously here — this isn't a hotel breakfast buffet situation.",
    benefits: ["Executive compensation package", "Relocation assistance", "Annual bonus", "Health & dental"],
    logoImage: mgmLogo,
    bgImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1080&q=80",
    compatibilityScore: 88,
    experience: "8+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#EA580C", "#DC2626"],
    matchExplanation:
      "Strong match. The budget and kitchen size are exactly what you'd expect at a major Strip property, and the creative latitude is higher than most hotel chains.",
  },
  {
    id: "9",
    title: "Revenue Manager",
    company: "MGM Resorts International",
    location: "Las Vegas, NV",
    salary: "$70,000 - $90,000/year",
    type: "Full-time",
    tagline: "Every empty room is a missed opportunity.",
    description:
      "Optimize room rates and inventory strategy across an MGM property. You'll use demand data, booking trends, and competitive pricing to maximize RevPAR every day.",
    highlights: [
      "Set dynamic room rates using demand data",
      "Manage OTA relationships & channel mix",
      "Produce weekly revenue forecasts",
    ],
    responsibilities: [
      "Analyze booking patterns to adjust pricing strategies daily",
      "Manage OTA channels and direct booking performance",
      "Produce weekly and monthly revenue forecasts",
      "Identify demand drivers and market compression periods",
      "Collaborate with sales and marketing on promotions",
    ],
    requirements: [
      "3+ years in hotel revenue management",
      "Experience with IDeaS, Duetto, or similar RMS platforms",
      "Strong Excel and data analysis skills",
      "Understanding of Las Vegas market dynamics preferred",
    ],
    companyAbout:
      "MGM Resorts runs about 30 destinations across the US. The revenue team here works with large inventory sets and complex demand patterns driven by events, conventions, and gaming.",
    benefits: ["Annual bonus", "Health & dental", "401k matching", "Parking"],
    logoImage: mgmLogo,
    bgImage:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1080&q=80",
    compatibilityScore: 83,
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "Hybrid",
    gradient: ["#0369A1", "#0891B2"],
    matchExplanation:
      "Good match. Revenue roles at large casino-hotels are harder to land than at traditional hotels, so this is a solid step up for the right candidate.",
  },
  {
    id: "10",
    title: "Loss Prevention Officer",
    company: "MGM Resorts International",
    location: "Las Vegas, NV",
    salary: "$24 - $30/hour",
    type: "Full-time",
    tagline: "Watch everything. Miss nothing.",
    description:
      "Monitor surveillance systems, conduct investigations, and respond to theft or fraud incidents across the property. Both floor patrol and surveillance room shifts are part of this role.",
    highlights: [
      "Operate CCTV surveillance systems",
      "Investigate theft & internal fraud",
      "Conduct interviews & write incident reports",
    ],
    responsibilities: [
      "Monitor surveillance cameras across the property",
      "Conduct investigations into suspected theft or fraud",
      "Interview witnesses and write detailed incident reports",
      "Collaborate with gaming control and local law enforcement",
      "Patrol hotel and casino areas as assigned",
    ],
    requirements: [
      "2+ years in loss prevention or law enforcement",
      "Familiarity with casino surveillance systems preferred",
      "Strong written communication for reports",
      "Clean background check required",
      "Nevada gaming registration",
    ],
    companyAbout:
      "MGM Resorts runs about 30 destinations across the US. The loss prevention team here deals with a genuine mix of situations — from shoplifting to sophisticated gaming scams.",
    benefits: ["Health & vision insurance", "Retirement plan", "Shift differentials", "Career advancement"],
    logoImage: mgmLogo,
    bgImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1080&q=80",
    compatibilityScore: 81,
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#374151", "#1F2937"],
    matchExplanation:
      "Good fit. Casino LP work is a step up from retail LP in terms of complexity, and MGM's scale means there's always something to learn.",
  },

  // ── Wynn Resorts ───────────────────────────────────────────────────────
  {
    id: "11",
    title: "Spa Therapist",
    company: "Wynn Resorts",
    location: "Las Vegas, NV",
    salary: "$20 - $28/hour + gratuities",
    type: "Full-time",
    tagline: "Deliver quiet luxury at the highest level.",
    description:
      "Provide massage and body treatment services at the Wynn Spa. Guests expect a top-tier experience, and therapists here are given the time and tools to deliver it properly.",
    highlights: [
      "Deliver Swedish, deep tissue & specialty treatments",
      "Maintain detailed client intake records",
      "Upsell spa packages & retail products",
    ],
    responsibilities: [
      "Perform massage and body treatments per scheduled appointments",
      "Conduct pre-treatment consultations and note client preferences",
      "Maintain cleanliness and sanitation of treatment rooms",
      "Recommend retail products based on client needs",
      "Participate in ongoing training for new service offerings",
    ],
    requirements: [
      "Valid Nevada massage therapy license",
      "2+ years of spa or clinical massage experience",
      "Proficiency in Swedish, deep tissue, and hot stone",
      "Professional demeanor and discretion with guests",
    ],
    companyAbout:
      "Wynn Resorts runs two Las Vegas properties — Wynn and Encore — both consistently rated among the top resorts in the country. The spa clientele here is different from most hotel spas.",
    benefits: ["Gratuity income", "Health & dental", "Employee spa access", "Paid training"],
    logoImage: wynnLogo,
    bgImage:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1080&q=80",
    compatibilityScore: 87,
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#6D28D9", "#4C1D95"],
    matchExplanation:
      "Strong match. Wynn Spa pays above market and the gratuities from high-spending guests add up quickly. The client profile here is easier to work with than most.",
  },
  {
    id: "12",
    title: "Banquet Event Coordinator",
    company: "Wynn Resorts",
    location: "Las Vegas, NV",
    salary: "$26 - $34/hour",
    type: "Full-time",
    tagline: "Every event you run is someone's big night.",
    description:
      "Coordinate banquet setups, manage event-day logistics, and be the liaison between clients and the F&B team. You'll handle everything from corporate dinners to wedding receptions.",
    highlights: [
      "Coordinate setup for 10 to 1,000-person events",
      "Liaise between clients, catering & AV teams",
      "Manage event-day timelines & troubleshoot issues",
    ],
    responsibilities: [
      "Serve as on-site coordinator for banquet and catering events",
      "Communicate event requirements to kitchen, AV, and setup teams",
      "Conduct pre-event walkthroughs with clients",
      "Oversee event breakdown and post-event reporting",
      "Manage last-minute changes without disrupting the guest experience",
    ],
    requirements: [
      "3+ years in event coordination or banquet management",
      "Strong organizational skills and calm under pressure",
      "Experience with Delphi or similar event management software",
      "Ability to work evenings and weekends",
    ],
    companyAbout:
      "Wynn Resorts runs two Las Vegas properties — Wynn and Encore. The banquet program here handles everything from 10-person private dinners to 1,500-guest galas.",
    benefits: ["Health & dental", "Paid time off", "Shift meal allowance", "Career path to Catering Manager"],
    logoImage: wynnLogo,
    bgImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1080&q=80",
    compatibilityScore: 80,
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#B45309", "#92400E"],
    matchExplanation:
      "Good match. Event coordination at a property like Wynn moves fast and the volume is consistent year-round, which means steady hours and no slow season slumps.",
  },
  {
    id: "13",
    title: "Nightclub Manager",
    company: "Wynn Resorts",
    location: "Las Vegas, NV",
    salary: "$65,000 - $85,000/year",
    type: "Full-time",
    tagline: "Run the night. Own the room.",
    description:
      "Manage nightly operations for one of Wynn's high-profile nightlife venues. You'll oversee staff, manage guest lists, coordinate with talent and security, and hit revenue targets.",
    highlights: [
      "Manage staff scheduling & nightly operations",
      "Oversee guest list, VIP reservations & bottle service",
      "Coordinate with talent buyers & security teams",
    ],
    responsibilities: [
      "Direct nightly venue operations including staff and floor management",
      "Manage VIP reservations, bottle service, and guestlist logistics",
      "Coordinate with promoters and talent buyers on event execution",
      "Monitor revenue metrics and provide post-event reports",
      "Handle escalated guest incidents professionally",
    ],
    requirements: [
      "4+ years in nightlife or high-volume bar management",
      "Proven experience managing 20+ person teams",
      "Strong knowledge of Las Vegas nightlife landscape",
      "Evening and weekend availability required",
      "Nevada TAM and gaming awareness certifications",
    ],
    companyAbout:
      "Wynn Resorts runs two Las Vegas properties — Wynn and Encore. The nightlife operation here is a significant revenue driver, not an afterthought.",
    benefits: ["Base salary + performance bonus", "Health coverage", "Flexible scheduling", "Industry networking"],
    logoImage: wynnLogo,
    bgImage:
      "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1080&q=80",
    compatibilityScore: 84,
    experience: "4+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#9F1239", "#7F1D1D"],
    matchExplanation:
      "Good fit. Nightlife management roles at top-tier properties are hard to find and don't post often. The salary band and bonus structure are among the better ones in town.",
  },
  {
    id: "14",
    title: "Valet Attendant",
    company: "Wynn Resorts",
    location: "Las Vegas, NV",
    salary: "$11 - $14/hour + tips",
    type: "Full-time",
    tagline: "First impression. Last impression. Both yours.",
    description:
      "Park and retrieve guest vehicles at the Wynn main entrance. The tips are real here — this is a high-traffic luxury property where guests tip generously.",
    highlights: [
      "Park & retrieve guest vehicles efficiently",
      "Greet guests at main entrance & assist with luggage",
      "Maintain lot organization & accurate ticket records",
    ],
    responsibilities: [
      "Greet arriving and departing guests at the valet stand",
      "Safely drive and park guest vehicles in assigned areas",
      "Maintain an organized and accurate ticket tracking system",
      "Assist guests with luggage and directions as needed",
      "Report vehicle damage or incidents immediately to supervisors",
    ],
    requirements: [
      "Valid Nevada driver's license with clean record",
      "Comfortable driving luxury and performance vehicles",
      "Ability to run and stand for full shifts",
      "Professional appearance and communication",
    ],
    companyAbout:
      "Wynn Resorts runs two Las Vegas properties — Wynn and Encore. Valet here handles a high volume of high-end vehicles and the tip income reflects that.",
    benefits: ["Tip income", "Health insurance eligibility", "Employee meals", "Flexible shifts"],
    logoImage: wynnLogo,
    bgImage:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1080&q=80",
    compatibilityScore: 72,
    experience: "N/A",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#14532D", "#166534"],
    matchExplanation:
      "Solid entry-level option. The tip income here is meaningfully higher than at most hotel valet stands, and schedules are usually consistent.",
  },
  {
    id: "15",
    title: "Golf Course Operations Manager",
    company: "Wynn Resorts",
    location: "Las Vegas, NV",
    salary: "$60,000 - $75,000/year",
    type: "Full-time",
    tagline: "Keep 18 holes running like a 5-star operation.",
    description:
      "Oversee daily operations of the Wynn Golf Club including tee time management, staff, and the guest experience from the pro shop to the 18th green.",
    highlights: [
      "Manage tee time reservations & pace of play",
      "Oversee pro shop staff & merchandise inventory",
      "Coordinate course maintenance with the agronomy team",
    ],
    responsibilities: [
      "Oversee tee sheet management and course flow daily",
      "Manage pro shop staff, scheduling, and customer service",
      "Coordinate with greenskeeping on maintenance schedules",
      "Handle VIP tee times and special booking requests",
      "Manage merchandise inventory and retail sales targets",
    ],
    requirements: [
      "3+ years in golf operations or club management",
      "PGA membership or equivalent preferred",
      "Experience with tee sheet management software (e.g., Lightspeed Golf)",
      "Strong hospitality orientation in a luxury setting",
    ],
    companyAbout:
      "Wynn Golf Club is one of a small number of resort golf courses still operating in Las Vegas. It attracts a specific clientele willing to pay premium rates for a premium experience.",
    benefits: ["Annual salary", "Health & dental", "Golf privileges", "Employee dining"],
    logoImage: wynnLogo,
    bgImage:
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=1080&q=80",
    compatibilityScore: 76,
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#16A34A", "#059669"],
    matchExplanation:
      "Good match for someone with golf ops experience looking to move into luxury hospitality. The role is niche but well-compensated for what it involves.",
  },

  // ── Marriott International ─────────────────────────────────────────────
  {
    id: "16",
    title: "Guest Services Agent",
    company: "Marriott International",
    location: "Orlando, FL",
    salary: "$18 - $22/hour",
    type: "Full-time",
    tagline: "Make 3,000 guests feel like the only one.",
    description:
      "Handle check-ins, check-outs, room requests, and guest inquiries at a high-volume Marriott property near the Orlando theme park corridor.",
    highlights: [
      "Process check-ins & check-outs efficiently",
      "Handle guest requests & room issue resolutions",
      "Support loyalty program member benefits",
    ],
    responsibilities: [
      "Process guest arrivals, departures, and room changes in Opera",
      "Handle Bonvoy member requests and elite tier benefits",
      "Resolve room-related complaints and escalate when needed",
      "Answer multi-line phones and respond to guest inquiries",
      "Coordinate with housekeeping on room readiness",
    ],
    requirements: [
      "1+ year in hotel front desk or guest services",
      "Experience with Opera PMS preferred",
      "Strong communication and conflict resolution skills",
      "Flexible availability including mornings, evenings, and weekends",
    ],
    companyAbout:
      "Marriott International runs over 8,000 properties in 130 countries. The Orlando properties see consistent volume year-round and tend to have strong internal mobility programs.",
    benefits: ["Marriott hotel discounts worldwide", "Health & dental", "Paid time off", "401k"],
    logoImage: marriottLogo,
    bgImage:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1080&q=80",
    compatibilityScore: 82,
    experience: "1+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#B45309", "#D97706"],
    matchExplanation:
      "Solid match. Orlando Marriott properties are busy year-round, which means consistent hours and real experience managing difficult guest situations.",
  },
  {
    id: "17",
    title: "Housekeeping Supervisor",
    company: "Marriott International",
    location: "New York, NY",
    salary: "$26 - $32/hour",
    type: "Full-time",
    tagline: "Clean rooms don't just happen. You make them happen.",
    description:
      "Supervise a team of room attendants at a Marriott property in Manhattan. You'll run daily room inspections, manage your team's schedule, and handle supply inventory.",
    highlights: [
      "Supervise & schedule room attendant team",
      "Conduct daily room inspections & quality checks",
      "Manage housekeeping supplies & linen inventory",
    ],
    responsibilities: [
      "Assign daily room cleaning lists and inspect completed rooms",
      "Train new room attendants on brand standards",
      "Manage supply requests and linen par levels",
      "Handle guest complaints related to room cleanliness",
      "Work with front desk on early arrivals and priority rooms",
    ],
    requirements: [
      "2+ years housekeeping experience, including 1 year supervisory",
      "Attention to detail and strong organization skills",
      "Ability to communicate clearly in English",
      "Physical ability to walk multiple floors and lift supply items",
    ],
    companyAbout:
      "Marriott International runs over 8,000 properties globally. New York properties operate at a different pace from most — high occupancy, fast turnovers, and demanding guests are the norm.",
    benefits: ["Health coverage", "Transit benefits", "Paid vacation", "Hotel discounts"],
    logoImage: marriottLogo,
    bgImage:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1080&q=80",
    compatibilityScore: 77,
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#475569", "#1D4ED8"],
    matchExplanation:
      "Good match. Supervisory housekeeping roles in NYC pay noticeably better than in other markets, and Marriott's internal promotion track is one of the better ones in the industry.",
  },
  {
    id: "18",
    title: "Director of Sales",
    company: "Marriott International",
    location: "Chicago, IL",
    salary: "$85,000 - $110,000/year",
    type: "Full-time",
    tagline: "Fill the hotel before it opens every morning.",
    description:
      "Lead the sales team at a full-service Marriott in downtown Chicago. You'll own the group and corporate accounts, drive occupancy goals, and manage a team of 4-6 sales managers.",
    highlights: [
      "Own group, corporate & SMERF sales segments",
      "Manage a team of 4 to 6 sales managers",
      "Drive occupancy & revenue against annual targets",
    ],
    responsibilities: [
      "Develop and execute annual group and corporate sales strategy",
      "Manage relationships with key accounts and travel agencies",
      "Lead weekly sales meetings and pipeline reviews",
      "Collaborate with revenue management on rate strategy",
      "Report on performance to the GM and ownership",
    ],
    requirements: [
      "7+ years in hotel sales, including director-level experience",
      "Strong knowledge of the Chicago market preferred",
      "Experience with Delphi and Marriott CI/TY or similar",
      "Track record of exceeding group room night goals",
    ],
    companyAbout:
      "Marriott International runs over 8,000 properties globally. Chicago is a strong meetings and conventions market, and the Marriott properties here compete for serious corporate and group business.",
    benefits: ["Executive salary", "Annual bonus", "Health & dental", "Marriott discounts"],
    logoImage: marriottLogo,
    bgImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=80",
    compatibilityScore: 89,
    experience: "7+ Years",
    schedule: "Full-Time",
    workType: "Hybrid",
    gradient: ["#7C3AED", "#2563EB"],
    matchExplanation:
      "Strong match. Director-level hotel sales roles don't post often in a market like Chicago. The bonus potential here is meaningful if the team hits its numbers.",
  },
  {
    id: "19",
    title: "Night Auditor",
    company: "Marriott International",
    location: "Miami, FL",
    salary: "$20 - $25/hour",
    type: "Full-time",
    tagline: "While the hotel sleeps, you keep it running.",
    description:
      "Work the overnight shift handling front desk duties, running nightly account audits, and preparing daily reports for the morning management team.",
    highlights: [
      "Run nightly audit & balance all accounts",
      "Handle overnight front desk operations",
      "Prepare daily revenue & occupancy reports",
    ],
    responsibilities: [
      "Perform nightly audit to balance front desk transactions",
      "Handle late check-ins, check-outs, and overnight guest requests",
      "Prepare daily reports for department heads",
      "Monitor security and coordinate with on-call maintenance",
      "Run the daily backup of property management system data",
    ],
    requirements: [
      "1+ year in a hotel front desk or accounting role",
      "Comfortable working independently overnight",
      "Basic accounting skills and attention to detail",
      "Reliable transportation for overnight hours",
    ],
    companyAbout:
      "Marriott International runs over 8,000 properties globally. Miami properties see strong year-round occupancy, and the night audit role here is a well-worn path into accounting or front office management.",
    benefits: ["Shift differential pay", "Health insurance", "Paid time off", "Hotel discounts"],
    logoImage: marriottLogo,
    bgImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1080&q=80",
    compatibilityScore: 74,
    experience: "1+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#1E3A5F", "#0369A1"],
    matchExplanation:
      "Good fit for someone who prefers overnight hours. The shift differential bumps the effective pay noticeably and the audit work is straightforward once you know the system.",
  },
  {
    id: "20",
    title: "Catering Sales Manager",
    company: "Marriott International",
    location: "Los Angeles, CA",
    salary: "$60,000 - $80,000/year",
    type: "Full-time",
    tagline: "Sell the space. Deliver the event.",
    description:
      "Sell and manage catering and event contracts at a full-service LA Marriott. You'll work with social, corporate, and non-profit clients from initial inquiry through post-event follow-up.",
    highlights: [
      "Sell catering & event packages to social & corporate clients",
      "Manage client relationships from contract to close",
      "Coordinate event logistics with banquet operations",
    ],
    responsibilities: [
      "Respond to inbound catering inquiries and convert to booked events",
      "Conduct property tours and present food and beverage proposals",
      "Draft event contracts and manage client changes",
      "Coordinate with banquet operations on event execution",
      "Manage a book of repeat clients and referral relationships",
    ],
    requirements: [
      "3+ years in catering sales or event sales in a hotel setting",
      "Experience with Delphi FDC or similar platform",
      "Strong written and verbal communication",
      "Ability to manage multiple accounts simultaneously",
    ],
    companyAbout:
      "Marriott International runs over 8,000 properties globally. The LA market has strong demand from entertainment industry events and corporate meetings.",
    benefits: ["Base + commission", "Health & dental", "Paid time off", "Marriott employee rates"],
    logoImage: marriottLogo,
    bgImage:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1080&q=80",
    compatibilityScore: 85,
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "Hybrid",
    gradient: ["#EC4899", "#F43F5E"],
    matchExplanation:
      "Solid match. Catering sales roles with real commission upside are rarer than they look — this one is structured well for experienced hotel salespeople.",
  },

  // ── Hilton Hotels & Resorts ────────────────────────────────────────────
  {
    id: "21",
    title: "Concierge",
    company: "Hilton Hotels & Resorts",
    location: "Beverly Hills, CA",
    salary: "$22 - $28/hour",
    type: "Full-time",
    tagline: "Every guest thinks you work magic. You just know people.",
    description:
      "Serve as the primary resource for guest inquiries, reservations, and local recommendations at a luxury Hilton in Beverly Hills. Strong LA knowledge is a real advantage here.",
    highlights: [
      "Handle dining, entertainment & activity reservations",
      "Provide personalized local recommendations",
      "Assist VIP guests with custom itinerary planning",
    ],
    responsibilities: [
      "Answer guest questions about local dining, entertainment, and transportation",
      "Make reservations and arrange bookings on behalf of guests",
      "Prepare customized itineraries for extended-stay and VIP guests",
      "Maintain up-to-date knowledge of local events and restaurant openings",
      "Coordinate with other hotel departments on special guest requests",
    ],
    requirements: [
      "2+ years in concierge or guest services at an upscale property",
      "Strong working knowledge of the Greater Los Angeles area",
      "Les Clefs d'Or membership or working toward it is a plus",
      "Excellent written and verbal communication skills",
    ],
    companyAbout:
      "Hilton Hotels & Resorts runs over 500 properties across 90 countries. The Beverly Hills location draws a mix of entertainment industry guests and international travelers with high expectations.",
    benefits: ["Hilton team member discount program", "Health coverage", "Paid time off", "Tip income"],
    logoImage: hiltonLogo,
    bgImage:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1080&q=80",
    compatibilityScore: 86,
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#D97706", "#B45309"],
    matchExplanation:
      "Good match. Beverly Hills concierge roles have a specific guest profile that rewards people with genuine local knowledge and a calm, can-do attitude.",
  },
  {
    id: "22",
    title: "Food & Beverage Director",
    company: "Hilton Hotels & Resorts",
    location: "Miami, FL",
    salary: "$80,000 - $105,000/year",
    type: "Full-time",
    tagline: "From pool bar to rooftop dinner — it all runs through you.",
    description:
      "Oversee all food and beverage operations across a large Miami Hilton including multiple outlets, banquets, and in-room dining. P&L ownership is part of the role.",
    highlights: [
      "Oversee all F&B outlets, banquets & in-room dining",
      "Own F&B P&L and monthly cost reporting",
      "Lead a team of 60+ F&B staff",
    ],
    responsibilities: [
      "Direct all food and beverage operations across outlets and banquets",
      "Manage F&B P&L, labor costs, and supply expenses",
      "Lead, coach, and develop department managers",
      "Drive menu innovation in collaboration with the executive chef",
      "Ensure health code compliance across all food service areas",
    ],
    requirements: [
      "7+ years in F&B management in a full-service hotel",
      "Direct P&L experience required",
      "Strong leadership skills with a track record of developing teams",
      "Bilingual (English/Spanish) preferred for this market",
    ],
    companyAbout:
      "Hilton Hotels & Resorts runs over 500 properties globally. Miami Hilton properties compete in a saturated market where F&B quality is a real differentiator for repeat guests.",
    benefits: ["Executive salary + annual bonus", "Health & dental", "Relocation assistance", "401k matching"],
    logoImage: hiltonLogo,
    bgImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1080&q=80",
    compatibilityScore: 91,
    experience: "7+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#0891B2", "#0369A1"],
    matchExplanation:
      "Strong match. F&B director roles at Hilton full-service properties are real operational leadership jobs, not just glorified food runner positions. The compensation reflects that.",
  },
  {
    id: "23",
    title: "Event Planner",
    company: "Hilton Hotels & Resorts",
    location: "Washington, DC",
    salary: "$55,000 - $70,000/year",
    type: "Full-time",
    tagline: "Logistics, creativity, and grace under pressure. All day.",
    description:
      "Plan and execute corporate meetings, galas, and association events at a Hilton convention property in DC. You'll manage the client relationship from first contact to post-event review.",
    highlights: [
      "Plan & execute events from 50 to 2,000 attendees",
      "Manage client BEOs & catering selections",
      "Coordinate AV, decor & transportation vendors",
    ],
    responsibilities: [
      "Serve as the primary event planning contact for contracted clients",
      "Draft and manage banquet event orders (BEOs)",
      "Coordinate with AV, catering, and third-party vendors",
      "Conduct pre-conference meetings with client and hotel teams",
      "Troubleshoot day-of issues and ensure smooth execution",
    ],
    requirements: [
      "3+ years in event planning, preferably at a hotel or convention venue",
      "CMP designation preferred",
      "Experience with Cvent or similar event management platforms",
      "Strong attention to detail and ability to manage multiple events simultaneously",
    ],
    companyAbout:
      "Hilton Hotels & Resorts operates extensively in DC, a city that runs on conventions, government meetings, and association events. The demand is steady and the clients are repeat buyers.",
    benefits: ["Annual salary", "Health & dental", "Paid time off", "Professional development funds"],
    logoImage: hiltonLogo,
    bgImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1080&q=80",
    compatibilityScore: 83,
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "Hybrid",
    gradient: ["#4F46E5", "#7C3AED"],
    matchExplanation:
      "Solid match. DC events tend to run on tight budgets and high standards, which sharpens event planners fast. The experience here transfers well to almost any other market.",
  },
  {
    id: "24",
    title: "Maintenance Technician",
    company: "Hilton Hotels & Resorts",
    location: "Dallas, TX",
    salary: "$22 - $28/hour",
    type: "Full-time",
    tagline: "If something breaks, you fix it before the guest notices.",
    description:
      "Handle maintenance requests, preventive maintenance rounds, and equipment repairs across a Dallas Hilton. HVAC and plumbing experience are a real plus.",
    highlights: [
      "Respond to guest room & common area work orders",
      "Complete preventive maintenance rounds",
      "Handle HVAC, plumbing & electrical repairs",
    ],
    responsibilities: [
      "Respond to work orders for guest rooms and public areas",
      "Perform scheduled preventive maintenance inspections",
      "Repair or replace HVAC filters, plumbing fixtures, and electrical components",
      "Document completed work and flag unresolved issues to the chief engineer",
      "Participate in emergency on-call rotation",
    ],
    requirements: [
      "2+ years of facility or hotel maintenance experience",
      "Basic HVAC, plumbing, and electrical competency",
      "Ability to read technical manuals and schematic drawings",
      "EPA 608 certification a plus",
    ],
    companyAbout:
      "Hilton Hotels & Resorts runs over 500 properties globally. Dallas Hilton properties are mid-to-full service with consistent maintenance demand and a structured engineering team.",
    benefits: ["Health & dental", "Paid vacation", "Tool allowance", "On-call differential pay"],
    logoImage: hiltonLogo,
    bgImage:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1080&q=80",
    compatibilityScore: 79,
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#374151", "#475569"],
    matchExplanation:
      "Good fit. Hotel maintenance pays reliably, the work is varied, and the schedule is more predictable than facilities roles in other industries.",
  },
  {
    id: "25",
    title: "Front Office Manager",
    company: "Hilton Hotels & Resorts",
    location: "Nashville, TN",
    salary: "$50,000 - $65,000/year",
    type: "Full-time",
    tagline: "The lobby sets the tone. You set the lobby's tone.",
    description:
      "Manage front office operations at a full-service Nashville Hilton. You'll lead the front desk, bell, and valet teams while working closely with sales and housekeeping.",
    highlights: [
      "Manage front desk, bell & valet operations",
      "Drive Hilton Honors enrollment & satisfaction scores",
      "Handle escalated guest situations & room strategies",
    ],
    responsibilities: [
      "Oversee daily front office staffing, scheduling, and training",
      "Manage room inventory in coordination with revenue management",
      "Handle escalated guest complaints and satisfaction recovery",
      "Drive Hilton Honors enrollment goals and GSS scores",
      "Participate in daily department head meetings",
    ],
    requirements: [
      "4+ years in hotel front office with at least 1 year in a supervisory role",
      "Experience with OnQ PMS or similar",
      "Strong coaching and performance management skills",
      "Hilton brand experience preferred",
    ],
    companyAbout:
      "Hilton Hotels & Resorts operates multiple properties in Nashville. The city's hotel market is driven by tourism, music events, and a growing convention segment.",
    benefits: ["Annual salary", "Health & dental", "Hilton discounts", "Bonus potential"],
    logoImage: hiltonLogo,
    bgImage:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1080&q=80",
    compatibilityScore: 87,
    experience: "4+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#DC2626", "#B91C1C"],
    matchExplanation:
      "Strong match. Front office manager roles in a growing market like Nashville come with real upside in terms of career progression and the volume of experience you'll get.",
  },

  // ── Hyatt Hotels ──────────────────────────────────────────────────────
  {
    id: "26",
    title: "Sous Chef",
    company: "Hyatt Hotels",
    location: "Chicago, IL",
    salary: "$55,000 - $72,000/year",
    type: "Full-time",
    tagline: "Run the line. Back the chef. Own your station.",
    description:
      "Work directly under the executive chef at a large Chicago Hyatt. You'll supervise line cooks, manage station prep, and step up to run the kitchen when the chef is out.",
    highlights: [
      "Supervise line cooks & manage station prep",
      "Step in as acting chef when needed",
      "Assist with menu development & food cost control",
    ],
    responsibilities: [
      "Supervise kitchen staff during service and prep",
      "Maintain food quality and portion control standards",
      "Assist executive chef with menu development and costing",
      "Handle ordering and inventory for assigned stations",
      "Train new kitchen staff on recipes and standards",
    ],
    requirements: [
      "4+ years in professional kitchen environments",
      "2+ years in a sous chef or senior line cook role",
      "Culinary degree or equivalent experience",
      "ServSafe certification",
      "Strong leadership presence in a high-pressure environment",
    ],
    companyAbout:
      "Hyatt runs over 1,000 properties in 70 countries. The Chicago properties are full-service with active banquet programs that keep kitchen teams consistently busy.",
    benefits: ["Annual salary", "Health & dental", "401k", "Employee dining discounts"],
    logoImage: hyattLogo,
    bgImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1080&q=80",
    compatibilityScore: 82,
    experience: "4+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#B45309", "#EA580C"],
    matchExplanation:
      "Good match. Hyatt kitchens at full-service properties run busy banquet programs in addition to à la carte, which means real experience across multiple cooking formats.",
  },
  {
    id: "27",
    title: "Night Auditor",
    company: "Hyatt Hotels",
    location: "San Francisco, CA",
    salary: "$24 - $30/hour",
    type: "Full-time",
    tagline: "Quiet shift. Real responsibility.",
    description:
      "Run overnight front desk operations and perform the nightly audit at a San Francisco Hyatt. The role is mostly independent work with occasional guest interactions.",
    highlights: [
      "Perform nightly accounting audit & balance accounts",
      "Handle overnight front desk & guest requests",
      "Prepare daily revenue summary for management",
    ],
    responsibilities: [
      "Balance all front desk transactions and run nightly audit",
      "Handle late arrivals, early departures, and guest requests overnight",
      "Prepare and distribute daily occupancy and revenue reports",
      "Monitor property security and coordinate with maintenance on issues",
      "Provide accurate handoff to morning shift team",
    ],
    requirements: [
      "1+ year front desk or accounting experience in a hotel",
      "Comfortable with data entry and basic financial reconciliation",
      "Reliable for overnight schedule, including weekends",
      "Hyatt property systems experience a plus",
    ],
    companyAbout:
      "Hyatt runs over 1,000 properties globally. San Francisco properties run high occupancy for most of the year, making the night audit role consistently active.",
    benefits: ["Shift premium pay", "Health insurance", "Hyatt employee rates", "Paid time off"],
    logoImage: hyattLogo,
    bgImage:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1080&q=80",
    compatibilityScore: 73,
    experience: "1+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#0369A1", "#1E3A5F"],
    matchExplanation:
      "Decent match. SF pays one of the higher hourly rates for hotel night audit roles in the country. Good option for someone who works better independently.",
  },
  {
    id: "28",
    title: "Room Service Supervisor",
    company: "Hyatt Hotels",
    location: "New York, NY",
    salary: "$26 - $33/hour",
    type: "Full-time",
    tagline: "Deliver it right. Every time. No excuses.",
    description:
      "Supervise in-room dining operations at a midtown Manhattan Hyatt. You'll manage order accuracy, team scheduling, delivery times, and guest satisfaction.",
    highlights: [
      "Supervise in-room dining team & scheduling",
      "Ensure order accuracy & timely delivery",
      "Handle guest complaints & SALT score targets",
    ],
    responsibilities: [
      "Schedule and supervise in-room dining staff across shifts",
      "Monitor order accuracy and delivery time targets",
      "Handle guest complaints related to food quality or delivery",
      "Manage tray retrieval operations throughout the property",
      "Collaborate with kitchen on menu timing during peak hours",
    ],
    requirements: [
      "2+ years in in-room dining or food service supervision",
      "Strong organizational skills and ability to multitask",
      "Experience in a union hotel environment preferred",
      "Flexible availability including evenings and weekends",
    ],
    companyAbout:
      "Hyatt runs over 1,000 properties globally. Midtown Manhattan Hyatt properties have high guest volumes and in-room dining demand that runs around the clock.",
    benefits: ["NYC wage premiums", "Health & dental", "Transit benefits", "Paid time off"],
    logoImage: hyattLogo,
    bgImage:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1080&q=80",
    compatibilityScore: 78,
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#7C3AED", "#9333EA"],
    matchExplanation:
      "Good fit. NYC hotel rates for supervisory food service roles are higher than most markets, and in-room dining experience is transferable to a lot of other positions.",
  },
  {
    id: "29",
    title: "Sales Coordinator",
    company: "Hyatt Hotels",
    location: "Austin, TX",
    salary: "$42,000 - $52,000/year",
    type: "Full-time",
    tagline: "The sales team runs on great support. That's you.",
    description:
      "Support the hotel's group and corporate sales team in Austin with proposals, contracts, prospecting research, and account management tasks.",
    highlights: [
      "Prepare group proposals & contracts",
      "Support sales managers with account research",
      "Manage Delphi database & reporting",
    ],
    responsibilities: [
      "Prepare and send proposals and contracts for group inquiries",
      "Support the sales team with prospecting and account research",
      "Maintain accurate records in Delphi FDC",
      "Handle site visit logistics and client communications",
      "Produce weekly and monthly sales reports for leadership",
    ],
    requirements: [
      "1+ year in a hotel administrative or sales support role",
      "Proficiency with Microsoft Office Suite",
      "Strong written communication skills",
      "Experience with Delphi or Salesforce preferred",
    ],
    companyAbout:
      "Hyatt runs over 1,000 properties globally. Austin has grown into a legitimate meetings and tech events destination, and the Hyatt properties here are positioned squarely in that market.",
    benefits: ["Annual salary", "Health & dental", "Hyatt discounts", "Bonus eligibility"],
    logoImage: hyattLogo,
    bgImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=80",
    compatibilityScore: 76,
    experience: "1+ Years",
    schedule: "Full-Time",
    workType: "Hybrid",
    gradient: ["#059669", "#16A34A"],
    matchExplanation:
      "Good entry point into hotel sales. The coordinator role is the standard path to sales manager and Austin's market is growing fast enough that advancement is genuinely possible.",
  },
  {
    id: "30",
    title: "Pool & Recreation Supervisor",
    company: "Hyatt Hotels",
    location: "Scottsdale, AZ",
    salary: "$20 - $26/hour",
    type: "Full-time",
    tagline: "Arizona heat. Pool full of guests. Let's go.",
    description:
      "Oversee pool and recreation operations at a Hyatt resort in Scottsdale. You'll manage attendant staff, safety compliance, rental equipment, and the overall guest experience.",
    highlights: [
      "Supervise pool attendants & lifeguard staff",
      "Manage pool safety compliance & emergency procedures",
      "Coordinate pool-side food & beverage service",
    ],
    responsibilities: [
      "Schedule and supervise pool attendants and lifeguards",
      "Enforce safety protocols and respond to emergencies",
      "Manage towel service, cabana rentals, and recreational equipment",
      "Coordinate with F&B on poolside dining and beverage service",
      "Handle guest concerns and ensure guest satisfaction",
    ],
    requirements: [
      "2+ years in pool or recreation operations at a resort",
      "Current Lifeguard certification or willingness to obtain",
      "CPR/AED certification required",
      "Comfortable working in extreme outdoor heat",
    ],
    companyAbout:
      "Hyatt runs over 1,000 properties globally. Scottsdale is a resort market and the pool experience here is central to the guest stay, not an amenity people walk past.",
    benefits: ["Health coverage", "Seasonal schedule options", "Employee dining", "Resort discounts"],
    logoImage: hyattLogo,
    bgImage:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1080&q=80",
    compatibilityScore: 79,
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#0891B2", "#0D9488"],
    matchExplanation:
      "Good match. Resort pool roles in Arizona run year-round — the peak summer season is demanding but the overall schedule stability is better than most seasonal hospitality work.",
  },

  // ── Hard Rock International ────────────────────────────────────────────
  {
    id: "31",
    title: "Entertainment Host",
    company: "Hard Rock International",
    location: "Hollywood, FL",
    salary: "$18 - $24/hour",
    type: "Full-time",
    tagline: "The show starts when you walk in the room.",
    description:
      "Host live entertainment events and coordinate artist arrivals, sound checks, and guest access at the Hard Rock Live venue in Hollywood, FL. Equal parts logistics and personality.",
    highlights: [
      "Host live events & manage artist schedules",
      "Coordinate guest access & VIP experiences",
      "Liaise between production, security & venue staff",
    ],
    responsibilities: [
      "Serve as on-site host during live entertainment events",
      "Coordinate artist arrivals, green room prep, and sound checks",
      "Manage VIP guest access and backstage logistics",
      "Communicate between production, security, and front-of-house teams",
      "Handle real-time issues with a calm, professional attitude",
    ],
    requirements: [
      "2+ years in live event operations or entertainment hosting",
      "Comfortable communicating with artists and high-profile guests",
      "Available for evening, weekend, and irregular event schedules",
      "Strong verbal communication and problem-solving skills",
    ],
    companyAbout:
      "Hard Rock International runs cafes, hotels, casinos, and live music venues across the globe. The Hollywood, FL campus is one of its flagship properties with a major concert venue.",
    benefits: ["Event access perks", "Health insurance", "Employee discounts", "Flexible scheduling"],
    logoImage: hardRockLogo,
    bgImage:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1080&q=80",
    compatibilityScore: 81,
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#9F1239", "#DC2626"],
    matchExplanation:
      "Good match. Entertainment hosting roles at a venue like Hard Rock Live don't post often. The irregular hours are the tradeoff for interesting work and a high-energy environment.",
  },
  {
    id: "32",
    title: "Bar Manager",
    company: "Hard Rock International",
    location: "Tampa, FL",
    salary: "$50,000 - $65,000/year",
    type: "Full-time",
    tagline: "Run a bar people actually want to come back to.",
    description:
      "Manage bar operations at the Hard Rock Tampa property. You'll hire and train bartenders, manage inventory and pour costs, write cocktail menus, and hit monthly revenue targets.",
    highlights: [
      "Manage bar staff scheduling & training",
      "Control inventory, pour cost & waste",
      "Develop seasonal cocktail menu",
    ],
    responsibilities: [
      "Hire, train, and schedule bar staff across all shifts",
      "Manage bar inventory, order supplies, and track pour costs",
      "Develop and update the cocktail menu seasonally",
      "Ensure TIPS/ALERT compliance and responsible service standards",
      "Handle bar-related guest complaints and service recovery",
    ],
    requirements: [
      "4+ years of bartending with at least 1 year in bar management",
      "Strong knowledge of spirits, cocktail techniques, and wine",
      "Florida Alcohol Server certification",
      "Experience managing cost of goods for a high-volume bar",
    ],
    companyAbout:
      "Hard Rock International runs properties globally. The Tampa location is a full casino and entertainment complex that draws steady local traffic in addition to tourist volume.",
    benefits: ["Annual salary + bonus", "Health & dental", "Employee dining", "Hard Rock discounts"],
    logoImage: hardRockLogo,
    bgImage:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=1080&q=80",
    compatibilityScore: 84,
    experience: "4+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#B45309", "#92400E"],
    matchExplanation:
      "Solid match. Bar manager roles in a casino-entertainment environment involve more operational complexity than a standalone bar, which makes the experience more transferable.",
  },
  {
    id: "33",
    title: "Retail Store Manager",
    company: "Hard Rock International",
    location: "Atlantic City, NJ",
    salary: "$45,000 - $58,000/year",
    type: "Full-time",
    tagline: "Merch, music, and a store that moves product.",
    description:
      "Manage the Hard Rock Cafe retail store in Atlantic City. You'll lead a team of 6-10, manage inventory and visual merchandising, and hit monthly sales targets.",
    highlights: [
      "Lead retail team & manage daily operations",
      "Manage inventory, loss prevention & visual merchandising",
      "Drive monthly sales targets & KPIs",
    ],
    responsibilities: [
      "Hire, schedule, and develop a team of retail associates",
      "Manage inventory levels, ordering, and shrinkage control",
      "Set up and maintain visual merchandising displays",
      "Track daily sales and produce weekly performance reports",
      "Handle customer concerns and service issues",
    ],
    requirements: [
      "3+ years in retail management, preferably in a tourist or entertainment venue",
      "Experience with POS systems and retail inventory software",
      "Strong people management and coaching skills",
      "Flexible availability including weekends and holidays",
    ],
    companyAbout:
      "Hard Rock International runs cafes, hotels, and casinos globally. The Atlantic City retail operation is tied to a full entertainment and casino complex.",
    benefits: ["Annual salary + performance bonus", "Health insurance", "Product discounts", "Paid vacation"],
    logoImage: hardRockLogo,
    bgImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1080&q=80",
    compatibilityScore: 77,
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#374151", "#1F2937"],
    matchExplanation:
      "Decent match. Entertainment venue retail is a specific niche — the brand recognition helps drive traffic, but the actual management skills are pretty standard.",
  },
  {
    id: "34",
    title: "Events Marketing Manager",
    company: "Hard Rock International",
    location: "Nashville, TN",
    salary: "$60,000 - $78,000/year",
    type: "Full-time",
    tagline: "Market the night before it happens. Own the story after.",
    description:
      "Manage marketing for live events and venue promotions at the Nashville Hard Rock. You'll run social content, email campaigns, local media outreach, and in-venue promotional activations.",
    highlights: [
      "Plan & execute event marketing campaigns",
      "Manage social media, email & paid digital channels",
      "Coordinate with PR & local media for event coverage",
    ],
    responsibilities: [
      "Develop marketing plans for concerts and special events",
      "Manage social media accounts and create event content",
      "Run email campaigns and paid digital ads",
      "Coordinate media outreach with local press and radio",
      "Track campaign performance and report to venue management",
    ],
    requirements: [
      "3+ years in events marketing, live music, or entertainment marketing",
      "Proven track record running social and digital campaigns",
      "Familiarity with Nashville's music and entertainment scene preferred",
      "Experience with CRM tools and email marketing platforms",
    ],
    companyAbout:
      "Hard Rock International runs a global portfolio of entertainment properties. Nashville is a key market given the city's deep connection to live music.",
    benefits: ["Annual salary", "Event access", "Health & dental", "Performance bonus"],
    logoImage: hardRockLogo,
    bgImage:
      "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=1080&q=80",
    compatibilityScore: 85,
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "Hybrid",
    gradient: ["#6D28D9", "#7C3AED"],
    matchExplanation:
      "Strong match. Marketing roles tied to live entertainment are genuinely fun to work in, and Nashville is one of the better markets for building relationships in the music industry.",
  },
  {
    id: "35",
    title: "Rock Shop Supervisor",
    company: "Hard Rock International",
    location: "Orlando, FL",
    salary: "$18 - $24/hour",
    type: "Full-time",
    tagline: "The shop runs right because you make sure it does.",
    description:
      "Supervise daily retail operations at the Hard Rock Cafe Rock Shop in Orlando. You'll manage stock levels, coach a team of associates, and handle shift-level customer issues.",
    highlights: [
      "Supervise associates across retail shifts",
      "Maintain stock levels & handle daily replenishment",
      "Resolve customer concerns & drive upsells",
    ],
    responsibilities: [
      "Open and close the retail shop according to operational procedures",
      "Supervise and coach a team of retail associates during shifts",
      "Monitor stock levels and submit replenishment requests",
      "Handle customer complaints and resolve issues on the spot",
      "Conduct daily cash reconciliation and report variances",
    ],
    requirements: [
      "1+ year retail supervisory experience",
      "Strong customer service skills in a high-traffic tourist environment",
      "Availability for early mornings, evenings, and weekends",
      "Basic cash handling and POS experience",
    ],
    companyAbout:
      "Hard Rock International runs a global portfolio of entertainment properties. Orlando is one of its highest-traffic markets given the theme park corridor.",
    benefits: ["Hourly pay + shift bonuses", "Health eligibility", "Employee discounts", "Flexible shifts"],
    logoImage: hardRockLogo,
    bgImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1080&q=80",
    compatibilityScore: 73,
    experience: "1+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#D97706", "#F59E0B"],
    matchExplanation:
      "Good entry-level supervisory role. Orlando retail volume is consistent year-round, which makes the hours stable compared to seasonal tourist markets.",
  },

  // ── Four Seasons Hotels ────────────────────────────────────────────────
  {
    id: "36",
    title: "Guest Room Attendant (Butler)",
    company: "Four Seasons Hotels",
    location: "New York, NY",
    salary: "$28 - $36/hour",
    type: "Full-time",
    tagline: "Anticipate every need before it's asked.",
    description:
      "Serve as a personal butler for guests at the Four Seasons New York. Responsibilities range from unpacking luggage and pressing garments to arranging private dining and VIP logistics.",
    highlights: [
      "Provide personalized butler service to long-stay & VIP guests",
      "Handle laundry, packing, dining & private requests",
      "Maintain detailed guest preference profiles",
    ],
    responsibilities: [
      "Provide attentive butler service to assigned long-stay and VIP guests",
      "Unpack and pack luggage, press garments, and organize suites",
      "Arrange in-suite dining, flowers, and amenity setup",
      "Maintain and update detailed guest preference records",
      "Coordinate with all hotel departments to fulfill guest requests",
    ],
    requirements: [
      "3+ years in butler service or ultra-luxury hospitality",
      "Formal butler training preferred (Guild of Professional English Butlers, etc.)",
      "Exceptional discretion and attention to personal detail",
      "Fluency in English required; second language strongly preferred",
    ],
    companyAbout:
      "Four Seasons runs over 100 properties in 45+ countries. The New York property is one of the most demanding in the portfolio — the guest profile expects the highest level of personal attention in the industry.",
    benefits: ["Premium hourly rate", "Gratuities", "Health & dental", "Employee dining"],
    logoImage: fourSeasonsLogo,
    bgImage:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1080&q=80",
    compatibilityScore: 92,
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#92400E", "#B45309"],
    matchExplanation:
      "Very strong match. Four Seasons butler roles are rare openings and the pay reflects the level of service expected. Not many properties in the world require this skill set.",
  },
  {
    id: "37",
    title: "Restaurant Manager",
    company: "Four Seasons Hotels",
    location: "Miami, FL",
    salary: "$65,000 - $85,000/year",
    type: "Full-time",
    tagline: "Run a restaurant that people write home about.",
    description:
      "Manage a signature restaurant at the Four Seasons Miami. You'll lead the FOH team, work closely with the executive chef, and deliver a dining experience that matches the property's reputation.",
    highlights: [
      "Lead front-of-house operations & service standards",
      "Manage staff scheduling, training & performance",
      "Collaborate with exec chef on menu & guest experience",
    ],
    responsibilities: [
      "Oversee all front-of-house operations for assigned restaurant",
      "Hire, train, and evaluate restaurant staff",
      "Conduct pre-shift meetings and coach service teams",
      "Work with the executive chef on menu presentations and pairings",
      "Handle guest complaints and ensure satisfaction recovery",
    ],
    requirements: [
      "5+ years in upscale or fine dining restaurant management",
      "Strong service standards and tableside etiquette knowledge",
      "Experience in a luxury hotel restaurant preferred",
      "Bilingual (English/Spanish) beneficial for Miami market",
    ],
    companyAbout:
      "Four Seasons runs over 100 properties globally. Miami draws both an international clientele and local fine dining regulars, which keeps the restaurant program running at full capacity.",
    benefits: ["Annual salary", "Performance bonus", "Health & dental", "Four Seasons employee rates"],
    logoImage: fourSeasonsLogo,
    bgImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1080&q=80",
    compatibilityScore: 88,
    experience: "5+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#0D9488", "#0891B2"],
    matchExplanation:
      "Strong match. Four Seasons restaurant management is one of the more respected lines on a hospitality resume, and Miami's dining scene makes the competition interesting.",
  },
  {
    id: "38",
    title: "Pastry Chef",
    company: "Four Seasons Hotels",
    location: "Chicago, IL",
    salary: "$58,000 - $75,000/year",
    type: "Full-time",
    tagline: "The last thing they taste should be the best thing.",
    description:
      "Lead the pastry program for dining and banquets at the Four Seasons Chicago. You'll design dessert menus, manage pastry staff, and maintain the exacting standards the property is known for.",
    highlights: [
      "Design & execute dessert menus for dining & banquets",
      "Manage pastry team of 3 to 5 cooks",
      "Develop seasonal plated desserts & showpieces",
    ],
    responsibilities: [
      "Create and cost seasonal pastry menus for restaurant and banquet",
      "Supervise and train pastry kitchen staff",
      "Produce specialty showpieces for galas and VIP events",
      "Manage pastry inventory and ordering within budget",
      "Collaborate with the executive chef on dessert pairings",
    ],
    requirements: [
      "5+ years pastry experience in fine dining or luxury hotel settings",
      "Culinary or pastry arts degree preferred",
      "Proficiency in plated desserts, confectionery, and artisan bread",
      "Strong leadership and organization in a production environment",
    ],
    companyAbout:
      "Four Seasons runs over 100 properties globally. Chicago's culinary scene is competitive and the Four Seasons pastry program is expected to hold its own.",
    benefits: ["Annual salary", "Health & dental", "Chef's uniform provided", "Employee dining"],
    logoImage: fourSeasonsLogo,
    bgImage:
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1080&q=80",
    compatibilityScore: 86,
    experience: "5+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#EC4899", "#DB2777"],
    matchExplanation:
      "Good match. Pastry chef roles at luxury hotel properties offer real creative latitude and the team sizes are manageable enough to actually enjoy the work.",
  },
  {
    id: "39",
    title: "Reservations Manager",
    company: "Four Seasons Hotels",
    location: "Los Angeles, CA",
    salary: "$60,000 - $78,000/year",
    type: "Full-time",
    tagline: "Every reservation is the start of someone's experience.",
    description:
      "Manage the reservations team and strategy at the Four Seasons Los Angeles. You'll focus on conversion rates, average rate optimization, and delivering a warm pre-arrival experience.",
    highlights: [
      "Manage reservations team of 5 to 8 agents",
      "Drive conversion rates & ADR performance",
      "Oversee pre-arrival guest communication & upsell program",
    ],
    responsibilities: [
      "Lead and develop a team of reservations agents",
      "Monitor call and email conversion rates and coach for improvement",
      "Collaborate with revenue management on rate and availability strategy",
      "Manage the pre-arrival upsell program for room upgrades and amenities",
      "Handle escalated booking issues and VIP pre-arrival coordination",
    ],
    requirements: [
      "4+ years in hotel reservations with supervisory experience",
      "Experience with property management and CRS platforms",
      "Strong written and verbal communication for a luxury brand",
      "Track record of team performance improvement",
    ],
    companyAbout:
      "Four Seasons runs over 100 properties globally. The LA property draws a mix of entertainment industry guests and international travelers who often book well in advance.",
    benefits: ["Annual salary", "Health & dental", "Four Seasons travel benefit", "Bonus potential"],
    logoImage: fourSeasonsLogo,
    bgImage:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1080&q=80",
    compatibilityScore: 83,
    experience: "4+ Years",
    schedule: "Full-Time",
    workType: "Hybrid",
    gradient: ["#2563EB", "#1D4ED8"],
    matchExplanation:
      "Solid match. Reservations manager roles at luxury properties are more strategic than they sound, and Four Seasons has one of the better pre-arrival experience programs in the industry.",
  },
  {
    id: "40",
    title: "Spa Director",
    company: "Four Seasons Hotels",
    location: "Seattle, WA",
    salary: "$75,000 - $95,000/year",
    type: "Full-time",
    tagline: "Lead the space where guests exhale.",
    description:
      "Direct all operations of the Four Seasons Seattle spa. You'll manage therapists and front desk staff, own the spa P&L, develop programming, and drive revenue through retail and packages.",
    highlights: [
      "Manage spa staff & daily operations",
      "Own spa P&L & monthly revenue targets",
      "Develop spa menus, packages & retail strategy",
    ],
    responsibilities: [
      "Oversee all spa operations including scheduling, training, and quality",
      "Manage spa P&L and meet monthly revenue and occupancy goals",
      "Develop spa menus, seasonal offerings, and signature treatments",
      "Drive retail sales and product knowledge across the team",
      "Handle VIP guest bookings and special requests",
    ],
    requirements: [
      "6+ years in spa management with director-level experience preferred",
      "Licensed spa therapist background beneficial",
      "Track record of hitting spa revenue and retail targets",
      "Strong leadership with experience managing 15+ person teams",
    ],
    companyAbout:
      "Four Seasons runs over 100 properties globally. Seattle's spa clientele is a mix of local wellness-oriented guests and hotel guests seeking recovery from the Pacific Northwest climate.",
    benefits: ["Executive salary", "Annual bonus", "Health & dental", "Spa treatment benefits"],
    logoImage: fourSeasonsLogo,
    bgImage:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1080&q=80",
    compatibilityScore: 90,
    experience: "6+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#0D9488", "#059669"],
    matchExplanation:
      "Very strong match. Spa director roles with real P&L ownership at a Four Seasons-caliber property are uncommon. The base salary and bonus structure are strong for this level.",
  },

  // ── The Ritz-Carlton ───────────────────────────────────────────────────
  {
    id: "41",
    title: "Guest Relations Manager",
    company: "The Ritz-Carlton",
    location: "Charlotte, NC",
    salary: "$55,000 - $70,000/year",
    type: "Full-time",
    tagline: "Turn a problem into a reason to come back.",
    description:
      "Be the primary escalation point for guest issues at the Ritz-Carlton Charlotte. You'll resolve complaints, manage VIP arrivals, and track satisfaction scores across departments.",
    highlights: [
      "Handle escalated guest issues & satisfaction recovery",
      "Manage VIP arrivals & special accommodation requests",
      "Track guest satisfaction metrics across departments",
    ],
    responsibilities: [
      "Serve as the main point of contact for escalated guest complaints",
      "Coordinate VIP arrivals and personalized welcome amenities",
      "Monitor guest satisfaction scores and identify service gaps",
      "Work with department heads on recurring guest issue trends",
      "Conduct follow-up calls with guests after complaints are resolved",
    ],
    requirements: [
      "4+ years in hotel guest services or front office management",
      "Experience with luxury brand standards",
      "Exceptional verbal and written communication",
      "Ritz-Carlton or similar ultra-luxury brand experience preferred",
    ],
    companyAbout:
      "The Ritz-Carlton is Marriott's ultra-luxury brand with properties in major cities and resort destinations worldwide. Charlotte is a growing corporate and leisure market.",
    benefits: ["Annual salary", "Health & dental", "Marriott/Ritz employee rates", "Paid time off"],
    logoImage: ritzCarltonLogo,
    bgImage:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1080&q=80",
    compatibilityScore: 87,
    experience: "4+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#1E3A5F", "#2563EB"],
    matchExplanation:
      "Strong match. Guest relations at a Ritz-Carlton builds a specific skill set that transfers well to any luxury brand. Charlotte is a market where this level of hospitality is still competitive.",
  },
  {
    id: "42",
    title: "Banquet Server",
    company: "The Ritz-Carlton",
    location: "Washington, DC",
    salary: "$18 - $25/hour + gratuities",
    type: "Full-time",
    tagline: "Service at this level is its own discipline.",
    description:
      "Deliver banquet and catering service at the Ritz-Carlton DC. Events here range from state dinners and embassy receptions to corporate galas, and the service standard is exacting.",
    highlights: [
      "Deliver white-glove banquet & catering service",
      "Set up & break down event spaces per BEO specifications",
      "Maintain Ritz-Carlton service standards throughout service",
    ],
    responsibilities: [
      "Set up banquet rooms according to BEO and room diagrams",
      "Deliver service for plated dinners, receptions, and buffets",
      "Follow white-glove service standards throughout the event",
      "Break down and reset rooms at the end of each event",
      "Communicate with banquet captain on any service issues",
    ],
    requirements: [
      "1+ year of formal banquet or fine dining service experience",
      "Professional appearance and demeanor required",
      "Ability to carry loaded trays and stand for extended periods",
      "TIPS certified or willing to obtain",
    ],
    companyAbout:
      "The Ritz-Carlton is Marriott's ultra-luxury brand. The DC property runs a high volume of diplomatic, government, and corporate events that demand true white-glove execution.",
    benefits: ["Hourly + gratuities", "Health insurance", "Flexible event scheduling", "Employee dining"],
    logoImage: ritzCarltonLogo,
    bgImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1080&q=80",
    compatibilityScore: 76,
    experience: "1+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#374151", "#4B5563"],
    matchExplanation:
      "Good fit. Ritz-Carlton banquet service is formal training in a way most hotel jobs aren't. The experience and the gratuities from high-end DC events make it worth the standards.",
  },
  {
    id: "43",
    title: "Housekeeping Manager",
    company: "The Ritz-Carlton",
    location: "Dallas, TX",
    salary: "$55,000 - $68,000/year",
    type: "Full-time",
    tagline: "Luxury lives in the details. You manage the details.",
    description:
      "Lead the housekeeping department at the Ritz-Carlton Dallas. You'll manage a team of 30+ room attendants, run daily inspection rounds, control labor costs, and uphold brand standards.",
    highlights: [
      "Manage housekeeping team of 30+ staff",
      "Conduct daily quality inspections of guest rooms",
      "Control labor & supply costs within budget",
    ],
    responsibilities: [
      "Oversee daily housekeeping operations and room assignments",
      "Conduct room inspections and coach attendants on brand standards",
      "Manage labor scheduling to meet occupancy demands",
      "Control linen, supply, and chemical budgets",
      "Handle guest complaints related to room cleanliness",
    ],
    requirements: [
      "4+ years housekeeping experience with 2+ years in management",
      "Experience with luxury hotel brand standards",
      "Strong organizational and team leadership skills",
      "Opera or similar PMS familiarity",
    ],
    companyAbout:
      "The Ritz-Carlton is Marriott's ultra-luxury brand. The Dallas property caters to a corporate and luxury leisure clientele that notices when details are off.",
    benefits: ["Annual salary", "Health & dental", "Paid time off", "Marriott employee rates"],
    logoImage: ritzCarltonLogo,
    bgImage:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1080&q=80",
    compatibilityScore: 84,
    experience: "4+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#B45309", "#D97706"],
    matchExplanation:
      "Good match. Housekeeping management at a Ritz-Carlton means working to a higher standard than most hotel brands, which translates well on a resume for future director-level roles.",
  },
  {
    id: "44",
    title: "Club Lounge Attendant",
    company: "The Ritz-Carlton",
    location: "Boston, MA",
    salary: "$20 - $26/hour",
    type: "Full-time",
    tagline: "The Club floor runs on quiet service and good instincts.",
    description:
      "Staff the Club Lounge at the Ritz-Carlton Boston, serving elite tier guests with personalized attention, curated food and beverage service, and concierge assistance throughout the day.",
    highlights: [
      "Deliver personalized F&B service in the Club Lounge",
      "Assist guests with concierge requests & reservations",
      "Maintain Club Lounge food presentations & cleanliness",
    ],
    responsibilities: [
      "Greet and serve Club Lounge guests throughout food and beverage presentations",
      "Assist guests with restaurant and activity reservations",
      "Maintain food and beverage stations according to brand standards",
      "Handle special dietary requests and preference notes",
      "Report guest feedback to Club Lounge Manager",
    ],
    requirements: [
      "2+ years in a luxury hotel or fine dining service role",
      "Genuine warmth and discretion with high-profile guests",
      "Food handler certification required",
      "Flexible availability including early mornings and evenings",
    ],
    companyAbout:
      "The Ritz-Carlton is Marriott's ultra-luxury brand. The Boston Club Lounge draws a consistent corporate traveler clientele with high expectations and specific preferences.",
    benefits: ["Hourly pay + gratuities", "Health & dental", "Paid time off", "Ritz-Carlton discounts"],
    logoImage: ritzCarltonLogo,
    bgImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1080&q=80",
    compatibilityScore: 80,
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#4C1D95", "#6D28D9"],
    matchExplanation:
      "Solid match. Club Lounge roles at Ritz-Carlton are one of the better-paying floor-level positions in luxury hospitality, and the guest volume is manageable.",
  },
  {
    id: "45",
    title: "Chef de Partie",
    company: "The Ritz-Carlton",
    location: "San Francisco, CA",
    salary: "$55,000 - $70,000/year",
    type: "Full-time",
    tagline: "Own your station. Own the plate.",
    description:
      "Run an assigned station in the Ritz-Carlton San Francisco kitchen. You'll be responsible for daily prep, line execution, and training junior cooks on your station.",
    highlights: [
      "Run assigned kitchen station during service",
      "Manage station prep, mise en place & cleanliness",
      "Train and support commis & junior cooks",
    ],
    responsibilities: [
      "Prepare and execute assigned station during all meal periods",
      "Maintain mise en place for the full shift without gaps",
      "Train commis cooks on station techniques and standards",
      "Monitor portion control and plate presentation consistency",
      "Communicate proactively with sous chef on inventory and quality issues",
    ],
    requirements: [
      "3+ years in professional kitchens, with 1+ year at CDP level",
      "Experience in fine dining or luxury hotel kitchens preferred",
      "Culinary degree or equivalent professional training",
      "ServSafe certification",
    ],
    companyAbout:
      "The Ritz-Carlton is Marriott's ultra-luxury brand. San Francisco is a competitive culinary market and the kitchen program here takes the food seriously.",
    benefits: ["Annual salary", "Health & dental", "Chef's uniform allowance", "Employee dining"],
    logoImage: ritzCarltonLogo,
    bgImage:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1080&q=80",
    compatibilityScore: 82,
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#14532D", "#16A34A"],
    matchExplanation:
      "Good match. CDP at a Ritz-Carlton in SF is strong résumé experience and the role is a realistic step toward sous chef in 2-3 years if you perform.",
  },

  // ── Station Casinos ────────────────────────────────────────────────────
  {
    id: "46",
    title: "Table Games Dealer",
    company: "Station Casinos",
    location: "Las Vegas, NV",
    salary: "$11 - $15/hour + tips",
    type: "Full-time",
    tagline: "Deal it clean. Deal it fast. Deal it every shift.",
    description:
      "Deal blackjack, craps, or roulette at one of Station Casinos' neighborhood properties. Dealer school graduates are considered, and the company has a track record of promoting from within.",
    highlights: [
      "Deal blackjack, craps or roulette",
      "Handle chip transactions & pot payouts",
      "Maintain game pace & gaming regulation compliance",
    ],
    responsibilities: [
      "Deal assigned table games accurately for each shift",
      "Handle chip buy-ins, payouts, and bet verifications",
      "Maintain game pace and enforce table minimums",
      "Identify and report any suspicious gaming activity",
      "Deliver a welcoming experience for all table guests",
    ],
    requirements: [
      "Dealer school certificate in at least one game",
      "Nevada Gaming license (or working toward it)",
      "Basic math skills and manual dexterity",
      "Availability for day, swing, and graveyard shifts",
    ],
    companyAbout:
      "Station Casinos runs neighborhood-oriented casino properties across the Las Vegas valley. They're known for hiring locally and promoting table game dealers into supervisory roles.",
    benefits: ["Health insurance", "401k plan", "Free employee meals", "Gaming privileges"],
    logoImage: stationCasinosLogo,
    bgImage:
      "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=1080&q=80",
    compatibilityScore: 75,
    experience: "N/A",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#DC2626", "#991B1B"],
    matchExplanation:
      "Good entry point. Station Casinos promotes dealers to floor supervisor regularly, and the tip income is real once you're fast and comfortable at the table.",
  },
  {
    id: "47",
    title: "Revenue Analyst",
    company: "Station Casinos",
    location: "Henderson, NV",
    salary: "$52,000 - $65,000/year",
    type: "Full-time",
    tagline: "The numbers behind every empty seat and full table.",
    description:
      "Analyze gaming and hotel revenue data across the Station Casinos portfolio. You'll build reports, identify trends, and support pricing decisions for both the hotel and gaming floors.",
    highlights: [
      "Analyze gaming & hotel revenue data",
      "Build weekly and monthly performance reports",
      "Support pricing decisions with trend analysis",
    ],
    responsibilities: [
      "Pull and analyze daily gaming revenue and hotel occupancy data",
      "Identify trends and anomalies in gaming floor and hotel performance",
      "Build reports and dashboards for department heads",
      "Support revenue management decisions with historical data",
      "Collaborate with marketing on player development metrics",
    ],
    requirements: [
      "2+ years in data analysis or revenue analytics",
      "Proficiency with Excel, SQL, or similar tools",
      "Familiarity with casino or hotel revenue structures preferred",
      "Degree in finance, business, or related field",
    ],
    companyAbout:
      "Station Casinos runs a portfolio of properties across the greater Las Vegas area. The analytics team here works with a unique data set that spans gaming, hotel, F&B, and loyalty programs.",
    benefits: ["Annual salary", "Health & dental", "401k matching", "Paid time off"],
    logoImage: stationCasinosLogo,
    bgImage:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1080&q=80",
    compatibilityScore: 81,
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "Hybrid",
    gradient: ["#0369A1", "#075985"],
    matchExplanation:
      "Good match. Casino revenue analytics is a specialized area and the experience here translates to more senior roles in gaming, hospitality, or general data analytics.",
  },
  {
    id: "48",
    title: "Human Resources Manager",
    company: "Station Casinos",
    location: "Las Vegas, NV",
    salary: "$65,000 - $80,000/year",
    type: "Full-time",
    tagline: "3,000 employees. You're the one who keeps things running.",
    description:
      "Manage HR operations for a Station Casinos property. You'll handle employee relations, benefits administration, compliance, and work closely with department heads on workforce planning.",
    highlights: [
      "Manage employee relations & investigations",
      "Oversee HR compliance & Nevada gaming regulations",
      "Partner with department heads on staffing & retention",
    ],
    responsibilities: [
      "Handle employee relations issues, investigations, and disciplinary processes",
      "Manage benefits enrollment, leave administration, and worker's comp",
      "Ensure compliance with Nevada gaming employment regulations",
      "Partner with department heads on job postings, interviews, and onboarding",
      "Produce HR reporting and metrics for senior leadership",
    ],
    requirements: [
      "5+ years in HR management, preferably in hospitality or gaming",
      "SHRM-CP or PHR certification preferred",
      "Strong knowledge of Nevada labor and gaming employment law",
      "Experience managing HR for 500+ employee organizations",
    ],
    companyAbout:
      "Station Casinos employs thousands of people across its Las Vegas properties. The HR team here works with a workforce that spans 24/7 operations, union and non-union employees, and gaming regulations.",
    benefits: ["Annual salary + bonus", "Health & dental", "401k", "Employee gaming benefits"],
    logoImage: stationCasinosLogo,
    bgImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1080&q=80",
    compatibilityScore: 86,
    experience: "5+ Years",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#7C3AED", "#6D28D9"],
    matchExplanation:
      "Strong match. HR management in a large casino operation involves more complexity than most industries, and Station Casinos tends to value people who can operate in that environment long-term.",
  },
  {
    id: "49",
    title: "Marketing Coordinator",
    company: "Station Casinos",
    location: "Las Vegas, NV",
    salary: "$42,000 - $55,000/year",
    type: "Full-time",
    tagline: "Move the marketing needle for a property people love.",
    description:
      "Support the marketing team at Station Casinos with campaign execution, player development promotions, direct mail, and social media content. A good starting role in gaming marketing.",
    highlights: [
      "Execute direct mail & email marketing campaigns",
      "Support player development promotions & events",
      "Manage social media content calendar",
    ],
    responsibilities: [
      "Assist with planning and executing promotional campaigns",
      "Coordinate direct mail production and player database segmentation",
      "Create and schedule social media posts for assigned property",
      "Support on-site promotional events and activations",
      "Track campaign performance and compile post-campaign reports",
    ],
    requirements: [
      "1-2 years in a marketing coordinator or similar role",
      "Experience with email marketing platforms and social media tools",
      "Strong written communication skills",
      "Interest in casino marketing or loyalty programs a plus",
    ],
    companyAbout:
      "Station Casinos runs neighborhood-oriented casino properties across the Las Vegas valley. The marketing program here is centered on player loyalty and direct relationships with local guests.",
    benefits: ["Annual salary", "Health & dental", "401k", "Event and gaming perks"],
    logoImage: stationCasinosLogo,
    bgImage:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1080&q=80",
    compatibilityScore: 74,
    experience: "1+ Years",
    schedule: "Full-Time",
    workType: "Hybrid",
    gradient: ["#059669", "#047857"],
    matchExplanation:
      "Decent starting point. Casino marketing runs on loyalty program mechanics that are genuinely useful to learn and not something you'd get in most other marketing roles.",
  },
  {
    id: "50",
    title: "Surveillance Officer",
    company: "Station Casinos",
    location: "Las Vegas, NV",
    salary: "$22 - $28/hour",
    type: "Full-time",
    tagline: "You see everything they think you don't see.",
    description:
      "Monitor gaming floors, hotel areas, and property perimeters via CCTV at a Station Casinos property. You'll identify suspicious activity, write detailed incident reports, and coordinate with floor teams.",
    highlights: [
      "Monitor CCTV systems across gaming & hotel areas",
      "Identify gaming irregularities & suspicious behavior",
      "Write detailed incident & investigation reports",
    ],
    responsibilities: [
      "Monitor live CCTV feeds across all property areas throughout each shift",
      "Identify gaming irregularities, cheating attempts, and suspicious activity",
      "Document observations and write detailed surveillance reports",
      "Communicate with floor supervisors and security on active incidents",
      "Review recorded footage for ongoing investigations",
    ],
    requirements: [
      "Nevada Gaming Control Board surveillance registration",
      "Experience with casino surveillance systems preferred",
      "Strong attention to detail and written reporting skills",
      "Ability to sit and maintain focus for extended monitoring periods",
      "Clean background check required",
    ],
    companyAbout:
      "Station Casinos runs a portfolio of properties across the Las Vegas valley. The surveillance team operates independently from security and reports directly to the gaming control structure.",
    benefits: ["Health & dental", "Shift differential pay", "401k", "Tuition assistance"],
    logoImage: stationCasinosLogo,
    bgImage:
      "https://images.unsplash.com/photo-1767395523614-53f52709c37a?w=1080&q=80",
    compatibilityScore: 79,
    experience: "N/A",
    schedule: "Full-Time",
    workType: "On-Site",
    gradient: ["#1F2937", "#111827"],
    matchExplanation:
      "Good fit. Surveillance is one of the more technical entry points in the gaming industry and the skill set transfers well across properties and markets.",
  },
];
