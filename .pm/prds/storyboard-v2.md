# PRD: StoryBoard v2 — Premium Branded Content Experience

**Status:** Draft
**Author:** PM Agent + UI/UX Pro Max
**Date:** 2026-03-21
**Priority:** P0 (Revenue-Critical)
**WINNING Score:** 48/60 (FILE — High Conviction)

---

## 1. Problem Statement

StoryBoard is positioned as a **paid B2B feature** where companies pay $500-2,000/month for branded story placements to attract candidates. However, the current implementation is fundamentally broken as a premium product:

| What Companies Expect | What They Get Today |
|---|---|
| Branded, immersive story content | Generic category filter pills |
| Rich media (video, images, culture) | Repurposed JobCard components |
| Analytics (views, CTR, engagement) | Nothing |
| Custom CTAs and branding | Zero customization |
| Premium placement and visibility | Same visual weight as free content |
| ROI tracking | No data at all |

**Bottom line:** No company would pay for the current StoryBoard. It's indistinguishable from the main feed and provides zero brand value.

---

## 2. Target Users

### 2a. Companies (Buyers — B2B)

- **Talent Acquisition teams** at mid-to-large companies
- **Employer Brand managers** who create recruitment marketing content
- Pain: Hard to stand out on job boards. Generic text listings don't convey culture.
- Willingness to pay: $500-2,000/month for premium branded placement with analytics

### 2b. Candidates (Consumers — B2C)

- Job seekers browsing the Discover feed
- Pain: Job descriptions are boring and don't show what it's *really* like to work somewhere
- Desire: Want to "feel" a company before applying — culture, team, vibe

---

## 3. Success Metrics

| Metric | Baseline (v1) | Target (v2) | Measurement |
|--------|---------------|-------------|-------------|
| Story view rate | ~0% (no real stories) | 40%+ of DAU views at least 1 story | Analytics events |
| Story completion rate | N/A | 60%+ complete full story | Progress tracking |
| Story-to-apply conversion | 0% | 8-12% tap CTA from story | CTA tap events |
| Company signup rate | 0 | 10+ paying companies in 3 months | Billing |
| Revenue (MRR) | $0 | $5,000-15,000 in 3 months | Stripe |
| Avg time in story viewer | 0s | 15-25s per company story | Session tracking |

---

## 4. Feature Specification

### 4.1 Story Data Model

New Firestore schema additions:

```
companies/{companyId}                    # Company profile (logo, name, colors, plan tier)
  stories/{storyId}                      # Individual story (active/scheduled/expired)
    slides/{slideId}                     # Ordered slides within a story

# Story document
{
  companyId: string
  companyName: string
  companyLogo: string
  brandColors: { primary: string, secondary: string }
  tier: "standard" | "premium" | "featured"
  status: "active" | "scheduled" | "expired"
  publishedAt: Timestamp
  expiresAt: Timestamp                   # Auto-expire (default 7 days)
  totalViews: number
  totalTaps: number
  linkedJobIds: string[]                 # Jobs promoted in this story
  order: number                          # Display order (featured first)
}

# Slide document
{
  type: "culture" | "job_highlight" | "testimonial" | "day_in_life" | "custom"
  mediaType: "image" | "video"
  mediaUrl: string
  thumbnailUrl: string                   # For video poster frames
  headline: string
  body: string
  cta: {
    label: string                        # "View Role" | "Apply Now" | "Follow Us"
    action: "navigate_job" | "apply" | "follow" | "external_link"
    targetId?: string                    # jobId or URL
  }
  brandOverlay: {
    backgroundColor?: string             # Company brand color overlay
    textColor?: string
    opacity?: number
  }
  duration: number                       # Auto-advance duration in ms (default 5000)
  order: number
}
```

### 4.2 Company Tier System

| Feature | Standard ($500/mo) | Premium ($1,000/mo) | Featured ($2,000/mo) |
|---------|--------------------|--------------------|---------------------|
| Story slides per week | 3 | 7 | Unlimited |
| Media types | Images only | Images + Video (15s) | Images + Video (30s) |
| Circle position | After featured | After featured | First positions |
| Circle size | 56px | 56px | 72px (1.3x) |
| Gradient ring | Static brand colors | Animated pulse | Animated spin + glow |
| Analytics | Basic (views) | Detailed (views, CTR, demographics) | Full + competitor benchmarks |
| CTA types | "View Role" only | All CTAs | All CTAs + custom |
| "NEW" badge | Yes | Yes + priority | Yes + priority + push notify |
| Story duration | 7 days | 14 days | 30 days |
| Branded slide templates | 2 | 5 | All + custom |

---

## 5. UI/UX Design Specification

### Design System Alignment

The StoryBoard v2 follows Lynq's **Kinetic Fluidity Framework** combined with **Modern Dark Cinema Mobile** style:

- **Background:** Existing dark theme (`#0C1415`)
- **Accent:** Cyan `#06B6D4` (Lynq brand)
- **Glass surfaces:** `rgba(255,255,255,0.05-0.15)` with blur
- **Border radius:** Minimum 16px, circles use full round
- **Animation:** Spring physics (damping: 20, stiffness: 90), Bezier(0.16, 1, 0.3, 1)
- **Typography:** Plus Jakarta Sans (existing), bold for headlines
- **Haptics:** Impact Light on tap, Medium on CTA

---

### 5.1 Story Circles Row (StoryHeader v2)

**Replaces:** Current pill-based `StoryHeader.tsx`

```
Layout:
┌──────────────────────────────────────────────────┐
│  [glass backdrop + blur]                         │
│                                                  │
│  ┌────┐  ┌────┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐  ┌──┐ │
│  │ 72 │  │ 72 │  │56│  │56│  │56│  │56│  │56│  │
│  │feat│  │feat│  │std│  │std│  │std│  │std│  │std│ │
│  └────┘  └────┘  └──┘  └──┘  └──┘  └──┘  └──┘ │
│  Caesar   Google  Acme  Nike  Meta  Uber  Lyft  │
│                                                  │
└──────────────────────────────────────────────────┘
```

**Component: `StoryCircle`**

| Property | Standard | Premium | Featured |
|----------|----------|---------|----------|
| Outer size | 56px | 56px | 72px |
| Logo size | 48px (inside ring) | 48px | 62px |
| Ring width | 2px | 2.5px | 3px |
| Ring style | Solid brand gradient | Pulsing brand gradient | Spinning gradient + outer glow |
| Ring colors | `[company.brandColors.primary, company.brandColors.secondary]` | Same + pulse opacity 0.7-1.0 | Same + continuous rotation |
| "NEW" badge | 8px cyan dot, top-right | 10px dot + subtle pulse | 12px dot + ring pulse |
| Seen state | Ring becomes `rgba(255,255,255,0.15)` (muted) | Same | Same but slower |
| Logo shape | Circle with 2px white border | Same | Same + 1px glow shadow |
| Label | Company name, 10px, `textTertiary` | Same, `textSecondary` | Same, `text` (brightest) |

**Ring Animation Specs:**

```
// Featured: continuous spinning gradient
Animated.loop(
  Animated.timing(rotationValue, {
    toValue: 1,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: true,
  })
)

// Premium: pulsing opacity
Animated.loop(
  Animated.sequence([
    Animated.timing(opacityValue, { toValue: 0.6, duration: 1200, useNativeDriver: true }),
    Animated.timing(opacityValue, { toValue: 1.0, duration: 1200, useNativeDriver: true }),
  ])
)

// Standard: static (no animation)
```

**Interaction:**
- Tap: Opens `StoryViewer` for that company (haptic: Impact Light)
- Long press: Shows company mini-card preview (name, industry, job count)
- Press in: Scale 0.92, spring (tension: 300, friction: 20)
- Press out: Scale 1.0, spring (tension: 200, friction: 15)

**Scroll behavior:**
- Horizontal `ScrollView` with `showsHorizontalScrollIndicator={false}`
- Featured companies always render first (sorted by tier, then `order`)
- `paddingHorizontal` matches existing screen edge padding
- Gap: 12px between circles

---

### 5.2 Story Viewer (Full-Screen Modal)

**Replaces:** Current `StoryViewModal.tsx`

```
┌─────────────────────────────────────┐
│ ▓▓▓▓░░░░░░░ ░░░░░░░░░░ ░░░░░░░░░░ │  ← Progress bars (per slide)
│                                     │
│  ┌─────┐  Caesars Entertainment     │  ← Company header
│  │ logo│  Sponsored · 2h ago        │
│  └─────┘                        ✕   │  ← Close button
│                                     │
│                                     │
│                                     │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │   [FULL BLEED MEDIA]       │    │
│  │   Image or Video            │    │
│  │                             │    │
│  │                             │    │
│  └─────────────────────────────┘    │
│                                     │
│  "Join our award-winning team       │  ← Headline text
│   in Las Vegas"                     │
│                                     │
│  ┌─────────────────────────────┐    │
│  │  ⊕ View Role          →    │    │  ← CTA button (gradient)
│  └─────────────────────────────┘    │
│                                     │
│  ♡ 234    ↗ Share    ⊞ Save         │  ← Engagement bar
│                                     │
└─────────────────────────────────────┘
```

**Component Architecture:**

```
StoryViewer (Modal)
├── StoryProgressBar          # Multi-segment progress indicator
├── StoryCompanyHeader        # Logo + name + sponsored tag + close
├── StorySlideRenderer        # Routes to correct slide type
│   ├── CultureSlide          # Full-bleed image/video + overlay text
│   ├── JobHighlightSlide     # Structured job info card
│   ├── TestimonialSlide      # Quote + employee photo + role
│   ├── DayInLifeSlide        # Timeline/carousel of moments
│   └── CustomBrandedSlide    # Company-controlled layout + colors
├── StoryCTA                  # Dynamic CTA button
└── StoryEngagementBar        # Like, share, save actions
```

**Progress Bar:**
- Height: 3px, gap: 4px between segments
- Active segment: Fills left-to-right with `colors.accent` (#06B6D4)
- Completed: Solid `colors.accent`
- Upcoming: `rgba(255,255,255,0.2)`
- Positioned at `safeAreaInsets.top + 8px`

**Company Header:**
- Logo: 36px circle, white border 1.5px, shadow
- Company name: 14px, bold, white
- "Sponsored" tag: 11px, `textTertiary`, separated by ` · `
- Timestamp: Relative ("2h ago")
- Close button: 40px circle, glass background, Ionicons "close", top-right

**Navigation:**
- **Tap left 30%:** Previous slide (or previous company if slide 0)
- **Tap right 70%:** Next slide (or next company if last slide)
- **Swipe left/right:** Navigate between companies (gesture handler)
- **Swipe down:** Close viewer (velocity threshold + spring dismiss)
- **Long press:** Pause auto-advance (resume on release)
- **Auto-advance:** Per-slide `duration` (default 5000ms), pauses during video playback

**Transitions:**
- Between slides (same company): Crossfade, 200ms, ease-out
- Between companies: Horizontal slide, 300ms, spring (damping: 25, stiffness: 120)
- Modal enter: Slide up from bottom, 350ms, spring
- Modal exit (swipe down): Spring dismiss with velocity, 250ms

---

### 5.3 Slide Types — Visual Specs

#### A. Culture Slide

```
┌─────────────────────────────┐
│                             │
│   [FULL-BLEED PHOTO/VIDEO]  │  ← Edge-to-edge media
│                             │
│   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← Bottom gradient scrim
│                             │
│   "Life at Caesars"         │  ← Headline: 24px, bold, white
│   "Where every day is a     │  ← Body: 14px, white/80%
│    showstopper"             │
│                             │
│   [ View Open Roles → ]     │  ← CTA
└─────────────────────────────┘
```

- Media: Full bleed, `resizeMode="cover"`
- Scrim: `LinearGradient` from transparent to `rgba(0,0,0,0.7)`, bottom 40%
- For video: Auto-play muted, tap to unmute, `expo-av` Video component
- Max video duration: 15s (premium) / 30s (featured)

#### B. Job Highlight Slide

```
┌─────────────────────────────┐
│  [Company brand gradient bg] │
│                             │
│   Casino Floor Supervisor    │  ← Title: 22px, bold
│   Las Vegas, NV              │  ← Location: 14px
│                             │
│   ┌─────┬─────┬─────┐      │
│   │$28- │Full │On-  │      │  ← Info chips (glass surface)
│   │$35/h│Time │Site │      │
│   └─────┴─────┴─────┘      │
│                             │
│   ● Supervise table games   │  ← Highlights (3 max)
│   ● Train and mentor staff  │
│   ● VIP guest satisfaction  │
│                             │
│   [ Apply Now → ]           │  ← CTA (links to specific job)
└─────────────────────────────┘
```

- Background: `LinearGradient` using `company.brandColors`
- Info chips: Glass surface, 16px radius, 12px text
- Highlights: Bullet list, 14px, white/90%

#### C. Testimonial Slide

```
┌─────────────────────────────┐
│                             │
│          ┌──────┐           │
│          │ photo│           │  ← Employee photo: 80px circle
│          └──────┘           │
│                             │
│   "Working at Caesars has   │
│    been the most rewarding  │  ← Quote: 18px, italic, white
│    chapter of my career."   │
│                             │
│   — Maria Santos            │  ← Name: 14px, bold
│     Floor Manager, 4 years  │  ← Role + tenure: 12px, tertiary
│                             │
│   [ See Maria's Team → ]    │  ← CTA
└─────────────────────────────┘
```

- Background: Subtle company brand gradient (low opacity) over dark
- Photo: Circle, 3px white border, subtle shadow
- Quote marks: Large decorative `"` in brand color, 48px, opacity 0.3

#### D. Day-in-Life Slide

```
┌─────────────────────────────┐
│  A Day in the Life          │  ← Section title
│  Casino Floor Supervisor    │
│                             │
│  ┌──────┐  8:00 AM          │
│  │ img  │  Morning briefing │  ← Timeline entry
│  └──────┘  with the team    │
│                             │
│  ┌──────┐  10:00 AM         │
│  │ img  │  Floor walk &     │  ← Timeline entry
│  └──────┘  guest greetings  │
│                             │
│  ┌──────┐  2:00 PM          │
│  │ img  │  VIP event prep   │  ← Timeline entry
│  └──────┘                   │
│                             │
│  [ Join Our Team → ]        │
└─────────────────────────────┘
```

- Vertical mini-timeline with time markers
- Small image thumbnails (60x60, 12px radius)
- Scrollable within slide if content overflows

#### E. Custom Branded Slide

- Company provides: background image/color, headline, body, CTA
- Template: Full creative control within safe zones
- Brand colors applied as overlay
- Must pass accessibility contrast check

---

### 5.4 Engagement Bar

```
┌──────────────────────────────────────┐
│  ♡ 234      ↗ Share      ⊞ Save     │
└──────────────────────────────────────┘
```

- Position: Bottom of viewer, above safe area
- Background: Glass surface (`rgba(0,0,0,0.3)` + blur)
- Icons: Ionicons, 22px
- Like: `heart-outline` → `heart` (filled, red) on tap + haptic
- Share: `share-outline` → native share sheet
- Save: `bookmark-outline` → `bookmark` (filled, accent) — saves company to "Following"
- Counts: 12px, `textTertiary`, abbreviated (1.2K, 45K)

---

### 5.5 "Seen" State Management

Track which stories the user has viewed:

```typescript
// AsyncStorage key: `@lynq/seen_stories`
interface SeenStories {
  [companyId: string]: {
    lastSeenSlideIndex: number;
    lastSeenAt: number; // timestamp
    fullyViewed: boolean;
  };
}
```

- **Unseen:** Gradient ring active (animated for premium/featured)
- **Partially seen:** Ring shows, but muted (opacity 0.5)
- **Fully seen:** Ring becomes `rgba(255,255,255,0.15)` — no animation
- Resets when company publishes new story content

---

## 6. Component File Map (New + Modified)

### New Files

| File | Purpose |
|------|---------|
| `src/types/story.ts` | Story, Slide, Company, StoryTier interfaces |
| `src/components/stories/StoryCircle.tsx` | Single branded circle with ring animation |
| `src/components/stories/StoryCirclesRow.tsx` | Horizontal scroll of StoryCircles (replaces StoryHeader pill logic) |
| `src/components/stories/StoryViewer.tsx` | Full-screen modal container |
| `src/components/stories/StoryProgressBar.tsx` | Multi-segment progress indicator |
| `src/components/stories/StoryCompanyHeader.tsx` | Logo + name + sponsored tag |
| `src/components/stories/StoryCTA.tsx` | Dynamic CTA button |
| `src/components/stories/StoryEngagementBar.tsx` | Like/share/save actions |
| `src/components/stories/slides/CultureSlide.tsx` | Full-bleed media slide |
| `src/components/stories/slides/JobHighlightSlide.tsx` | Structured job card slide |
| `src/components/stories/slides/TestimonialSlide.tsx` | Employee quote slide |
| `src/components/stories/slides/DayInLifeSlide.tsx` | Timeline slide |
| `src/components/stories/slides/CustomBrandedSlide.tsx` | Company-controlled slide |
| `src/hooks/useStories.ts` | Fetch stories from Firestore, manage seen state |
| `src/hooks/useStoryAnalytics.ts` | Track views, taps, duration per slide |
| `src/context/StoryContext.tsx` | Story state provider (seen, liked, saved) |

### Modified Files

| File | Changes |
|------|---------|
| `src/components/StoryHeader.tsx` | Refactor to use `StoryCirclesRow` internally or replace |
| `src/components/StoryViewModal.tsx` | Replace with `StoryViewer` or deprecate |
| `src/screens/DiscoverScreen.tsx` | Wire up new story components, remove old story state |
| `src/types/models.ts` | Add `companyId` to Job interface |
| `src/data/jobs.ts` | Add `companyId` field to seed data |

---

## 7. Implementation Phases

### Phase 1: Foundation (Week 1-2)

**Goal:** Story data model + circles row + basic viewer

- [ ] Define TypeScript interfaces (`story.ts`)
- [ ] Seed Firestore with sample company stories (Caesars + 2-3 mock companies)
- [ ] Build `StoryCircle` component with tier-based ring animations
- [ ] Build `StoryCirclesRow` replacing pill-based header
- [ ] Build basic `StoryViewer` modal with progress bar and navigation
- [ ] Implement `CultureSlide` (image-only first, video later)
- [ ] Wire up to `DiscoverScreen`
- [ ] Seen state management (AsyncStorage)

### Phase 2: Rich Content (Week 3-4)

**Goal:** All slide types + video + engagement

- [ ] Build `JobHighlightSlide`, `TestimonialSlide`, `DayInLifeSlide`
- [ ] Build `CustomBrandedSlide`
- [ ] Add video support via `expo-av` in `CultureSlide`
- [ ] Build `StoryEngagementBar` (like, share, save)
- [ ] Build `StoryCTA` with dynamic actions (navigate to job, apply, follow)
- [ ] Add haptic feedback on interactions
- [ ] Add swipe-down-to-dismiss gesture
- [ ] Long-press to pause auto-advance

### Phase 3: Analytics + Monetization (Week 5-6)

**Goal:** Company-facing value + billing

- [ ] `useStoryAnalytics` hook — track view, slide_view, cta_tap, share, save events
- [ ] Write analytics events to Firestore `companies/{id}/analytics/{date}`
- [ ] Tier-based feature gating (slide count, video duration, circle size)
- [ ] Company onboarding flow (backoffice, not in mobile app)
- [ ] Billing integration (Stripe, handled server-side)

### Phase 4: Polish + Optimize (Week 7-8)

**Goal:** Performance, edge cases, delight

- [ ] Preload next company's first slide media
- [ ] Skeleton loading for story circles
- [ ] Empty state: "No stories yet — check back soon"
- [ ] Error handling for failed media loads
- [ ] Reduced motion support
- [ ] Performance profiling (target: 60fps during transitions)
- [ ] A/B test: story viewer entry animation variants

---

## 8. Analytics Events

| Event | Payload | Trigger |
|-------|---------|---------|
| `story_circle_tap` | `{ companyId, tier, position }` | User taps a story circle |
| `story_view_start` | `{ companyId, storyId }` | Viewer opens |
| `story_slide_view` | `{ companyId, storyId, slideId, slideType, duration }` | Slide becomes visible |
| `story_slide_complete` | `{ companyId, slideId, autoAdvanced: bool }` | Slide finishes (auto or manual) |
| `story_cta_tap` | `{ companyId, slideId, ctaType, targetId }` | CTA button tapped |
| `story_like` | `{ companyId, storyId }` | Like button tapped |
| `story_share` | `{ companyId, storyId, shareMethod }` | Share initiated |
| `story_save` | `{ companyId, storyId }` | Save/follow tapped |
| `story_view_complete` | `{ companyId, storyId, slidesSeen, totalSlides }` | All slides viewed or viewer closed |
| `story_skip` | `{ companyId, slideId, skipMethod }` | User navigates away before slide completes |

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Video loading on slow networks | Buffering kills UX | Preload + skeleton + fallback to poster image |
| Companies upload low-quality content | Degrades product perception | Content guidelines + minimum resolution requirements |
| Too many stories = scroll fatigue | Users ignore stories | Cap at 8-10 visible circles, featured first |
| Animation jank on low-end devices | Bad UX | `useNativeDriver: true` everywhere, test on older devices |
| Story circles compete with feed for attention | Candidates skip stories | A/B test placement, size, animation to find sweet spot |
| No companies sign up initially | Empty row looks bad | Seed with "Lynq Picks" editorial content + mock company stories |

---

## 10. Out of Scope (v2)

- Company self-service story creation (handled in backoffice/web)
- Story reactions beyond like (emoji reactions)
- Story replies / DMs to company
- AR/filter effects on stories
- Story highlights / permanent pinning
- Collaborative stories (multiple companies)
- Story ads between regular stories (interstitial)

---

## 11. Open Questions

1. **Should category pills coexist with company circles?** Recommendation: Replace pills entirely. The "For You" filter can become the default feed sort instead.
2. **Maximum number of visible story circles?** Recommendation: 10-12 with scroll, featured always first.
3. **Should free-tier companies get a basic circle?** Recommendation: No — keep it premium-only to maintain perceived value.
4. **Story expiration default?** Recommendation: 7 days standard, 14 premium, 30 featured.
5. **Should we show story view counts to candidates?** Recommendation: Yes for social proof ("1.2K views"), but only if >100 views.
