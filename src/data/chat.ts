import { ChatMessage } from "../types/models";

export const chats: ChatMessage[] = [
  {
    id: "1",
    jobId: "1",
    sender: "קפה קפה",
    text: "שמחנו לראות את הפרופיל שלך! מתי תהיה/י פנוי/ה לשיחה קצרה?",
    timestamp: "לפני 2 דקות",
    unread: true,
  },
  {
    id: "2",
    jobId: "2",
    sender: "בר הצפון",
    text: "היי, ראינו את הפרופיל שלך ונשמח לדבר על המשרה. יש לך זמן השבוע?",
    timestamp: "לפני שעה",
    unread: true,
  },
  {
    id: "3",
    jobId: "3",
    sender: "רמי לוי",
    text: "המועמדות שלך עברה לשלב הבא. אפשר לקבוע ראיון?",
    timestamp: "לפני 3 שעות",
  },
  {
    id: "4",
    jobId: "4",
    sender: "לחמים",
    text: "פרופיל מצוין! בואו נדבר על המשרה ועל השעות שמתאימות לך.",
    timestamp: "לפני יום",
  },
  {
    id: "5",
    jobId: "5",
    sender: "אבו חסן",
    text: "אנחנו חושבים שתתאים/י מצוין למטבח שלנו. מתי אפשר לדבר?",
    timestamp: "לפני יומיים",
  },
];
