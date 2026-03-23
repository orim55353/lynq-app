# PRD: Onboarding Flow

**Priority:** P0
**Phase:** 2 — Close the Loop
**Status:** Draft
**Created:** 2026-03-23

---

## Problem Statement

When a user registers in the Lynq app, a Supabase Auth user is created but no `app_users` row exists in PostgreSQL. Every feature depending on `app_users` (saved jobs, profile, future apply flow, match scoring) silently fails until the user manually visits the Profile tab. There is no onboarding experience — users go straight from registration to the job feed with zero profile data, resulting in poor match quality and broken core features.

This is a **blocking issue** for Phase 2 (Close the Loop). The apply flow, analytics pipeline, and chat all depend on a valid `app_users` row existing from the moment the user finishes registration.

---

## Target Audience

Blue-collar workers (warehouse, construction, food service, healthcare, retail, trades, hospitality):

- Browsing on phones during breaks
- Need fast, scannable interactions (3-second rule)
- 8th-grade reading level — plain language, no jargon
- Total onboarding must complete in **under 60 seconds**

---

## User Stories

| ID | Story | Priority |
|----|-------|----------|
| US-1 | As a new user, I want a quick onboarding so I can start browsing jobs immediately | P0 |
| US-2 | As a new user, I want my profile created automatically so saving jobs works from the start | P0 |
| US-3 | As a new user, I want to tell the app my name so it feels personal | P0 |
| US-4 | As a new user, I want to share my location so I see jobs near me | P1 |
| US-5 | As a new user, I want to pick my industry so the app shows relevant jobs | P1 |
| US-6 | As a new user, I want to select personal traits and skills so my match scores are more accurate | P1 |

---

## Onboarding Flow (5 Screens)

### Screen 1: Welcome

**Purpose:** Set the tone, build excitement, establish brand personality.

- Hero text: **"Let's find your next job in 60 seconds"**
- Subtitle: "Quick setup, better matches"
- Gradient CTA button: **"Let's Go"**
- Background: `screenGradient` with spotlight glow
- Animated entrance: fade-in hero text + slide-up CTA
- **No skip** — this is the entry point

### Screen 2: Name (REQUIRED)

**Purpose:** Collect name, create the `app_users` row. This is the critical step.

- Title: **"What's your name?"**
- Two text inputs: First name, Last name (glass-styled, matching auth screen inputs)
- Gradient CTA: **"Continue"**
- **Not skippable** — this is the only mandatory step
- On submit:
  - Generate initials from first/last name (e.g., "John Smith" → "JS")
  - Create `app_users` row in Supabase: `{ authId, email, name, initials, onboardingCompleted: false }`
  - Email sourced from Supabase Auth user object
  - If offline: buffer in AsyncStorage, sync on reconnect

### Screen 3: Location (Skippable)

**Purpose:** Enable location-based job matching.

- Title: **"Where are you based?"**
- Primary action: **"Use my location"** button with location pin icon
  - Requests `expo-location` foreground permission
  - Reverse geocodes to city + state (e.g., "Las Vegas, NV")
- Fallback: text input for manual city/state entry
- Gradient CTA: **"Continue"**
- Skip link: "Skip for now" (subtle text below CTA)
- On submit: update `app_users.location`

### Screen 4: Industry / Role (Skippable)

**Purpose:** Categorize the user for job matching and feed personalization.

- Title: **"What kind of work do you do?"**
- Scrollable list of industry categories, single-select:
  - Warehouse & Logistics
  - Construction & Trades
  - Food Service & Restaurant
  - Healthcare & Caregiving
  - Retail & Sales
  - Hospitality & Entertainment
  - Manufacturing
  - Transportation & Delivery
  - Cleaning & Maintenance
  - Other
- Each row: icon + label, glass-styled row with highlight on select
- Gradient CTA: **"Continue"**
- Skip link: "Skip for now"
- On submit: update `app_users.experience` with selected category

### Screen 5: Traits & Skills Bubble Picker (Skippable)

**Purpose:** Collect personal traits, soft skills, and certifications for match scoring.

- Title: **"What makes you, you?"**
- Subtitle: "Pick at least 3"
- Floating bubble layout — gradient-filled circles in organic scattered arrangement (inspired by Hinge):
  - Varying sizes (small/medium/large) for visual interest
  - Spring scale animation on tap (bounce in)
  - Glow border effect when selected
  - Gradient fill per bubble (using brand gradient palette)
- Bubble options (mix of traits, skills, certifications):
  - **Traits:** Team player, Detail-oriented, Reliable, Fast learner, Problem solver, Leadership, Early riser, Night owl, Customer-facing, Calm under pressure, Bilingual
  - **Physical:** Physical stamina, On your feet all day, Heavy lifting
  - **Certifications:** Forklift certified, CDL holder, Food handler, OSHA trained, First aid/CPR
- Counter at bottom: "3/3 selected" (updates live)
- Gradient CTA: **"Start Exploring"** (final step — different label)
- Skip link: "Skip for now"
- Soft requirement: suggest 3 minimum, but allow proceeding with fewer
- On submit: update `app_users.skills` array with selected labels
- On complete: set `app_users.onboardingCompleted = true`

---

## Navigation Architecture

```
App.tsx → RootNavigator
  ├─ AuthNavigator (if !user)
  │   ├─ Login
  │   └─ Register
  ├─ OnboardingNavigator (if user && !onboardingCompleted)
  │   ├─ Welcome
  │   ├─ Name
  │   ├─ Location
  │   ├─ Role
  │   └─ Traits
  └─ AppNavigator (if user && onboardingCompleted)
      ├─ Discover
      ├─ Matches
      ├─ Saved
      ├─ Chat
      └─ Profile
```

### AuthContext Changes

Add `needsOnboarding` state:

- After auth state change, check if `app_users` row exists for the uid
- If no row found → `needsOnboarding = true` → show OnboardingNavigator
- If row found with `onboardingCompleted = false` → resume onboarding from last incomplete step
- If row found with `onboardingCompleted = true` → show AppNavigator

---

## Data Model Changes

### `app_users` table additions

| Column | Type | Default | Description |
|--------|------|---------|-------------|
| `onboardingCompleted` | boolean | `false` | Whether user finished onboarding |

No new tables required. All onboarding data maps to existing `app_users` columns:
- `name` ← Name screen
- `initials` ← Generated from name
- `email` ← From Supabase Auth
- `location` ← Location screen
- `experience` ← Role/Industry screen (category label)
- `skills` ← Traits bubble picker (string array)

---

## Design Requirements (Kinetic Fluidity Framework)

- `screenGradient` background on all screens
- `GlassCard` for input containers and list items
- `GradientButton` for all primary CTAs
- Ghost borders only (`glassBorder`) — no solid 1px borders
- Minimum 16px border radius everywhere
- Spring animations on screen transitions (native stack slide-in)
- Progress indicator: thin accent gradient bar at top (step X of 5)
- Bubble picker: gradient-filled circles with spring scale + glow on select
- "Skip for now" as subtle `textTertiary` link below CTA
- Plus Jakarta Sans font, responsive via `getFontScale(width)`
- Staggered entrance animations on each screen (fade + slide-up)

---

## Acceptance Criteria

### P0 (Must Have)

- [ ] Welcome screen renders with hero text and gradient CTA
- [ ] Name screen collects first/last name and creates `app_users` row with authId, email, name, initials
- [ ] `app_users` row exists after Step 2 — even if user drops off after
- [ ] After onboarding completion, `onboardingCompleted` is set to `true`
- [ ] AuthContext correctly routes: no user → Auth, user without row → Onboarding, user with completed row → App
- [ ] SavedJobs, Profile, and all `app_users`-dependent features work immediately after onboarding
- [ ] Onboarding only shows once per user
- [ ] All screens match Kinetic Fluidity design system

### P1 (Should Have)

- [ ] Location screen offers GPS detection via expo-location + manual text fallback
- [ ] Role screen shows scrollable industry list with single-select
- [ ] Traits screen shows floating bubble picker with spring animations and multi-select
- [ ] Steps 3-5 are skippable via "Skip for now" link
- [ ] Progress bar shows current step (1-5)
- [ ] 60fps animations on both iOS and Android
- [ ] Staggered entrance animations on each screen

### P2 (Nice to Have)

- [ ] Offline support: buffer onboarding data in AsyncStorage, sync when online
- [ ] Resume onboarding from last incomplete step if user kills the app mid-flow
- [ ] Haptic feedback on bubble selection (expo-haptics)
- [ ] Bubble sizes vary based on popularity/relevance

---

## Edge Cases

| Case | Handling |
|------|----------|
| User kills app after Step 2 (Name) | `app_users` row exists with `onboardingCompleted: false`. On next launch, resume from Step 3 |
| User kills app before Step 2 | No `app_users` row. Show onboarding from Step 1 |
| Network failure during row creation | Buffer in AsyncStorage. Retry on reconnect. Block progress until confirmed |
| User enters same name as existing user | No conflict — `authId` is the unique key, not name |
| GPS permission denied | Show manual text input. No error state needed |
| User selects 0 traits and taps Continue | Allow it — soft requirement only. Traits screen is skippable |
| User taps back during onboarding | Allow back navigation to previous steps. Don't re-create `app_users` row |

---

## Out of Scope

- Social login (Google, Apple) — separate feature
- Resume/CV upload — Phase 2+
- Certification verification/validation — Phase 2+
- A/B testing onboarding variants — future
- Existing user migration (no pre-existing users without `app_users` rows)
- Profile photo upload — future
- Push notification permission prompt — separate from onboarding

---

## Technical Considerations

- **expo-location** must be added as a dependency for GPS
- **app.json** needs location permission strings for iOS (`NSLocationWhenInUseUsageDescription`)
- Bubble picker layout: use absolute positioning with pre-calculated coordinates (not a physics engine) for performance
- All Supabase operations should check `{ error }` responses — don't silently swallow
- Progress bar can be a simple `LinearGradient` with animated width
- OnboardingNavigator should use `createNativeStackNavigator` with `animation: 'slide_from_right'`

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Onboarding completion rate | > 80% |
| Average onboarding time | < 45 seconds |
| Drop-off after Step 2 (Name) | < 15% |
| Skip rate on Location | < 30% |
| Skip rate on Role | < 40% |
| Skip rate on Traits | < 50% |
| Profile completeness at first job save | > 60% of fields filled |

---

## Dependencies

- Supabase `app_users` table must have `onboardingCompleted` column added
- `expo-location` package must be installed
- AuthContext must be updated to check onboarding state

---

## Next Steps

1. Add `onboardingCompleted` column to `app_users` table in Supabase
2. Update AuthContext with `needsOnboarding` state
3. Create OnboardingNavigator and 5 screens
4. Build bubble picker component
5. Update vault: `App - Features.md`, `App - Screens & Navigation.md`
