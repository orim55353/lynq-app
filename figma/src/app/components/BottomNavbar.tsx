import { Link, useLocation } from "react-router";
import { Home, Heart, MessageCircle, User } from "lucide-react";

export function BottomNavbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Discover", icon: Home },
    { path: "/matches", label: "Matches", icon: Heart },
    { path: "/chat", label: "Chat", icon: MessageCircle },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-6 px-4">
      <div className="bg-white/80 backdrop-blur-xl rounded-full shadow-2xl border border-gray-200/50 max-w-md mx-auto">
        <div className="flex items-center justify-around px-2 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-0.5 px-1.5 py-1.5 rounded-2xl transition-all group relative"
              >
                <div
                  className={`p-0 rounded-full transition-all transform ${
                    isActive
                      ? "scale-110"
                      : "group-hover:scale-105"
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 transition-colors ${
                      isActive
                        ? "text-purple-500"
                        : "text-gray-600 group-hover:text-gray-900"
                    }`}
                    style={
                      isActive
                        ? {
                            filter: "drop-shadow(0 0 8px rgba(168, 85, 247, 0.6))",
                          }
                        : undefined
                    }
                  />
                </div>
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isActive
                      ? "text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
                      : "text-gray-600 group-hover:text-gray-900"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}