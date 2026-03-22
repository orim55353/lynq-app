# PRD: ProfileScreen Redesign

## Problem Statement
The Profile screen uses functional but static cards without animations, glass effects, or the visual hierarchy depth of the Discovery screen. The experience feels flat compared to the premium standard set elsewhere in the app.

## User Stories
- As a candidate, I want my profile to feel as premium as the job discovery experience
- As a candidate, I want smooth animations when my profile loads
- As a candidate, I want a visually rich experience timeline that shows my career progression

## Requirements

### Visual (P0)
- GlassCard wrappers for all card sections
- Avatar with concentric gradient ring (StoryCircle pattern) + glow shadow
- GlassPill for info pills (email, location, experience)
- GlassPill for skill tags with staggered entrance
- Gradient timeline line (LinearGradient vertical) with dot nodes
- screenGradient background + subtle accent wash in top 30%

### Interaction (P0)
- Staggered card entrance: profile(0ms), skills(100ms), experience(200ms), signout(300ms)
- Avatar scale-in spring animation on mount
- Spring-press on edit button
- Spring-press on sign-out button (glass + danger accent)

### Functional (P0)
- Preserve all profile data display (name, tagline, email, location, experience, skills)
- Preserve edit button functionality
- Preserve sign-out with confirmation dialog
- Preserve loading state

## Acceptance Criteria
- [ ] GlassCard on all sections
- [ ] Gradient ring avatar with glow
- [ ] GlassPill for info and skills
- [ ] Gradient timeline with dot nodes
- [ ] Staggered entrance animations
- [ ] Avatar spring scale-in
- [ ] All profile CRUD preserved
