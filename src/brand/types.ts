import type { SupportedLanguage } from "../i18n/i18n";

export interface BrandConfig {
  /** Brand identifier */
  readonly id: "lynq" | "jobli";
  /** Display name */
  readonly name: string;
  /** Default language for this brand */
  readonly defaultLanguage: SupportedLanguage;
  /** iOS bundle identifier */
  readonly iosBundleId: string;
  /** Android package name */
  readonly androidPackage: string;
  /** App Store / Play Store scheme */
  readonly scheme: string;
  /** Supabase config */
  readonly supabase: {
    readonly url: string;
    readonly anonKey: string;
  };
}
