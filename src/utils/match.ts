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
  if (score >= 90) return "מצוין";
  if (score >= 80) return "חזק";
  if (score >= 60) return "טוב";
  return "סביר";
}

export function matchLabelFull(score: number): string {
  return `התאמה ${matchLabel(score)}`;
}

export function matchDescription(score: number): string {
  if (score >= 90) return "הפרופיל שלכם מתאים בצורה יוצאת דופן לתפקיד הזה.";
  if (score >= 80) return "הכישורים והניסיון שלכם מתאימים היטב לתפקיד הזה.";
  if (score >= 60) return "אתם עומדים בכמה מהדרישות המרכזיות למשרה הזו.";
  return "התפקיד הזה יכול להיות אתגר, אבל שווה לבדוק.";
}
