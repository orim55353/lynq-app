import type { BrandConfig } from "./types";

export const jobliBrand: BrandConfig = {
  id: "jobli",
  name: "Jobli",
  defaultLanguage: "he",
  iosBundleId: "com.jobli.app",
  androidPackage: "com.jobli.app",
  scheme: "com.jobli.app",
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL ?? "",
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "",
  },
};
