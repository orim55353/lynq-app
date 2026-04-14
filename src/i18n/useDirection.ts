import { I18nManager } from "react-native";

/**
 * RTL-aware layout utilities.
 *
 * Use these helpers to get directional values that automatically
 * flip based on the current layout direction.
 */

/** Whether the current layout is RTL */
export const isRTL = (): boolean => I18nManager.isRTL;

/**
 * Returns 1 for LTR, -1 for RTL.
 * Use to multiply translateX values in animations.
 */
export const directionMultiplier = (): number => (I18nManager.isRTL ? -1 : 1);

/**
 * Flip an icon that has directional meaning (arrows, chevrons, send).
 * Returns a transform style that mirrors the icon horizontally in RTL.
 */
export const flipStyle = () =>
  I18nManager.isRTL ? ({ transform: [{ scaleX: -1 }] } as const) : undefined;

/**
 * Returns "row" in LTR and "row-reverse" in RTL.
 * Use for layouts where automatic RN RTL flipping doesn't apply
 * (e.g., absolutely positioned elements that need manual reversal).
 */
export const rowDirection = (): "row" | "row-reverse" =>
  I18nManager.isRTL ? "row-reverse" : "row";

/**
 * Returns the appropriate text alignment for the current direction.
 * "auto" lets React Native handle it, but explicit values are sometimes needed.
 */
export const textAlign = (): "left" | "right" =>
  I18nManager.isRTL ? "right" : "left";
