# Lynq App (Mobile)

Swipe-style job discovery app for candidates. Expo/React Native + Supabase.

---

## Stack

- **Framework:** Expo SDK 54, React Native 0.81, React 19, TypeScript 5 (strict)
- **Navigation:** React Navigation 7 (bottom tabs + native stack)
- **Backend:** Supabase (Auth, PostgreSQL) via @supabase/supabase-js
- **Persistence:** Supabase (signed-in) / AsyncStorage (offline/anonymous) with auto-migration
- **Styling:** React Native StyleSheet, `expo-linear-gradient`
- **Build:** EAS Build (development, preview, production channels)
- **Package manager:** npm

---

## Project Structure

```
App.tsx                  # Root: SafeAreaProvider → AuthProvider → NavigationContainer → RootNavigator
src/
  constants/
    theme.ts             # Design tokens: colors (dark/light), spacing, radius, typography, shadows, animation
    gradients.ts         # Gradient presets for LinearGradient (screen, auth, card, accent, etc.)
  types/models.ts        # Job, ChatMessage interfaces
  lib/supabase.ts        # Supabase client init (auth, db)
  context/
    AuthContext.tsx       # AuthProvider + useAuth() — user, uid, signIn, register, signOut
    SavedJobsContext.tsx  # SavedJobsProvider + useSavedJobs() — Supabase ↔ AsyncStorage sync
  hooks/
    useJobs.ts           # Fetches jobs from Supabase, falls back to static data
    useProfile.ts        # User profile CRUD against Supabase app_users table
  data/
    jobs.ts              # Static seed jobs (Caesars Entertainment)
    chat.ts              # Static chat data
    profile.ts           # Default profile
  screens/
    DiscoverScreen.tsx   # Swipe-style vertical-paging job feed + story circles
    MatchesScreen.tsx    # Matched jobs
    ChatScreen.tsx       # Chat list
    SavedScreen.tsx      # Saved jobs
    ProfileScreen.tsx    # User profile
    LoginScreen.tsx      # Email/password login
    RegisterScreen.tsx   # Email/password registration
  components/
    JobCard.tsx          # Full-screen job card with gradient overlay
    StoryHeader.tsx      # Instagram-style story circles at top of Discover
    StoryViewModal.tsx   # Full-screen story viewer modal
    BottomTabBar.tsx     # Custom bottom tab bar
  navigation/
    AppNavigator.tsx     # Bottom tabs: Discover, Matches, Chat, Profile
    AuthNavigator.tsx    # Stack: Login, Register
  utils/math.ts         # clamp() utility
```

---

## Navigation

- **Auth flow:** `AuthNavigator` (Login → Register) shown when `user` is null
- **Main flow:** `AppNavigator` bottom tabs — Discover | Matches | Chat | Profile
- Tab param list: `RootTabParamList` in `AppNavigator.tsx`
- Auth stack param list: `AuthStackParamList` in `AuthNavigator.tsx`

---

## Data Flow

- `useAuth()` provides `user`, `uid`, `loading`, `signIn`, `register`, `signOut`
- All data hooks gate on `uid` from `useAuth()`
- `useJobs()` fetches from Supabase `jobs` table, falls back to `src/data/jobs.ts`
- `useProfile(uid)` reads/writes `app_users` table in Supabase (filtered by uid)
- `useSavedJobs()` syncs `saved_jobs` table in Supabase ↔ AsyncStorage with migration

---

## PostgreSQL Tables

```
app_users (id, uid, ...)        # User profiles (RLS: owner only)
jobs (id, ...)                  # Job listings (RLS: read authenticated, write admin only)
saved_jobs (id, user_id, job_id, ...)  # Saved job references (RLS: owner only)
```

---

## Design System

**All color values, spacing, and radii MUST match `../DESIGN_SYSTEM.md` — the single source of truth across all Lynq projects.** When adding or changing any design token, update DESIGN_SYSTEM.md first, then update the platform-specific theme file.

### Key Design Rules (from Kinetic Fluidity Framework)

- **No 1px borders for sectioning** — use surface color shifts for depth
- **No sharp corners** — minimum radius is 16px (`ROUND_SIXTEEN`)
- **No flat colors on CTAs** — use gradient (`primary` to `primary-container` at 135deg)
- **No 100% black text** — use `on-surface` (`#171D1E`)
- **Generous whitespace** — asymmetrical spacing creates editorial energy

### Mobile-Specific Implementation

- **Theme file:** `src/constants/theme.ts` — must be updated to match DESIGN_SYSTEM.md tokens
- **Gradients:** `src/constants/gradients.ts` — `screenGradient`, `accentGradient`, `cardScrim`, etc.
- **Font:** Plus Jakarta Sans (loaded via `expo-font`) — replaces system fonts
- **Font scaling:** `getFontScale(width)` — responsive to screen width, clamped 0.85x-1.25x
- **Elevation:** Use tonal layering (surface hierarchy) over traditional shadows
- **Glass surfaces:** `colors.glass`, `colors.glassBorder`, `colors.glassHeavy` for translucent overlays
- **Animation:** `animation.*` constants for spring configs and durations
- **Icons:** Ionicons via `@expo/vector-icons` — outline for info, filled for active states

---

## Environment Variables

All prefixed `EXPO_PUBLIC_*` (inlined at build time):

```
EXPO_PUBLIC_SUPABASE_URL
EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY
```

Copy `.env.example` to `.env` and restart with `npx expo start -c`.

---

## Commands

```bash
npm start              # expo start
npm run start:tunnel   # expo start --tunnel (for physical devices on different networks)
npm run android        # expo run:android
npm run ios            # expo run:ios
npm run web            # expo start --web
npm run typecheck      # tsc --noEmit
```

---

## Code Conventions

- **Immutability:** Always create new objects/arrays, never mutate
- **File size:** 200–400 lines typical, 800 max
- **Functions:** Under 50 lines
- **Styling:** `StyleSheet.create()` at bottom of file, use theme constants for all values
- **Supabase access:** Use the shared Supabase client from `src/lib/supabase.ts`
- **Error handling:** Handle explicitly; UI-facing errors get user-friendly messages
- **No hardcoded values:** Use theme constants, env vars, or config objects
- **Hook pattern:** Custom hooks return `{ data, loading, error }` tuples

---

## Git

Commit format: `<type>: <description>` (feat, fix, refactor, docs, test, chore, perf, ci)

---

## Lynq Vault Sync (MANDATORY)

After completing work that changes feature status, adds new features, modifies data structures, or changes system connections, **update the Obsidian vault** at `/Users/orimizrachi/Documents/Obsidian Vault/Lynq/`.

### What to update

| Change Type | Files to Update |
|-------------|----------------|
| Feature added/completed | `App/App - Features.md` (status table) |
| Screen added/modified | `App/App - Screens & Navigation.md` |
| New data type or field | `Data Structures/Data - App Types.md` |
| Database schema changed | `Data Structures/Data - Database Schema.md` |
| New connection to backoffice working | `System Map/Feature Relationship Map.md` (connection strength), `System Map/lynq-system-chart.html` (update status badges/colors) |
| Broken connection fixed | `System Map/Feature Relationship Map.md`, `System Map/System Connection Map.md` |
| Stories system changed | `App/App - Stories System.md` |
| Product decision made | `Product/Product - Decisions Log.md` |
| Roadmap item completed | `Product/Product - Roadmap & Phases.md` (check off item) |

### How to update the HTML chart

In `System Map/lynq-system-chart.html`:
- Change `tag-ui` (red) to `tag-done` (green) when a UI-only feature gets backend wiring
- Change `conn-broken` to `conn-strong` and `status-broken` to `status-working` when a cross-system connection is established
- Change `li.planned` to `li.active` in data flow pipelines when a step is implemented
