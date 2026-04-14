import { useCallback, useRef } from "react";
import { Animated } from "react-native";

interface SpringPressConfig {
  /** Scale value when pressed (default 0.95) */
  readonly pressedScale?: number;
  /** Spring tension for press-in (default 300) */
  readonly tensionIn?: number;
  /** Spring friction for press-in (default 20) */
  readonly frictionIn?: number;
  /** Spring tension for release (default 200) */
  readonly tensionOut?: number;
  /** Spring friction for release (default 15) */
  readonly frictionOut?: number;
}

interface SpringPress {
  /** Animated scale value — apply via transform: [{ scale }] */
  readonly scale: Animated.Value;
  /** Attach to Pressable onPressIn */
  readonly onPressIn: () => void;
  /** Attach to Pressable onPressOut */
  readonly onPressOut: () => void;
}

/**
 * Spring-based scale animation for pressable elements.
 * Pattern extracted from StoryCircle.tsx + BottomTabBar.tsx.
 *
 * Usage:
 *   const { scale, onPressIn, onPressOut } = useSpringPress();
 *   <Animated.View style={{ transform: [{ scale }] }}>
 *     <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
 */
export function useSpringPress(config?: SpringPressConfig): SpringPress {
  const pressedScale = config?.pressedScale ?? 0.95;
  const tensionIn = config?.tensionIn ?? 300;
  const frictionIn = config?.frictionIn ?? 20;
  const tensionOut = config?.tensionOut ?? 200;
  const frictionOut = config?.frictionOut ?? 15;

  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = useCallback(() => {
    Animated.spring(scale, {
      toValue: pressedScale,
      tension: tensionIn,
      friction: frictionIn,
      useNativeDriver: true,
    }).start();
  }, [scale, pressedScale, tensionIn, frictionIn]);

  const onPressOut = useCallback(() => {
    Animated.spring(scale, {
      toValue: 1,
      tension: tensionOut,
      friction: frictionOut,
      useNativeDriver: true,
    }).start();
  }, [scale, tensionOut, frictionOut]);

  return { scale, onPressIn, onPressOut };
}
