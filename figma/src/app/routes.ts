import { createBrowserRouter } from "react-router";
import { TikTok } from "./pages/TikTok";
import { TikTokStory } from "./pages/TikTokStory";
import { TikTokStoryFull } from "./pages/TikTokStoryFull";
import { Profile } from "./pages/Profile";
import { Matches } from "./pages/Matches";
import { Saved } from "./pages/Saved";
import { Chat } from "./pages/Chat";

export const router = createBrowserRouter([
  { path: "/", Component: TikTokStoryFull },
  { path: "/story", Component: TikTokStory },
  { path: "/profile", Component: Profile },
  { path: "/matches", Component: Matches },
  { path: "/saved", Component: Saved },
  { path: "/chat", Component: Chat },
]);