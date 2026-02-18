import { ChatMessage } from "../types/models";

export const chats: ChatMessage[] = [
  {
    id: "1",
    sender: "Google",
    text: "Thanks for your interest! When would you be available for a chat?",
    timestamp: "2m ago",
    unread: true,
  },
  {
    id: "2",
    sender: "Apple",
    text: "We'd love to discuss the Senior Engineer position with you.",
    timestamp: "1h ago",
    unread: true,
  },
  {
    id: "3",
    sender: "Microsoft",
    text: "Your application has been reviewed. Can we schedule a call?",
    timestamp: "3h ago",
  },
  {
    id: "4",
    sender: "Amazon",
    text: "Great profile! Let's connect about opportunities at AWS.",
    timestamp: "1d ago",
  },
  {
    id: "5",
    sender: "Meta",
    text: "We think you'd be a great fit for our team!",
    timestamp: "2d ago",
  },
];
