import { useCallback, useMemo, useRef } from "react";
import { Animated, Easing } from "react-native";

interface EntranceConfig {
  /** Delay between each item's entrance in ms (default 60) */
  readonly staggerMs?: number;
  /** Duration of each item's fade/slide in ms (default 300) */
  readonly durationMs?: number;
  /** Vertical slide distance in px (default 20) */
  readonly slideDistance?: number;
}

interface EntranceAnimations {
  /** Animated opacity values, one per item */
  readonly opacities: readonly Animated.Value[];
  /** Animated translateY values, one per item */
  readonly translateYs: readonly Animated.Value[];
  /** Trigger the staggered entrance. Safe to call multiple times. */
  readonly trigger: () => void;
  /** Reset all values to initial state without animating */
  readonly reset: () => void;
}

/**
 * Staggered fade-in + slide-up entrance for N items.
 * Pattern extracted from ExpandedJobCard.tsx parallel timing animations.
 *
 * Usage:
 *   const { opacities, translateYs, trigger } = useEntranceAnimations(items.length);
 *   useFocusEffect(useCallback(() => { trigger(); }, [trigger]));
 *   // On each item:
 *   <Animated.View style={{ opacity: opacities[i], transform: [{ translateY: translateYs[i] }] }}>
 */
export function useEntranceAnimations(
  itemCount: number,
  config?: EntranceConfig,
): EntranceAnimations {
  const staggerMs = config?.staggerMs ?? 60;
  const durationMs = config?.durationMs ?? 300;
  const slideDistance = config?.slideDistance ?? 20;

  const opacities = useRef<Animated.Value[]>([]);
  const translateYs = useRef<Animated.Value[]>([]);

  // Ensure we have the right number of animated values
  if (opacities.current.length !== itemCount) {
    opacities.current = Array.from({ length: itemCount }, () => new Animated.Value(0));
    translateYs.current = Array.from({ length: itemCount }, () => new Animated.Value(slideDistance));
  }

  const reset = useCallback(() => {
    for (const op of opacities.current) op.setValue(0);
    for (const ty of translateYs.current) ty.setValue(slideDistance);
  }, [slideDistance]);

  const trigger = useCallback(() => {
    reset();

    const animations = opacities.current.flatMap((opacity, i) => {
      const translateY = translateYs.current[i];
      const delay = i * staggerMs;

      return [
        Animated.timing(opacity, {
          toValue: 1,
          duration: durationMs,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: durationMs,
          delay,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ];
    });

    Animated.parallel(animations).start();
  }, [reset, staggerMs, durationMs]);

  const result = useMemo<EntranceAnimations>(
    () => ({
      opacities: opacities.current,
      translateYs: translateYs.current,
      trigger,
      reset,
    }),
    [trigger, reset],
  );

  return result;
}
