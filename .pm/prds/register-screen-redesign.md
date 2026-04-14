# PRD: RegisterScreen Redesign

## Problem Statement
The Register screen is nearly identical to LoginScreen in both aesthetics and gaps. As the onboarding entry point for new users, it must set a premium first impression.

## User Stories
- As a new user, I want registration to feel polished and trustworthy
- As a new user, I want clear form fields with smooth focus animations

## Requirements

### Visual/Interaction (P0)
- Same AuthLayout treatment as LoginScreen
- Three glass morphism input fields (email, password, confirm password)
- Adjusted stagger timing for extra field
- GradientButton for Sign Up CTA
- Staggered entrance: brand(0ms), title(100ms), subtitle(150ms), email(250ms), password(350ms), confirm(450ms), button(550ms), link(600ms)

### Functional (P0)
- Preserve email + password + confirm password validation
- Preserve min 6 char password check
- Preserve error handling
- Preserve navigation to Login screen

## Acceptance Criteria
- [ ] AuthLayout shared with LoginScreen
- [ ] Glass inputs with focus animation
- [ ] GradientButton CTA
- [ ] Staggered entrance with correct timing for 3 fields
- [ ] All registration functionality preserved
