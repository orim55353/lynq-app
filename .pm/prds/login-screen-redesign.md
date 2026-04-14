# PRD: LoginScreen Redesign

## Problem Statement
The Login screen is clean but utilitarian — flat background, emoji brand icon, basic inputs. It's the first screen users see and doesn't set the premium expectation that the Discovery screen delivers.

## User Stories
- As a new user, I want an impressive first impression that communicates quality
- As a returning user, I want a polished, smooth login experience
- As a candidate, I want the auth flow to feel as premium as the rest of the app

## Requirements

### Visual (P0)
- AuthLayout wrapper: authGradient background + spotlight glow at top
- Replace emoji bolt with Lynq "Lq" lettermark + accent glow
- Glass morphism inputs (glass bg + ghost border)
- Input focus animation: border transitions to accent color, bg to glassHeavy
- GradientButton for Log In CTA

### Interaction (P0)
- Full staggered entrance: brand(0ms), title(100ms), subtitle(150ms), email(250ms), password(350ms), button(450ms), link(500ms)
- GradientButton spring-press with delayed entrance (scale spring at 450ms)
- Input focus border color transition

### Functional (P0)
- Preserve email/password authentication flow
- Preserve loading state with ActivityIndicator
- Preserve error handling with Alert
- Preserve navigation to Register screen

## Acceptance Criteria
- [ ] AuthLayout with gradient background + spotlight
- [ ] Lynq lettermark brand icon with glow
- [ ] Glass inputs with focus animation
- [ ] GradientButton CTA
- [ ] Full staggered entrance animation
- [ ] All auth functionality preserved
