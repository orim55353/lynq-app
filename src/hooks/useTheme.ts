import { useColorScheme } from "react-native";
import { themes, cardColors, type ThemeColors, type CardColorScheme } from "../constants/theme";

export interface AppTheme {
  mode: "light" | "dark";
  colors: ThemeColors;
  card: CardColorScheme;
}

/**
 * Returns the active theme based on the device's appearance setting.
 * All screens and components should use this instead of importing `colors` directly.
 */
export function useTheme(): AppTheme {
  const scheme = useColorScheme();
  const mode = scheme === "dark" ? "dark" : "light";

  return {
    mode,
    colors: themes[mode],
    card: cardColors[mode],
  };
}
