import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

// English translations
import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";
import enOnboarding from "./locales/en/onboarding.json";
import enSaved from "./locales/en/saved.json";
import enMatches from "./locales/en/matches.json";
import enChat from "./locales/en/chat.json";
import enProfile from "./locales/en/profile.json";
import enTabs from "./locales/en/tabs.json";

// Hebrew translations
import heCommon from "./locales/he/common.json";
import heAuth from "./locales/he/auth.json";
import heOnboarding from "./locales/he/onboarding.json";
import heSaved from "./locales/he/saved.json";
import heMatches from "./locales/he/matches.json";
import heChat from "./locales/he/chat.json";
import heProfile from "./locales/he/profile.json";
import heTabs from "./locales/he/tabs.json";

export const LANGUAGE_STORAGE_KEY = "@lynq_language";

export const SUPPORTED_LANGUAGES = ["en", "he", "ar"] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const RTL_LANGUAGES: ReadonlySet<string> = new Set(["he", "ar"]);

const enNamespaces = {
  common: enCommon,
  auth: enAuth,
  onboarding: enOnboarding,
  saved: enSaved,
  matches: enMatches,
  chat: enChat,
  profile: enProfile,
  tabs: enTabs,
};

const resources = {
  en: enNamespaces,
  he: {
    common: heCommon,
    auth: heAuth,
    onboarding: heOnboarding,
    saved: heSaved,
    matches: heMatches,
    chat: heChat,
    profile: heProfile,
    tabs: heTabs,
  },
  // Arabic falls back to English until translations are provided.
  ar: enNamespaces,
};

const NAMESPACES = [
  "common",
  "auth",
  "onboarding",
  "saved",
  "matches",
  "chat",
  "profile",
  "tabs",
] as const;

function getDeviceLanguage(): SupportedLanguage {
  const locales = getLocales();
  const deviceLang = locales[0]?.languageCode ?? "en";
  if (SUPPORTED_LANGUAGES.includes(deviceLang as SupportedLanguage)) {
    return deviceLang as SupportedLanguage;
  }
  // Fall back to the brand's default language
  const { brand } = require("../brand");
  return brand.defaultLanguage;
}

async function getStoredLanguage(): Promise<SupportedLanguage> {
  try {
    const stored = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGES.includes(stored as SupportedLanguage)) {
      return stored as SupportedLanguage;
    }
  } catch {
    // Fall through to device language
  }
  return getDeviceLanguage();
}

export async function initI18n(): Promise<void> {
  const lng = await getStoredLanguage();

  // Set RTL direction BEFORE any component renders.
  const shouldBeRTL = RTL_LANGUAGES.has(lng);
  I18nManager.allowRTL(true);
  I18nManager.forceRTL(shouldBeRTL);

  await i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: "en",
    defaultNS: "common",
    ns: [...NAMESPACES],
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    compatibilityJSON: "v4",
  });
}

export async function changeLanguage(lang: SupportedLanguage): Promise<void> {
  await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  await i18n.changeLanguage(lang);
}

export function isRTLLanguage(lang: string): boolean {
  return RTL_LANGUAGES.has(lang);
}

export default i18n;
