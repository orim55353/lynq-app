/**
 * Shared match score utilities.
 * Used by JobCard, ExpandedJobCard, and MatchScoreRing.
 */

export function matchColor(score: number): string {
  if (score >= 80) return "#22C55E";
  if (score >= 60) return "#F59E0B";
  return "#94A3B8";
}

export function matchLabel(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Strong";
  if (score >= 60) return "Good";
  return "Fair";
}

export function matchLabelFull(score: number): string {
  return `${matchLabel(score)} Match`;
}

export function matchDescription(score: number): string {
  if (score >= 90) return "Your profile is an exceptional fit for this role.";
  if (score >= 80) return "Your skills and experience align well with this role.";
  if (score >= 60) return "You meet several key qualifications for this position.";
  return "This role could be a stretch, but worth exploring.";
}
