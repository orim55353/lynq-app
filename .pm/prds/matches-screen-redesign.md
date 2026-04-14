# PRD: MatchesScreen Redesign

## Problem Statement
The Matches screen uses a flat, utilitarian card list that doesn't match the premium aesthetic established by the Discovery screen. Users transitioning from the immersive Discovery feed experience a jarring quality drop, undermining brand perception and engagement.

## User Stories
- As a candidate, I want the Matches screen to feel as polished as Discovery so my experience feels cohesive
- As a candidate, I want smooth animations when browsing matched jobs so the app feels responsive and premium
- As a candidate, I want clear visual hierarchy in match cards so I can quickly scan important information

## Requirements

### Functional (P0)
- Display matched jobs in scrollable card list (preserve existing data flow)
- Show match percentage badge with heart icon per card
- "Message Company" gradient CTA button per card
- Company logo, job title, company name, description, location/type/salary pills
- Preserve job.gradient colors as card accent

### Visual/Interaction (P0)
- Replace flat bgCard backgrounds with GlassCard (glass morphism)
- Replace flat gradient stripe with subtle top glow using job.gradient colors
- Gradient CTA button with glow shadow and spring-press animation
- Glass pills replacing solid-bg pills
- Staggered entrance animation on screen focus (fade-in + slide-up per card)
- Spring-press scale animation on card touch

### Non-Functional (P1)
- Responsive typography via getFontScale(width)
- screenGradient background replacing flat bg color
- Re-trigger entrance animations on tab focus
- Glass-backed ScreenHeader replacing inline title/subtitle
- 60fps animation performance on both iOS and Android

## Acceptance Criteria
- [ ] Cards use GlassCard with glass background + ghost border
- [ ] CTA uses GradientButton with spring press + glow
- [ ] Pills use GlassPill with glass treatment
- [ ] Staggered entrance animation plays on mount and tab re-focus
- [ ] Cards scale down on press-in, spring back on release
- [ ] Responsive font scaling applied to title
- [ ] screenGradient background applied
- [ ] All existing functionality preserved (data, navigation, actions)

## Out of Scope
- Chat/messaging integration (separate feature)
- Real match algorithm changes
- New data fields or API calls

## Technical Considerations
- Uses shared components: GlassCard, GradientButton, GlassPill, ScreenHeader
- Uses shared hooks: useEntranceAnimations, useSpringPress
- All animations use native driver for performance
- Re-trigger via React Navigation useFocusEffect
