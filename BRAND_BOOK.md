# Lynq Brand Book — Mobile App

> Design system and brand guidelines for the Lynq candidate mobile app.

---

## Brand Identity

| | |
|---|---|
| **Name** | Lynq |
| **Product** | Job Discovery App (Candidate-facing) |
| **Tagline** | Swipe through jobs like stories — find your next role in seconds. |
| **URL** | lynq.jobs |
| **Email** | hello@lynq.jobs |
| **Location** | Las Vegas, NV |
| **Founded** | 2026 |

---

## Logo

The Lynq logo is a **lightning bolt icon** inside a rounded square, paired with the **"Lynq" wordmark**. The letter "q" carries a subtle underline in the brand accent color.

### Icon

- **Shape:** Lightning bolt
- **Style:** Stroke-based, rounded caps and joins
- **Background:** Brand accent color, rounded square (`borderRadius: 10`)
- **Icon color:** White (`#ffffff`) on accent background

### Icon Sizes

| Context | Size | Border Radius |
|---------|------|---------------|
| Tab bar / header | 36×36 | 10 |
| Small / inline | 20×20 | 6 |
| Compact | 28×28 | 8 |

### Usage Rules

- Never stretch or distort the icon
- Never change the lightning bolt color (always white on accent)
- Never place on busy backgrounds without sufficient contrast
- Always use the rounded square background — never the bolt alone

---

## Color System

All colors are defined in `src/constants/theme.ts` and referenced via the `colors` export. Never use raw hex values in components — always use theme constants.

### Brand Accent

| Token | Value | Usage |
|-------|-------|-------|
| `colors.purple500` | `#A855F7` | Primary accent, active states, CTAs |
| `colors.pink500` | `#EC4899` | Secondary accent, gradient pairing, hearts/matches |

> The app's primary brand expression uses purple-to-pink gradients. The cyan accent from the backoffice (`#00e5ff`) is **not** used in the mobile app — purple (`#A855F7`) is the mobile accent.

### Core Palette

| Token | Value | Usage |
|-------|-------|-------|
| `colors.white` | `#FFFFFF` | Card backgrounds, primary text on dark |
| `colors.black` | `#000000` | Screen backgrounds (Discover), text on light |
| `colors.gray50` | `#F8FAFC` | Light screen backgrounds |
| `colors.gray100` | `#F1F5F9` | Subtle backgrounds, separators |
| `colors.gray200` | `#E2E8F0` | Borders, dividers |
| `colors.gray400` | `#94A3B8` | Placeholder text, inactive icons |
| `colors.gray500` | `#64748B` | Secondary text |
| `colors.gray600` | `#475569` | Inactive tab labels, muted icons |
| `colors.gray700` | `#334155` | Strong secondary text |
| `colors.gray900` | `#0F172A` | Primary text on light backgrounds |

### Status Colors

| Token | Value | Usage |
|-------|-------|-------|
| `colors.blue500` | `#3B82F6` | Info, links |
| `colors.green500` | `#22C55E` | Success, compatibility dots |
| `colors.red500` | `#EF4444` | Errors, destructive actions, delete |
| `colors.yellow500` | `#EAB308` | Warnings |

### Job Card Gradients

Each job carries a `gradient: [string, string]` tuple rendered via `expo-linear-gradient`. Common pairs:

| Theme | Gradient |
|-------|----------|
| Casino / Bold | `["#DC2626", "#D97706"]` |
| Corporate / Trust | `["#2563EB", "#4F46E5"]` |
| Creative / Energy | `["#9333EA", "#DB2777"]` |
| Dark / Serious | `["#374151", "#111827"]` |
| Premium / Warm | `["#D97706", "#EAB308"]` |
| Tech | `["#A855F7", "#EC4899"]` |
| Finance | `["#22C55E", "#14B8A6"]` |
| Design | `["#F97316", "#EF4444"]` |
| Marketing | `["#3B82F6", "#06B6D4"]` |
| Healthcare | `["#EC4899", "#F43F5E"]` |

### Glass / Translucent Surfaces

Used for overlays on job cards and the floating tab bar:

| Surface | Style |
|---------|-------|
| Tab bar | `rgba(255,255,255,0.84)` background, 1px `rgba(226,232,240,0.6)` border |
| Badge pill | `rgba(255,255,255,0.24)` background |
| Match indicator | `rgba(255,255,255,0.2)` background, 1px `rgba(255,255,255,0.3)` border |
| Info panel | `rgba(255,255,255,0.1)` background, 1px `rgba(255,255,255,0.2)` border |
| Benefit pill | `rgba(255,255,255,0.15)` background |
| Bookmark button | `rgba(255,255,255,0.2)` background, 2px `rgba(255,255,255,0.3)` border |
| Spotlight overlay | White gradient fading to transparent |

### Color Usage Rules

- Always use `colors.*` from `src/constants/theme.ts` — never raw hex in components
- Job card content is always white text on gradient backgrounds
- Screen backgrounds: `colors.black` for immersive feeds (Discover), `colors.gray50` for list screens
- Glass surfaces use `rgba()` for translucency over gradient backgrounds
- Status colors match their semantic meaning — never repurpose `red500` for non-error use

---

## Typography

### Font

**System font** — React Native's default platform font (San Francisco on iOS, Roboto on Android). No custom fonts are loaded.

### Type Scale

Font sizes scale responsively using `getFontScale(width)` from `src/constants/theme.ts`, clamped between 0.85x and 1.25x of the reference width (390pt).

| Level | Base Size | Weight | Usage |
|-------|-----------|--------|-------|
| **Job title** | 36 | 900 (Black) | Job card headline |
| **Salary** | 26 | 700 (Bold) | Salary display |
| **Apply CTA** | 20 | 800 (ExtraBold) | Apply button text |
| **Company name** | 18 | 700 (Bold) | Company row on card |
| **Section header** | 16–18 | 700 (Bold) | Screen titles |
| **Body** | 14 | 400 (Regular) | Descriptions, content |
| **Badge / pill** | 13–14 | 500–600 (Medium/SemiBold) | Location, type, benefits |
| **Match score** | 12 | 700 (Bold) | Compatibility percentage |
| **Info label** | 11 | 500 (Medium) | Experience, schedule, work type labels |
| **Info value** | 11 | 700 (Bold) | Experience, schedule, work type values |
| **Tab label** | 10 | 500 (Medium) | Bottom tab text |

### Typography Rules

- Use system fonts only — no custom font loading
- Apply `getFontScale(width)` for responsive sizing on cards
- Job card text is always `colors.white` — legibility depends on the gradient + dark overlay
- Use `numberOfLines` + `ellipsizeMode="tail"` for text truncation
- Headings use 700+ weight, body uses 400, UI labels use 500–600

---

## Spacing & Layout

### Spacing Scale

Defined in `src/constants/theme.ts` on a 4pt base:

| Token | Value | Usage |
|-------|-------|-------|
| `spacing.xs` | 4 | Tight gaps, icon-to-text |
| `spacing.sm` | 8 | Small padding, badge internal |
| `spacing.md` | 12 | Standard padding, pill horizontal |
| `spacing.lg` | 16 | Section gaps, standard margins |
| `spacing.xl` | 20 | Large gaps |
| `spacing.xxl` | 24 | Extra-large gaps |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius.sm` | 10 | Small rounded elements |
| `radius.md` | 14 | Cards, containers, logo wraps |
| `radius.lg` | 18 | Medium containers |
| `radius.xl` | 24 | Info panels, large surfaces |
| `radius.pill` | 999 | Pills, badges, buttons, tab bar |

### Horizontal Padding

Content padding is responsive: `clamp(width * 0.06, 20, 28)` — defined in `horizontalPaddingBounds`.

### Shadow

| Element | Style |
|---------|-------|
| Tab bar | `shadowColor: #000, shadowOpacity: 0.12, shadowOffset: {0, 8}, shadowRadius: 14, elevation: 8` |
| Active icon | `textShadowColor: rgba(168,85,247,0.65), textShadowRadius: 8` |

### Layout Patterns

- Use `gap` instead of margin between siblings
- Full-screen cards: `height` = `windowHeight`, paging via `snapToInterval`
- Content positioning: `paddingTop` for story header clearance, `paddingBottom` for tab bar clearance
- Flex spacer pattern: `{ flex: 1 }` view between top and bottom sections

---

## Components

All components are custom React Native views — no component library. Built with `StyleSheet.create()` and theme constants.

### Job Card (`JobCard.tsx`)

Full-screen card with layered rendering:
1. `ImageBackground` — job photo
2. `LinearGradient` — brand gradient overlay (85% opacity)
3. `LinearGradient` — white spotlight from top
4. `LinearGradient` — dark scrim for text legibility
5. Content layer — company, title, salary, badges, info panel, benefits, actions

### Story Header (`StoryHeader.tsx`)

Instagram-style horizontal scroll of category circles at the top of Discover. Each circle has a gradient border ring and category image.

### Bottom Tab Bar (`BottomTabBar.tsx`)

Floating pill-shaped tab bar with glass morphism effect:
- Absolute positioned at bottom
- `rgba(255,255,255,0.84)` background
- Active tab: scaled icon with purple glow shadow
- 4 tabs: Discover (home), Matches (heart), Chat (chatbubble), Profile (person)

### Story View Modal (`StoryViewModal.tsx`)

Full-screen modal for story-style job browsing.

### Component Rules

- All components use `StyleSheet.create()` at bottom of file
- All colors and spacing from theme constants — no inline magic numbers
- Use `memo()` for list items (JobCard)
- Use `useMemo()` for computed layouts that depend on dimensions
- Use `useCallback()` for event handlers passed to children
- Responsive values use `clamp()` from `src/utils/math.ts`

---

## Iconography

### Icon Set

**Ionicons** via `@expo/vector-icons` — consistent, platform-native feel.

### Common Icons

| Icon Name | Usage |
|-----------|-------|
| `home` | Discover tab |
| `heart` | Matches tab, match indicator |
| `chatbubble-ellipses` | Chat tab |
| `person` | Profile tab |
| `bookmark` / `bookmark-outline` | Save job |
| `location-outline` | Location badges |
| `briefcase-outline` | Experience info |
| `calendar-outline` | Schedule info |
| `map-outline` | Work type info |
| `search-outline` | Search input |
| `send` | Send message |
| `close` | Close modal |
| `trash-outline` | Remove saved job |
| `create-outline` | Edit profile |
| `mail-outline` | Email info |
| `log-out-outline` | Sign out |
| `cash-outline` | Salary info |

### Icon Sizes

| Context | Size |
|---------|------|
| Info panel icons | 18 |
| Badge/inline icons | 14–15 |
| Tab bar icons | 24 |
| Action icons | 20–26 |
| Empty state icons | 56 |

### Icon Style

- Default color on cards: `colors.white`
- Inactive tab: `colors.gray600`
- Active tab: `colors.purple500` with glow shadow
- Destructive actions: `colors.red500`
- Always use the outline variant for informational icons, filled for interactive/active states

---

## Theme Mode

The mobile app is **light mode only** (`"userInterfaceStyle": "light"` in `app.json`).

- Screen backgrounds alternate between `colors.black` (immersive feeds) and `colors.gray50` (lists)
- Job cards create their own dark context via gradient overlays — all card text is white
- No dark mode toggle exists in the app
- The `StatusBar` is set to `"dark"` (dark icons on light system chrome)

---

## Motion & Animation

### Active Tab

- Scale transform: `transform: [{ scale: 1.1 }]` on active icon wrapper
- Text shadow glow: `rgba(168,85,247,0.65)` with 8pt radius

### Scroll Behavior

- Discover feed: `pagingEnabled` + `snapToInterval` for TikTok-style paging
- `decelerationRate="fast"` + `disableIntervalMomentum` for crisp snapping
- `bounces={false}` — no overscroll

### Motion Principles

- Keep animations minimal — the content (gradients, images) provides visual richness
- Use React Native's built-in transform and opacity properties
- Avoid layout-triggering animations (width, height changes)
- Story circles and modals should transition smoothly but quickly

---

## Platform Behavior

### iOS

- Safe area insets respected via `react-native-safe-area-context`
- Tab bar padding: `Math.max(insets.bottom, 10)`
- Story header respects `insets.top`

### Android

- Edge-to-edge enabled (`"edgeToEdgeEnabled": true`)
- Shadow fallback: `elevation` property alongside `shadow*` properties

### Responsive Scaling

- Font sizes scale with screen width via `getFontScale(width)` (reference: 390pt)
- Clamped range: 0.85x (small phones) to 1.25x (tablets)
- Horizontal padding responsive: `clamp(width * 0.06, 20, 28)`
- Card height = full window height for snap scrolling
- `FlatList` uses `getItemLayout` for optimized scrolling performance

---

## Quick Reference

| Property | Value |
|----------|-------|
| Primary Accent | `#A855F7` (purple) |
| Secondary Accent | `#EC4899` (pink) |
| Background (immersive) | `#000000` |
| Background (list) | `#F8FAFC` |
| Card text | `#FFFFFF` (always white on gradient) |
| Tab bar | Glass pill, `rgba(255,255,255,0.84)` |
| Icons | Ionicons via `@expo/vector-icons` |
| Font | System (SF Pro / Roboto) |
| Font scaling | `getFontScale(width)`, 0.85x–1.25x |
| Spacing base | 4pt (`spacing.*`) |
| Radius | `radius.*` (10–999) |
| Gradients | `expo-linear-gradient` per job |
| Theme mode | Light only |
| Platforms | iOS + Android |
