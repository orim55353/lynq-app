# i18n and RTL/LTR Support Research for Lynq App

**Stack:** Expo SDK 54, React Native 0.81, React 19, TypeScript 5, React Navigation 7
**Research Date:** April 2026

---

## 1. Best i18n Library for Expo 54

### Recommendation: react-i18next + expo-localization

The community consensus for 2025/2026 is clear: **react-i18next** is the recommended i18n library for Expo/React Native apps. It should be paired with **expo-localization** for device locale detection.

### Library Comparison

| Library | Status | React Native Support | Community | Verdict |
|---------|--------|---------------------|-----------|---------|
| **react-i18next** | Active, maintained | Full support | Largest ecosystem, most plugins | **Recommended** |
| **i18n-js** | Active | Full support | Smaller, Expo docs use it | Good alternative, simpler |
| **expo-localization** | Active | Native Expo | Expo official | **Use alongside react-i18next** |
| **Better i18n** | Newer entrant | Expo support | Growing | Worth watching |
| **FormatJS (react-intl)** | Active | Works | Large | Heavier, web-focused |

### Why react-i18next Wins

- Largest community and plugin ecosystem (unmatched)
- `useTranslation` hook integrates naturally with React
- `<Trans>` component handles mixed markup and variables safely
- Supports namespaces, lazy loading, interpolation, pluralization
- TypeScript support (requires extra setup for full type safety)
- Works across React, React Native, Next.js, and Node.js

### Drawbacks of react-i18next

- More boilerplate than modern alternatives
- Requires extra setup for type safety (does not generate types by default)
- Bundle size (~6KB) larger than newer tree-shakeable alternatives

### Why NOT i18n-js

- Smaller ecosystem, fewer plugins
- The older `react-native-i18n` package (which used i18n.js) is deprecated
- The Expo docs show i18n-js examples, but the community has moved toward react-i18next for production apps

### Installation

```bash
npx expo install expo-localization
npm install react-i18next i18next @react-native-async-storage/async-storage
```

---

## 2. RTL Layout Handling in React Native 0.81+

### I18nManager API

The `I18nManager` module is the core API for RTL support in React Native.

#### Key API Surface

```typescript
// Properties
I18nManager.isRTL: boolean              // Current layout direction
I18nManager.doLeftAndRightSwapInRTL: boolean  // Auto-swap left/right

// Methods
I18nManager.allowRTL(allow: boolean): void    // Enable/disable RTL capability
I18nManager.forceRTL(forced: boolean): void   // Force RTL (dev/testing only)
I18nManager.swapLeftAndRightInRTL(swap: boolean): void  // Auto-swap left/right props
```

#### How isRTL is Determined

1. Returns `true` if `forceRTL` is `true`
2. Returns `false` if `allowRTL` is `false`
3. Otherwise checks platform:
   - **iOS:** User-preferred language is RTL AND app localizations include that language (Xcode `knownRegions`)
   - **Android:** User-preferred language is RTL AND `AndroidManifest.xml` has `android:supportsRTL="true"`

#### Critical Caveat

Changes to RTL settings require a full app restart. Settings are persisted across restarts. Do NOT use `forceRTL()` in production.

### Logical Properties (Preferred Approach)

React Native 0.81 fully supports logical properties. Always use these instead of physical directional properties:

| Physical (avoid) | Logical (use) |
|-------------------|---------------|
| `paddingLeft` | `paddingStart` |
| `paddingRight` | `paddingEnd` |
| `marginLeft` | `marginStart` |
| `marginRight` | `marginEnd` |
| `left` (absolute) | `start` |
| `right` (absolute) | `end` |
| `textAlign: 'left'` | `textAlign: 'start'` |
| `textAlign: 'right'` | `textAlign: 'end'` |
| `borderLeftWidth` | `borderStartWidth` |
| `borderRightWidth` | `borderEndWidth` |

**Keep unchanged:** `marginHorizontal`, `paddingHorizontal`, `marginVertical`, `paddingVertical`

### Expo Configuration for RTL

In `app.json`:

```json
{
  "expo": {
    "extra": {
      "supportsRTL": true
    },
    "plugins": [
      ["expo-localization", {
        "supportedLocales": {
          "ios": ["en", "he", "ar"],
          "android": ["en", "he", "ar"]
        }
      }]
    ]
  }
}
```

For testing RTL, add `"forcesRTL": true` to the config (remove before production).

---

## 3. Translation File Structure

### Recommended: Namespace-Split Nested JSON

For a production Expo app, use **namespace-split nested JSON** following i18next conventions.

### Directory Structure

```
src/
  i18n/
    i18n.ts              # i18next initialization
    locales/
      en/
        common.json      # Shared strings (buttons, labels, errors)
        discover.json    # DiscoverScreen strings
        matches.json     # MatchesScreen strings
        chat.json        # ChatScreen strings
        profile.json     # ProfileScreen strings
        auth.json        # Login/Register strings
        jobs.json        # Job-related strings
      he/
        common.json
        discover.json
        matches.json
        chat.json
        profile.json
        auth.json
        jobs.json
      ar/
        common.json
        discover.json
        ...
```

### Key Naming Convention

Use semantic, dot-separated identifiers:

```json
// en/auth.json
{
  "login": {
    "title": "Welcome Back",
    "email_label": "Email",
    "password_label": "Password",
    "submit_button": "Sign In",
    "no_account": "Don't have an account?",
    "register_link": "Register"
  },
  "register": {
    "title": "Create Account",
    "submit_button": "Sign Up"
  }
}
```

**Do NOT use the English string as the key** (e.g., `"Welcome Back": "Welcome Back"`). This creates problems at scale and when the English copy changes.

### Best Practices from i18next Documentation

- **Minimize interpolation.** When values are known at build time, create separate self-contained strings rather than interpolating. Interpolation causes grammatical problems in languages where articles/adjectives change based on noun properties.
- **Use Context and Plurals** instead of conditional logic in code.
- **Lazy-load namespaces** per screen to reduce initial bundle size.

---

## 4. Font Loading for RTL Languages (Arabic, Hebrew)

### Considerations with expo-font

- **expo-font supports:** `.ttf` and `.otf` on both platforms; `.woff` and `.woff2` on iOS only
- **System fonts:** iOS and Android include built-in Arabic and Hebrew fonts, so basic rendering works without custom fonts
- **Custom fonts:** If using a brand font (e.g., Plus Jakarta Sans), it likely does NOT include Arabic/Hebrew glyphs. You need separate font files for these scripts.

### Language-Aware Font Strategy

Create a language-aware Text component that maps fonts to language scripts:

```typescript
const getFontFamily = (language: string): string => {
  switch (language) {
    case 'ar':
      return 'NotoSansArabic';
    case 'he':
      return 'NotoSansHebrew';
    default:
      return 'PlusJakartaSans';
  }
};
```

### Font Recommendations for Arabic/Hebrew

- **Noto Sans Arabic** and **Noto Sans Hebrew** (Google Fonts) -- free, high quality, multiple weights
- Load all language fonts at startup using `useFonts` hook
- Ensure font files cover all needed weights (Regular, Medium, Bold, etc.)

### WritingDirection Property

For TextInput components with RTL languages, set `writingDirection` explicitly:

```typescript
<TextInput
  style={{ writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' }}
/>
```

This ensures correct cursor positioning and text flow direction.

---

## 5. React Navigation 7 RTL Support

### Auto-Handling

React Navigation attempts to handle RTL layouts, but the team acknowledges **limited RTL testing bandwidth**. It reads `I18nManager.isRTL` and adjusts:

- Stack navigator back button direction
- Slide animations (left-to-right becomes right-to-left)
- Header layout

### What You Need to Configure

1. **Drawer Navigator:** Set `drawerPosition` based on `I18nManager.isRTL`:
   ```typescript
   <Drawer.Navigator
     screenOptions={{
       drawerPosition: I18nManager.isRTL ? 'right' : 'left',
     }}
   >
   ```

2. **Custom Tab Bar:** The Lynq app uses a custom `BottomTabBar`. Ensure tab order respects RTL by checking `I18nManager.isRTL` if tabs have directional meaning.

3. **Gesture Navigation:** Swipe-back gestures in stack navigators should auto-flip, but test thoroughly.

4. **Custom Header Components:** Any custom header with absolute positioning or directional icons needs manual RTL handling.

### Known Limitations

- Cannot change drawer position after the app loads; must be set at initialization
- Some transition animations may not perfectly mirror in RTL
- Third-party navigation add-ons may not respect RTL

---

## 6. Common RTL Pitfalls in React Native

### Icons That Need Flipping

Directional icons must be manually flipped. React Native does NOT auto-flip images or icons.

```typescript
const DirectionalIcon = ({ name, size, color }) => (
  <Ionicons
    name={name}
    size={size}
    color={color}
    style={{
      transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }],
    }}
  />
);
```

**Icons that NEED flipping:**
- Back/forward arrows (chevron-back, chevron-forward)
- Navigation arrows
- Send button icons
- Progress indicators with direction

**Icons that should NOT be flipped:**
- Checkmarks
- Close/X icons
- Plus/minus icons
- Heart/star icons
- Media controls (play/pause) -- these are universal

### Animations

- `translateX` in Animated API does NOT auto-flip in RTL mode. This is a known React Native issue.
- Manually negate translateX values when `I18nManager.isRTL` is true
- Gesture-based animations (swipe cards in DiscoverScreen) need RTL-aware direction logic

### Absolute Positioning

- `left` and `right` in absolute positioning do NOT auto-swap in RTL
- Replace with `start` and `end` logical properties
- If using `position: 'absolute'`, audit every instance

### Text Alignment

- Use `textAlign: 'start'` instead of `textAlign: 'left'`
- TextInput requires explicit `writingDirection` property for correct cursor behavior
- Placeholder text alignment may need separate handling

### Shadows and Offsets

- `shadowOffset.width` does not auto-flip
- If shadows indicate depth/direction, conditionally negate the width value

### FlatList and ScrollView

- `FlatList` horizontal scroll direction does NOT auto-reverse
- Use `inverted` prop or manually handle with `I18nManager.isRTL`

### Third-Party Libraries

- Many third-party components do NOT respect `I18nManager.isRTL`
- Audit all third-party UI components for RTL compatibility
- Common offenders: charts, carousels, date pickers, custom modals

### Architectural Recommendation

Move RTL logic into design system primitives (a custom `Row` component, a `DirectionalIcon` component, etc.) rather than sprinkling conditional checks throughout the codebase.

---

## 7. expo-localization Integration

### Detecting Device Locale

```typescript
import { getLocales, getCalendars } from 'expo-localization';

// Get device language
const deviceLocale = getLocales()[0];
// deviceLocale.languageCode  -> "en", "he", "ar"
// deviceLocale.languageTag   -> "en-US", "he-IL", "ar-SA"
// deviceLocale.regionCode    -> "US", "IL", "SA"
// deviceLocale.textDirection -> "ltr" or "rtl"

// Get calendar info
const calendar = getCalendars()[0];
// calendar.timeZone, calendar.uses24hourClock, etc.
```

### Responding to Locale Changes

**iOS:** The app automatically resets when the device language changes. No extra handling needed.

**Android:** The app does NOT reset. Listen for `AppState` changes:

```typescript
import { AppState } from 'react-native';
import { getLocales } from 'expo-localization';

useEffect(() => {
  const subscription = AppState.addEventListener('change', (nextAppState) => {
    if (nextAppState === 'active') {
      const newLocale = getLocales()[0].languageCode;
      // Update i18next language if changed
      if (newLocale !== i18n.language) {
        i18n.changeLanguage(newLocale);
      }
    }
  });
  return () => subscription.remove();
}, []);
```

### Declaring Supported Locales

In `app.json` (required for proper locale detection on both platforms):

```json
{
  "expo": {
    "plugins": [
      ["expo-localization", {
        "supportedLocales": {
          "ios": ["en", "he", "ar"],
          "android": ["en", "he", "ar"]
        }
      }]
    ]
  }
}
```

### Full Integration Example (react-i18next + expo-localization)

```typescript
// src/i18n/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import AsyncStorage from '@react-native-async-storage/async-storage';

import en_common from './locales/en/common.json';
import en_auth from './locales/en/auth.json';
import he_common from './locales/he/common.json';
import he_auth from './locales/he/auth.json';

const LANGUAGE_STORAGE_KEY = '@lynq_language';

const resources = {
  en: { common: en_common, auth: en_auth },
  he: { common: he_common, auth: he_auth },
};

const getStoredLanguage = async (): Promise<string> => {
  const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (stored) return stored;
  return getLocales()[0]?.languageCode ?? 'en';
};

const initI18n = async () => {
  const lng = await getStoredLanguage();

  await i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: 'en',
    defaultNS: 'common',
    ns: ['common', 'auth'],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
};

initI18n();

export default i18n;
```

```typescript
// Usage in a component
import { useTranslation } from 'react-i18next';

const LoginScreen = () => {
  const { t } = useTranslation('auth');

  return (
    <View>
      <Text>{t('login.title')}</Text>
      <Button title={t('login.submit_button')} />
    </View>
  );
};
```

---

## Implementation Recommendations for Lynq App

### Phase 1: Foundation
1. Install `react-i18next`, `i18next`, `expo-localization`, `@react-native-async-storage/async-storage`
2. Create `src/i18n/` directory with i18n.ts initialization
3. Extract all English strings from screens into namespace JSON files
4. Import `i18n.ts` at the top of `App.tsx` before any rendering

### Phase 2: RTL Infrastructure
1. Add `supportsRTL: true` to `app.json`
2. Create RTL-aware primitives: `DirectionalIcon`, `Row` component
3. Audit and replace all `left`/`right` style properties with `start`/`end`
4. Audit absolute positioning throughout the app
5. Test DiscoverScreen swipe animations with RTL

### Phase 3: Hebrew/Arabic Translations
1. Add Noto Sans Hebrew and Noto Sans Arabic font files
2. Create language-aware font selection in theme
3. Translate all namespace files
4. Add in-app language switcher (Profile screen)
5. Handle `I18nManager.allowRTL(true)` + app restart flow

### Phase 4: Testing and Polish
1. Test every screen in RTL mode
2. Test React Navigation transitions in RTL
3. Test TextInput cursor/writing direction
4. Test third-party components (any charts, custom modals)
5. Test on both iOS and Android

---

## Sources

- [Best i18n Libraries for Next.js, React & React Native in 2026 - DEV Community](https://dev.to/erayg/best-i18n-libraries-for-nextjs-react-react-native-in-2026-honest-comparison-3m8f)
- [i18n in React Native with Expo - DEV Community](https://dev.to/lucasferreiralimax/i18n-in-react-native-with-expo-2j0j)
- [Expo Localization Documentation](https://docs.expo.dev/guides/localization/)
- [Expo Localization SDK Reference](https://docs.expo.dev/versions/latest/sdk/localization/)
- [I18nManager - React Native Documentation](https://reactnative.dev/docs/next/i18nmanager)
- [Architecting RTL in React Native: What Breaks and What Works - Medium](https://medium.com/@ancybhairavi/architecting-rtl-in-react-native-what-breaks-and-what-works-8d96c8cba62b)
- [Implementing RTL in React Native Expo - GeekyAnts](https://geekyants.com/blog/implementing-rtl-right-to-left-in-react-native-expo---a-step-by-step-guide)
- [React Navigation Limitations](https://reactnavigation.org/docs/limitations/)
- [Mastering Padding Left and Right in React Native: RTL Support](https://copyprogramming.com/howto/right-to-left-in-react-native)
- [JSON Translation Files: Formats, Structure, and Best Practices](https://better-i18n.com/en/blog/json-translation-files/)
- [i18next Namespaces Documentation](https://www.i18next.com/principles/namespaces)
- [i18next Best Practices Documentation](https://www.i18next.com/principles/best-practices)
- [Multiple Translation Files - react-i18next](https://react.i18next.com/guides/multiple-translation-files)
- [Implementing Internationalization in Expo + React Native - Medium](https://medium.com/@kgkrool/implementing-internationalization-in-expo-react-native-i18next-expo-localization-8ed810ad4455)
- [Expo and React Native i18n - Intlayer](https://intlayer.org/doc/environment/react-native-and-expo)
- [Expo Font Documentation](https://docs.expo.dev/versions/latest/sdk/font/)
- [Curated List: Best Libraries for React I18n - Phrase](https://phrase.com/blog/posts/react-i18n-best-libraries/)
- [A Comprehensive Guide to React Native Localization - Phrase](https://phrase.com/blog/posts/react-native-i18n-with-expo-and-i18next-part-1/)
- [Animation translateX does not flip in RTL mode - GitHub Issue](https://github.com/facebook/react-native/issues/29060)
- [RTL Layout Direction Not Updating - GitHub Issue](https://github.com/facebook/react-native/issues/45661)
- [Building a React Native App for 20+ Languages - DEV Community](https://dev.to/pocket_linguist/building-a-react-native-app-for-20-languages-lessons-in-i18n-378d)
