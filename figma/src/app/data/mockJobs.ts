import { caesarsLogo } from "./caesarsLogo";

export interface BenefitItem {
  icon: string; // Lucide icon name
  label: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  benefits: string[];
  benefitItems: BenefitItem[];
  logo: string;
  color: string;
  logoImage?: string;
  bgImage?: string;
  compatibilityScore: number; // 0-100
  responseTime: string; // e.g., "12hr", "2 days", "1 week"
  experience: string; // e.g., "5+ Years"
  schedule: string; // e.g., "Full-Time"
  workType: string; // e.g., "On-Site", "Remote", "Hybrid"
}

export const mockJobs: Job[] = [
  {
    id: "1",
    title: "Casino Floor Supervisor",
    company: "Caesars Entertainment",
    location: "Las Vegas, NV",
    salary: "$28 - $35/hour",
    type: "Full-time",
    description: "Lead and supervise gaming operations on the casino floor. Ensure exceptional guest experiences while maintaining strict gaming regulations and security standards.",
    requirements: ["3+ years casino floor experience", "Gaming license required", "Strong leadership skills"],
    benefits: ["Health insurance", "401k matching", "Employee gaming privileges", "Hotel discounts"],
    benefitItems: [
      { icon: "heart", label: "Health insurance" },
      { icon: "dollar-sign", label: "401k matching" },
      { icon: "chip", label: "Employee gaming privileges" },
      { icon: "home", label: "Hotel discounts" }
    ],
    logoImage: caesarsLogo,
    bgImage: "https://images.unsplash.com/photo-1764815643474-dc6a32b6021d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNpbm8lMjBzbG90JTIwbWFjaGluZXMlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NzExOTQ3Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "🎰",
    color: "from-red-600 to-amber-600",
    compatibilityScore: 85,
    responseTime: "12hr",
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "On-Site"
  },
  {
    id: "2",
    title: "Hotel Front Desk Manager",
    company: "Caesars Entertainment",
    location: "Atlantic City, NJ",
    salary: "$24 - $30/hour",
    type: "Full-time",
    description: "Oversee front desk operations and lead a team providing world-class hospitality. Handle VIP guest relations and ensure seamless check-in experiences.",
    requirements: ["5+ years hotel management", "Excellent communication skills", "Fluent in multiple languages preferred"],
    benefits: ["Health & dental insurance", "Paid vacation", "Free meals", "Career advancement"],
    benefitItems: [
      { icon: "heart", label: "Health & dental insurance" },
      { icon: "calendar", label: "Paid vacation" },
      { icon: "coffee", label: "Free meals" },
      { icon: "briefcase", label: "Career advancement" }
    ],
    logoImage: caesarsLogo,
    bgImage: "https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlY2VwdGlvbiUyMGRlc2slMjBtb2Rlcm58ZW58MXx8fHwxNzcxMTk0NzcxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "🏨",
    color: "from-blue-600 to-indigo-600",
    compatibilityScore: 90,
    responseTime: "2 days",
    experience: "5+ Years",
    schedule: "Full-Time",
    workType: "On-Site"
  },
  {
    id: "3",
    title: "Fine Dining Server",
    company: "Caesars Entertainment",
    location: "Las Vegas, NV",
    salary: "$15 - $20/hour + tips",
    type: "Full-time",
    description: "Provide exceptional service in our award-winning restaurants. Demonstrate extensive menu and wine knowledge while delivering personalized service.",
    requirements: ["2+ years fine dining experience", "Wine knowledge", "Professional appearance"],
    benefits: ["Flexible schedules", "Employee meals", "Health coverage", "Tip pooling"],
    benefitItems: [
      { icon: "clock", label: "Flexible schedules" },
      { icon: "coffee", label: "Employee meals" },
      { icon: "heart", label: "Health coverage" },
      { icon: "dollar-sign", label: "Tip pooling" }
    ],
    logoImage: caesarsLogo,
    bgImage: "https://images.unsplash.com/photo-1761095596849-608b6a337c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzcxMTA1NTUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "🍽️",
    color: "from-purple-600 to-pink-600",
    compatibilityScore: 75,
    responseTime: "1 week",
    experience: "2+ Years",
    schedule: "Full-Time",
    workType: "On-Site"
  },
  {
    id: "4",
    title: "Security Officer",
    company: "Caesars Entertainment",
    location: "New Orleans, LA",
    salary: "$22 - $28/hour",
    type: "Full-time",
    description: "Maintain a safe and secure environment for guests and staff. Monitor surveillance systems and respond to incidents professionally.",
    requirements: ["Security license required", "Former law enforcement preferred", "Excellent observation skills"],
    benefits: ["Comprehensive insurance", "Retirement plan", "Shift differentials", "Tuition reimbursement"],
    benefitItems: [
      { icon: "heart", label: "Comprehensive insurance" },
      { icon: "dollar-sign", label: "Retirement plan" },
      { icon: "clock", label: "Shift differentials" },
      { icon: "book", label: "Tuition reimbursement" }
    ],
    logoImage: caesarsLogo,
    bgImage: "https://images.unsplash.com/photo-1767395523614-53f52709c37a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMGxvYmJ5JTIwY2hhbmRlbGllcnxlbnwxfHx8fDE3NzExNTkyNTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "🛡️",
    color: "from-gray-700 to-gray-900",
    compatibilityScore: 80,
    responseTime: "12hr",
    experience: "N/A",
    schedule: "Full-Time",
    workType: "On-Site"
  },
  {
    id: "5",
    title: "VIP Casino Host",
    company: "Caesars Entertainment",
    location: "Las Vegas, NV",
    salary: "$35 - $45/hour",
    type: "Full-time",
    description: "Build relationships with high-value guests as their personal concierge. Arrange luxury accommodations, show tickets, and exclusive experiences.",
    requirements: ["5+ years hospitality/casino experience", "Exceptional interpersonal skills", "Sales background preferred"],
    benefits: ["Commission opportunities", "Premium benefits", "Travel perks", "Networking events"],
    benefitItems: [
      { icon: "dollar-sign", label: "Commission opportunities" },
      { icon: "star", label: "Premium benefits" },
      { icon: "airplane", label: "Travel perks" },
      { icon: "users", label: "Networking events" }
    ],
    logoImage: caesarsLogo,
    bgImage: "https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHN1aXRlJTIwbHV4dXJ5JTIwYmVkcm9vbXxlbnwxfHx8fDE3NzExOTQ3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "👔",
    color: "from-amber-600 to-yellow-500",
    compatibilityScore: 95,
    responseTime: "2 days",
    experience: "5+ Years",
    schedule: "Full-Time",
    workType: "On-Site"
  },
  {
    id: "6",
    title: "Poker Dealer",
    company: "Caesars Entertainment",
    location: "Las Vegas, NV",
    salary: "$12 - $16/hour + tips",
    type: "Full-time",
    description: "Deal professional poker games in our premier poker room. Manage game flow, handle chips, and create an exciting atmosphere for players.",
    requirements: ["Dealer school certification", "Knowledge of poker rules", "Quick math skills"],
    benefits: ["Excellent tips", "Flexible shifts", "Free parking", "Employee discounts"],
    benefitItems: [
      { icon: "dollar-sign", label: "Excellent tips" },
      { icon: "clock", label: "Flexible shifts" },
      { icon: "car", label: "Free parking" },
      { icon: "tag", label: "Employee discounts" }
    ],
    logoImage: caesarsLogo,
    bgImage: "https://images.unsplash.com/photo-1719228159189-148c8c45e634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2tlciUyMHRhYmxlJTIwY2FzaW5vJTIwY2hpcHN8ZW58MXx8fHwxNzcxMTk0NzY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "🃏",
    color: "from-red-600 to-red-800",
    compatibilityScore: 70,
    responseTime: "1 week",
    experience: "N/A",
    schedule: "Full-Time",
    workType: "On-Site"
  },
  {
    id: "7",
    title: "Housekeeping Supervisor",
    company: "Caesars Entertainment",
    location: "Lake Tahoe, NV",
    salary: "$20 - $26/hour",
    type: "Full-time",
    description: "Lead housekeeping team to maintain immaculate guest rooms and public areas. Ensure highest standards of cleanliness and guest satisfaction.",
    requirements: ["3+ years supervisory experience", "Attention to detail", "Bilingual a plus"],
    benefits: ["Health benefits", "Paid time off", "Resort amenities access", "Growth opportunities"],
    benefitItems: [
      { icon: "heart", label: "Health benefits" },
      { icon: "calendar", label: "Paid time off" },
      { icon: "home", label: "Resort amenities access" },
      { icon: "briefcase", label: "Growth opportunities" }
    ],
    logoImage: caesarsLogo,
    bgImage: "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?w=800",
    logo: "🧹",
    color: "from-teal-600 to-cyan-600",
    compatibilityScore: 85,
    responseTime: "12hr",
    experience: "3+ Years",
    schedule: "Full-Time",
    workType: "On-Site"
  },
  {
    id: "8",
    title: "Event Coordinator",
    company: "Caesars Entertainment",
    location: "Las Vegas, NV",
    salary: "$26 - $34/hour",
    type: "Full-time",
    description: "Plan and execute spectacular events, conventions, and private parties. Coordinate with clients to create unforgettable experiences.",
    requirements: ["Event planning experience", "Project management skills", "Creative problem solver"],
    benefits: ["Creative environment", "Event perks", "Full benefits package", "Professional development"],
    benefitItems: [
      { icon: "star", label: "Creative environment" },
      { icon: "gift", label: "Event perks" },
      { icon: "briefcase", label: "Full benefits package" },
      { icon: "book", label: "Professional development" }
    ],
    logoImage: caesarsLogo,
    bgImage: "https://images.unsplash.com/photo-1761207299315-e92ba75b0b79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldmVudCUyMHZlbnVlJTIwcGFydHklMjBsaWdodHN8ZW58MXx8fHwxNzcxMTk0NzcwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "🎉",
    color: "from-violet-600 to-purple-600",
    compatibilityScore: 90,
    responseTime: "2 days",
    experience: "N/A",
    schedule: "Full-Time",
    workType: "On-Site"
  },
  {
    id: "9",
    title: "Slot Technician",
    company: "Caesars Entertainment",
    location: "Reno, NV",
    salary: "$25 - $32/hour",
    type: "Full-time",
    description: "Maintain and repair slot machines and gaming equipment. Troubleshoot technical issues and ensure all machines operate at peak performance.",
    requirements: ["Electronics or technical certification", "Problem-solving skills", "Mechanical aptitude"],
    benefits: ["Technical training", "Tool allowance", "Comprehensive insurance", "Overtime opportunities"],
    benefitItems: [
      { icon: "book", label: "Technical training" },
      { icon: "tools", label: "Tool allowance" },
      { icon: "heart", label: "Comprehensive insurance" },
      { icon: "clock", label: "Overtime opportunities" }
    ],
    logoImage: caesarsLogo,
    bgImage: "https://images.unsplash.com/photo-1592602944193-0848995f4b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXNpbm8lMjByb3VsZXR0ZSUyMHdoZWVsJTIwZ2FtaW5nfGVufDF8fHx8MTc3MTE5NDc3MHww&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "🔧",
    color: "from-orange-600 to-red-600",
    compatibilityScore: 80,
    responseTime: "12hr",
    experience: "N/A",
    schedule: "Full-Time",
    workType: "On-Site"
  },
  {
    id: "10",
    title: "Premium Bar Bartender",
    company: "Caesars Entertainment",
    location: "Las Vegas, NV",
    salary: "$14 - $18/hour + tips",
    type: "Full-time",
    description: "Craft exceptional cocktails in our upscale bars and lounges. Provide outstanding service and create a vibrant atmosphere for guests.",
    requirements: ["Mixology experience", "TIPS certification", "High-energy personality"],
    benefits: ["Excellent tips", "Late-night shifts available", "Employee discounts", "Bartending competitions"],
    benefitItems: [
      { icon: "dollar-sign", label: "Excellent tips" },
      { icon: "clock", label: "Late-night shifts available" },
      { icon: "tag", label: "Employee discounts" },
      { icon: "gift", label: "Bartending competitions" }
    ],
    logoImage: caesarsLogo,
    bgImage: "https://images.unsplash.com/photo-1698054239930-1a96f42f87da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NrdGFpbCUyMGJhciUyMG1peG9sb2d5JTIwZHJpbmtzfGVufDF8fHx8MTc3MTE5NDc3MHww&ixlib=rb-4.1.0&q=80&w=1080",
    logo: "🍸",
    color: "from-pink-600 to-rose-600",
    compatibilityScore: 75,
    responseTime: "1 week",
    experience: "N/A",
    schedule: "Full-Time",
    workType: "On-Site"
  }
];