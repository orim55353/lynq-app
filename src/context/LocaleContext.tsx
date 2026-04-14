import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { I18nManager, AppState } from "react-native";
import { getLocales } from "expo-localization";
import { useTranslation } from "react-i18next";
import {
  changeLanguage,
  isRTLLanguage,
  type SupportedLanguage,
  SUPPORTED_LANGUAGES,
} from "../i18n/i18n";

interface LocaleContextValue {
  /** Current language code */
  readonly language: SupportedLanguage;
  /** Whether the current language is RTL */
  readonly isRTL: boolean;
  /** Change the app language. Returns true if a restart is needed for RTL change. */
  readonly setLanguage: (lang: SupportedLanguage) => Promise<boolean>;
  /** List of supported language codes */
  readonly supportedLanguages: readonly SupportedLanguage[];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { readonly children: ReactNode }) {
  const { i18n } = useTranslation();
  const [language, setLanguageState] = useState<SupportedLanguage>(
    (i18n.language as SupportedLanguage) ?? "en",
  );
  const isRTL = isRTLLanguage(language);

  // Sync I18nManager RTL state on mount
  useEffect(() => {
    const shouldBeRTL = isRTLLanguage(i18n.language);
    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(shouldBeRTL);
      // Note: RTL change requires app restart to take effect
    }
  }, [i18n.language]);

  // Listen for language changes from i18next (e.g., triggered by Android AppState)
  useEffect(() => {
    const handler = (lng: string) => {
      if (SUPPORTED_LANGUAGES.includes(lng as SupportedLanguage)) {
        setLanguageState(lng as SupportedLanguage);
      }
    };
    i18n.on("languageChanged", handler);
    return () => {
      i18n.off("languageChanged", handler);
    };
  }, [i18n]);

  // On Android, detect if device language changed while app was backgrounded
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      if (nextState === "active") {
        const deviceLang = getLocales()[0]?.languageCode ?? "en";
        // Only auto-switch if user hasn't explicitly chosen a language
        // For now we respect the stored preference — this is just a detection hook
        // that can be enabled when needed.
        void deviceLang;
      }
    });
    return () => subscription.remove();
  }, []);

  const setLanguage = useCallback(
    async (lang: SupportedLanguage): Promise<boolean> => {
      const currentIsRTL = isRTLLanguage(language);
      const newIsRTL = isRTLLanguage(lang);
      const needsRestart = currentIsRTL !== newIsRTL;

      await changeLanguage(lang);
      setLanguageState(lang);

      if (needsRestart) {
        I18nManager.allowRTL(true);
        I18nManager.forceRTL(newIsRTL);
      }

      return needsRestart;
    },
    [language],
  );

  const value: LocaleContextValue = {
    language,
    isRTL,
    setLanguage,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (ctx === null) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return ctx;
}
