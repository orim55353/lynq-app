import { ChatMessage } from "../types/models";

export const chats: ChatMessage[] = [
  {
    id: "1",
    sender: "Google",
    text: "תודה על ההתעניינות! מתי תהיו זמינים לשיחה?",
    timestamp: "לפני 2 דקות",
    unread: true,
  },
  {
    id: "2",
    sender: "Apple",
    text: "נשמח לדבר איתכם על משרת מהנדס בכיר.",
    timestamp: "לפני שעה",
    unread: true,
  },
  {
    id: "3",
    sender: "Microsoft",
    text: "המועמדות שלכם נבדקה. אפשר לקבוע שיחה?",
    timestamp: "לפני 3 שעות",
  },
  {
    id: "4",
    sender: "Amazon",
    text: "פרופיל מעולה! בואו נדבר על הזדמנויות ב-AWS.",
    timestamp: "לפני יום",
  },
  {
    id: "5",
    sender: "Meta",
    text: "אנחנו חושבים שתתאימו מצוין לצוות שלנו!",
    timestamp: "לפני יומיים",
  },
];
