# Lynq App (Mobile)

Swipe-style job discovery app for candidates. Expo/React Native + Firebase.

---

## Stack

- **Framework:** Expo SDK 54, React Native 0.81, React 19, TypeScript 5 (strict)
- **Navigation:** React Navigation 7 (bottom tabs + native stack)
- **Backend:** Firebase (Auth, Firestore) via JS SDK v11
- **Persistence:** Firestore (signed-in) / AsyncStorage (offline/anonymous) with auto-migration
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
  lib/firebase.ts        # Firebase init (app, auth, db) + isFirestoreAvailable() guard
  context/
    AuthContext.tsx       # AuthProvider + useAuth() — user, uid, signIn, register, signOut
    SavedJobsContext.tsx  # SavedJobsProvider + useSavedJobs() — Firestore ↔ AsyncStorage sync
  hooks/
    useJobs.ts           # Fetches jobs from Firestore, falls back to static data
    useProfile.ts        # User profile CRUD against Firestore users/{uid}
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
- `useJobs()` fetches from Firestore `jobs` collection, falls back to `src/data/jobs.ts`
- `useProfile(uid)` reads/writes `users/{uid}` in Firestore
- `useSavedJobs()` syncs `users/{uid}/savedJobs` subcollection ↔ AsyncStorage with migration

---

## Firestore Schema

```
jobs/{jobId}                    # Job documents (read: authenticated, write: admin only)
users/{uid}                     # User profile (read/write: owner only)
  savedJobs/{jobId}             # Saved job refs (read/write: owner only)
  chats/{chatId}                # Chat threads (phase 2)
    messages/{messageId}        # Chat messages (phase 2)
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
EXPO_PUBLIC_FIREBASE_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
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
- **Firestore access:** Always guard with `isFirestoreAvailable(db)` before using `db`
- **Error handling:** Handle explicitly; UI-facing errors get user-friendly messages
- **No hardcoded values:** Use theme constants, env vars, or config objects
- **Hook pattern:** Custom hooks return `{ data, loading, error }` tuples

---

## Git

Commit format: `<type>: <description>` (feat, fix, refactor, docs, test, chore, perf, ci)
