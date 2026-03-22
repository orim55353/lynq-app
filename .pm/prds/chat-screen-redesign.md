# PRD: ChatScreen Redesign

## Problem Statement
The Chat screen uses a desktop-oriented two-pane layout (chat list + chat window side by side) that doesn't work on mobile phone screens. It's the biggest aesthetic gap from the Discovery screen and feels like a web app, not a native mobile experience.

## User Stories
- As a candidate, I want a mobile-native chat experience with clear transitions between list and conversation
- As a candidate, I want smooth animated transitions when opening/closing conversations
- As a candidate, I want visual indicators for unread messages that feel premium (not just a dot)

## Requirements

### Architecture Change (P0)
- Replace two-pane side-by-side layout with stacked mobile navigation
- Chat list view (default) → Conversation view (on chat selection)
- Animated slide transition between views (spring translateX)

### Chat List View (P0)
- ScreenHeader with "Messages" title
- Glass morphism search bar with focus animation (border transitions to accent)
- Chat rows with gradient avatar bubbles
- Unread indicator: gradient ring on avatar + pulsing dot
- Staggered entrance animation per chat item

### Conversation View (P0)
- Glass-backed header with back arrow, avatar, company name, status
- Spring-press back button
- Message bubbles with glass treatment (incoming: glass, future outgoing: gradient)
- Glass input bar with gradient send button + glow
- Animated slide-left/right transition

### Non-Functional (P1)
- screenGradient background
- Swipe-right gesture to go back (PanResponder, threshold 100px)
- 60fps transition animations
- May split into ChatListView + ChatConversationView sub-components

## Acceptance Criteria
- [ ] Mobile-first stacked layout (no side-by-side panes)
- [ ] Animated slide transition between list and conversation
- [ ] Glass search bar with focus animation
- [ ] Gradient avatar rings for unread chats
- [ ] Pulsing unread dot
- [ ] Glass message bubbles
- [ ] Gradient send button with glow
- [ ] Back navigation via button or swipe gesture
- [ ] All existing chat data/functionality preserved

## Technical Considerations
- State machine: selectedChat determines which view shows
- PanResponder horizontal swipe must not conflict with React Navigation
- Use Animated.View transitions within screen, not navigation stack
