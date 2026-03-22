# PRD: SavedScreen Redesign

## Problem Statement
The Saved screen is a structural clone of the Matches screen with the same flat aesthetic. It lacks visual richness, animations, and the premium feel of the Discovery screen. The empty state is particularly underwhelming.

## User Stories
- As a candidate, I want saved jobs displayed in premium glass cards matching the Discovery aesthetic
- As a candidate, I want satisfying animations when removing saved jobs
- As a candidate, I want an inviting empty state that encourages me to start saving jobs

## Requirements

### Functional (P0)
- Display saved jobs from SavedJobsContext (Firestore + AsyncStorage sync)
- Dynamic count subtitle ("X jobs saved for later")
- Delete/unsave button per card
- "Apply Now" gradient CTA per card
- Empty state when no jobs saved

### Visual/Interaction (P0)
- GlassCard for all cards (glass morphism + ghost border)
- GradientButton for Apply Now CTA
- GlassPill for location/type/salary pills
- Staggered entrance animations on cards
- Spring bounce on delete button press (sequence pattern from JobCard save button)
- Pulsing bookmark icon animation in empty state (Animated.loop from StoryCircle)

### Non-Functional (P1)
- screenGradient background
- ScreenHeader with glass backdrop
- Responsive typography
- Re-trigger animations on tab focus

## Acceptance Criteria
- [ ] Glass cards with accent gradient glow
- [ ] Spring bounce animation on delete
- [ ] Pulsing icon in empty state
- [ ] GradientButton for Apply Now
- [ ] GlassPill for metadata pills
- [ ] Staggered entrance on mount/focus
- [ ] All save/unsave functionality preserved
