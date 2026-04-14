# Discover Screen — Design Changelog

All design changes made to the Discover screen and its components during the redesign session (2026-03-21).

---

## 1. StoryHeader → Category Filter Bar

**File:** `src/components/StoryHeader.tsx`

- Replaced Instagram-style story circles (images in gradient rings) with horizontal pill selector
- Added "For You" default pill as first option
- Deduplicated categories (removed `tech2`, `finance2` duplicates)
- Active pill uses gradient fill, inactive uses glass background
- Spring-animated press feedback on each pill (scale 0.92)
- Glass backdrop with subtle bottom edge glow
- Theme-aware: uses `useTheme().colors` for pill backgrounds and text

---

## 2. JobCard — Immersive Editorial Card

**File:** `src/components/JobCard.tsx`

### Layout: Two-Zone Architecture
- **Top zone** (anchored to top): match score ring → company → title → tagline → salary
- **Spacer**: flexible gap that lets the background image breathe
- **Bottom zone** (anchored to bottom): highlights → benefits → meta strip → action bar
- On larger screens (XS Max) the spacer expands; on smaller screens it shrinks to `minHeight: 20px`

### Background & Contrast
- Full-bleed background image + gradient color wash (40% opacity)
- **Solid tinted overlay** guarantees text contrast on any image:
  - Dark mode: `rgba(11, 18, 32, 0.45)`
  - Light mode: `rgba(255, 255, 255, 0.75)`
- Removed complex 5-stop gradient scrim approach (was unreliable across varied imagery)
- Top vignette for status bar readability

### Match Score Ring (was: small pill badge)
- Replaced top-right pill badge with `MatchScoreRing` component (88px, 5px stroke)
- Glass backdrop circle (96x96) behind the ring
- Ring uses mode-aware colors (dark text in light mode, white in dark mode)
- Animation deferred until card scrolls into view via `isVisible` prop

### Company Row
- Simplified from pill container to inline row (logo + name + dot + location)
- Logo size increased from 24px to 32px
- Location text uses `subtitle` color instead of `muted` for better readability

### Benefits (NEW)
- Added benefits row showing up to 3 benefits as compact pills
- Positioned between highlights and meta strip
- Each pill: checkmark icon + text
- Mode-aware: glass in dark, tinted primary in light

### Type Pill
- Uses `pillBg`/`pillBorder` from theme palette (was hardcoded and unreadable on some backgrounds)

### Action Bar
- Removed card-level press scale animation (was causing zoom-out before detail view open)
- Long press no longer triggers detail view (uses `delayLongPress={300}` + ref guard)
- Save button active state uses gradient (`#00687A → #06B6D4`) matching Apply CTA
- Save button icon changed to white on gradient (was dark on flat color)

### Text Sizes
- Highlights: 13px → 15px
- Meta/benefits/type text: 11px → 13px

### Color System
- Simplified from 25+ per-element color overrides to 15 semantic tokens
- Tokens: `title`, `subtitle`, `accent`, `body`, `muted`, `icon`, `divider`, `pillBg`, `pillBorder`, `saveBg`, `saveBorder`, `saveIcon`, `expandBg`, `expandBorder`, `expandIcon`
- Both dark and light palettes defined in `overlayColors` const

---

## 3. ExpandedJobCard — Detail View

**File:** `src/components/ExpandedJobCard.tsx`

### Animation
- Migrated from JS-driven `top` animation to native-driven `translateY` (60fps)
- All animations (slide, backdrop, content fade) now use `useNativeDriver: true`
- Border radius uses boolean state (`expanded`) instead of animated value (was causing native/JS driver conflict)
- Header has separate `headerOpacity` that snaps to 0 instantly on close (prevents header riding the sheet down)
- Content fade overlaps with slide for fluid feel

### Header
- Close button, company name, match ring use theme-aware colors
- Match pill replaced with compact `MatchScoreRing` (36px, no label)
- Light mode: dark text/icons on white overlay; Dark mode: white text/icons on dark overlay

### Background & Contrast
- Replaced gradient scrim with solid tinted overlay (same approach as preview card)
  - Dark mode: `rgba(11, 18, 32, 0.55)`
  - Light mode: `rgba(255, 255, 255, 0.75)`
- All text sits on guaranteed-contrast surface regardless of background image

### Job Info Card (NEW)
- Title, tagline, salary + location wrapped in a card container (`cardBg` + `cardBorder`, `radius.lg`)
- Same visual treatment as match hero and AI explanation cards
- Creates a clean stacked card layout in the scroll content
- Text uses `sectionTitle` and `body` palette tokens for consistent readability

### Match Hero Section (was: flat match card)
- Ring (110px, short label) + "You're a [Label] Match!" headline + contextual body text
- Gradient accent line at bottom of card
- Score-tier copy varies by range (Excellent/Strong/Good/Fair)

### AI Explanation Card (NEW)
- "Why this score?" header with sparkles icon
- AI-generated paragraph from `job.matchExplanation`
- "Powered by Lynq AI" footer (opacity bumped to 0.55 for readability)
- Only shown when `matchExplanation` is present

### Stacked Card Layout
The detail scroll content now uses a consistent card layout:
```
┌─ Job Info Card ──────────────────┐
│  Title / Tagline / Salary        │
└──────────────────────────────────┘
┌─ Match Hero Card ────────────────┐
│  Ring + "You're a Strong Match!" │
└──────────────────────────────────┘
┌─ AI Explanation Card ────────────┐
│  "Why this score?" + paragraph   │
└──────────────────────────────────┘
[Info Strip]
[Sections: About, Responsibilities, Requirements, Benefits, Company]
```

### Theme Support
- Full dark/light palette (`palette` const) for all elements
- Solid overlay replaces gradient scrim — reliable contrast in both modes
- Header elements adapt to theme (was hardcoded dark glass in light mode)
- Accent icons use `#00687A` in light mode (solid, not faint opacity)
- Cards use `#FFFFFF` bg in light mode, glass in dark mode

---

## 4. BottomTabBar — Floating Pill Bar

**File:** `src/components/BottomTabBar.tsx`

- Changed from edge-to-edge bar to floating pill with horizontal margin
- Removed text labels — icon-only for cleaner immersive feel
- Active tab: glass pill highlight with cyan tint (was: tiny dot indicator)
- Spring press feedback (scale 0.85) on each tab
- Theme-aware:
  - Dark: `rgba(11, 18, 32, 0.8)` bar, `rgba(255,255,255,0.08)` border
  - Light: `rgba(255, 255, 255, 0.85)` bar, `rgba(0,0,0,0.06)` border
  - Active pill adapts opacity per mode

---

## 5. MatchScoreRing — New Component

**File:** `src/components/MatchScoreRing.tsx`

- SVG radial progress ring using `react-native-svg`
- Arc draws proportionally (e.g., 85% = 306° of 360°)
- Animated entrance: arc draw-in (600ms, ease-out cubic) + number count-up + scale pulse (1 → 1.04 → 1)
- `isVisible` prop defers animation until card is on screen
- `hasAnimated` ref prevents re-animation when scrolling back
- Three size variants: 36px (header), 88px (preview), 110px (hero)
- Label styles: "short" (Strong), "full" (Strong Match), "none"
- Mode-aware track and text colors

---

## 6. Match Utilities — Extracted

**File:** `src/utils/match.ts`

- `matchColor(score)` → `#22C55E` (≥80), `#F59E0B` (60-79), `#94A3B8` (<60)
- `matchLabel(score)` → Excellent / Strong / Good / Fair
- `matchLabelFull(score)` → Excellent Match / etc.
- `matchDescription(score)` → contextual body sentence for hero section
- Removed duplicate definitions from JobCard and ExpandedJobCard

---

## 7. Data Model Changes

**File:** `src/types/models.ts`
- Added `matchExplanation?: string` to `Job` interface

**File:** `src/data/jobs.ts`
- Added placeholder AI explanation text to all 5 seed jobs

---

## 8. Dependencies

- Added `react-native-svg` via `npx expo install react-native-svg`

---

## Key Design Decisions

| Decision | Reasoning |
|----------|-----------|
| Solid overlay instead of gradient scrim | Gradient scrims were unreliable across varied background images. A single semi-opaque layer guarantees contrast universally. |
| Match ring always uses `mode` prop | Initially hardcoded to dark — broke on light mode where ring text was white on white. |
| Preview cards use dark overlay in dark mode, white overlay in light | Tried making light mode cards use dark overlay + white text — user wanted true light mode. Bumped white overlay to 0.75 for sufficient contrast. |
| Benefits on preview card | Key selling points (401k, health insurance) visible immediately without opening details — acts as a hook. |
| Two-zone layout (top + bottom with spacer) | Prevents large empty gap on bigger screens. Content naturally distributes, image breathes in the middle. |
| Active save button uses gradient | Flat color next to gradient Apply CTA looked inconsistent. Both now use `#00687A → #06B6D4`. |
| Header opacity snaps to 0 on close | Header was visually "riding" the sheet down during close animation. Instant hide feels cleaner. |
| Ring animation deferred via `isVisible` | Cards render off-screen in FlatList. Without deferral, animation fires before user sees the card. |
