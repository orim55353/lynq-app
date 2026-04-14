import type { BrandConfig } from "./types";

export const lynqBrand: BrandConfig = {
  id: "lynq",
  name: "Lynq",
  defaultLanguage: "en",
  iosBundleId: "com.lynq.app",
  androidPackage: "com.lynq.app",
  scheme: "com.lynq.app",
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  },
};
