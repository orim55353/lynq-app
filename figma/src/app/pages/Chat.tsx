import { useState } from "react";
import { Send, Search } from "lucide-react";
import { BottomNavbar } from "../components/BottomNavbar";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
  unread?: boolean;
}

const mockChats: Message[] = [
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

export function Chat() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In a real app, this would send the message
      alert(`Sending message: ${messageText}`);
      setMessageText("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 pb-24">
      <BottomNavbar />

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Messages
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Chat with companies you've matched with
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-5 h-[600px]">
            {/* Chat List */}
            <div className="md:col-span-2 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
              {/* Search */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-full text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>

              {/* Chat items */}
              <div>
                {mockChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChat(chat.id)}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors border-b border-gray-100 dark:border-gray-700/50 ${
                      selectedChat === chat.id
                        ? "bg-purple-50 dark:bg-purple-900/20"
                        : ""
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold flex-shrink-0">
                      {chat.sender[0]}
                    </div>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white truncate">
                          {chat.sender}
                        </h3>
                        <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                        {chat.text}
                      </p>
                    </div>
                    {chat.unread && (
                      <div className="w-2 h-2 rounded-full bg-purple-500 flex-shrink-0 mt-2"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Window */}
            <div className="md:col-span-3 flex flex-col">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {mockChats.find((c) => c.id === selectedChat)?.sender[0]}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {mockChats.find((c) => c.id === selectedChat)?.sender}
                        </h3>
                        <p className="text-xs text-green-600 dark:text-green-400">
                          Active now
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900/50">
                    <div className="space-y-4">
                      <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-tl-none px-4 py-2 max-w-xs shadow">
                          <p className="text-gray-900 dark:text-white">
                            {mockChats.find((c) => c.id === selectedChat)?.text}
                          </p>
                          <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                            {mockChats.find((c) => c.id === selectedChat)?.timestamp}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-700 border-0 rounded-full text-gray-900 dark:text-white placeholder:text-gray-500 focus:ring-2 focus:ring-purple-500 outline-none"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center hover:shadow-lg active:scale-95 transition-all"
                      >
                        <Send className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  Select a chat to start messaging
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}