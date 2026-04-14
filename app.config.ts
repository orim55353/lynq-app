import type { ExpoConfig, ConfigContext } from "expo/config";

const IS_JOBLI = process.env.EXPO_PUBLIC_BRAND === "jobli";

const brandConfig = IS_JOBLI
  ? {
      name: "Jobli",
      slug: "jobli",
      scheme: "com.jobli.app",
      bundleIdentifier: "com.jobli.app",
      projectId: "c73a6525-420c-44f2-b44e-f4ae7c07e146",
      owner: "lynq-jobs",
      locationPermission: "Jobli משתמשת במיקום שלך כדי להציג משרות קרובות.",
      icon: "./assets/brands/jobli_icon.png",
    }
  : {
      name: "Lynq",
      slug: "lynq",
      scheme: "com.lynq.app",
      bundleIdentifier: "com.lynq.app",
      projectId: "1ef62c07-4667-4445-8bbf-2bfc49b886a1",
      owner: "lynq-jobs",
      locationPermission: "Lynq uses your location to show jobs near you.",
      icon: "./assets/brands/lynq_icon.png",
    };

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: brandConfig.name,
  slug: brandConfig.slug,
  icon: brandConfig.icon,
  version: "1.0.0",
  orientation: "portrait",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  experiments: {
    reactCompiler: true,
  },
  scheme: brandConfig.scheme,
  ios: {
    supportsTablet: true,
    bundleIdentifier: brandConfig.bundleIdentifier,
    infoPlist: {
      NSLocationWhenInUseUsageDescription: brandConfig.locationPermission,
    },
  },
  android: {
    edgeToEdgeEnabled: true,
  },
  web: {
    bundler: "metro",
  },
  extra: {
    eas: {
      projectId: brandConfig.projectId,
    },
  },
  owner: brandConfig.owner,
  runtimeVersion: "1.0.0",
  updates: {
    url: `https://u.expo.dev/${brandConfig.projectId}`,
  },
  plugins: [
    ["expo-localization", { supportsRTL: true }],
    "expo-font",
  ],
});
