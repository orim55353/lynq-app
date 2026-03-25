import { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { matchColor, matchLabel, matchLabelFull } from "../utils/match";

// ─── Types ──────────────────────────────────────────────────────────────────

interface MatchScoreRingProps {
  score: number;
  size: number;
  strokeWidth?: number;
  mode: "dark" | "light";
  animated?: boolean;
  /** Defer animation until this becomes true (e.g., when card scrolls into view) */
  isVisible?: boolean;
  /** "short" = "Strong", "full" = "Strong Match", "none" = no label */
  labelStyle?: "short" | "full" | "none";
}

// ─── Animated SVG circle ────────────────────────────────────────────────────

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

// ─── Mode-aware colors ──────────────────────────────────────────────────────

const ringColors = {
  dark: {
    track: "rgba(255,255,255,0.1)",
    scoreText: "#FFFFFF",
    percentText: "rgba(255,255,255,0.5)",
    labelText: null as string | null, // use matchColor
  },
  light: {
    track: "rgba(255,255,255,0.15)",
    scoreText: "#FFFFFF",
    percentText: "rgba(255,255,255,0.6)",
    labelText: "rgba(255,255,255,0.7)" as string | null, // white — readable over image bg
  },
} as const;

// ─── Component ──────────────────────────────────────────────────────────────

export function MatchScoreRing({
  score,
  size,
  strokeWidth = 5,
  mode,
  animated = true,
  isVisible = true,
  labelStyle = "short",
}: MatchScoreRingProps) {
  const colors = ringColors[mode];
  const color = matchColor(score);
  const label =
    labelStyle === "full"
      ? matchLabelFull(score)
      : labelStyle === "short"
        ? matchLabel(score)
        : null;

  // ─── SVG geometry ─────────────────────────────────────────────────
  const center = size / 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - score / 100);

  // ─── Animation ────────────────────────────────────────────────────
  const shouldAnimate = animated && isVisible;
  const progress = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const hasAnimated = useRef(false);
  const [displayScore, setDisplayScore] = useState(
    animated ? 0 : score,
  );

  useEffect(() => {
    if (!animated) {
      setDisplayScore(score);
      return;
    }

    // Wait until visible, and only animate once
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    progress.setValue(0);
    scale.setValue(1);
    setDisplayScore(0);

    const listenerId = progress.addListener(({ value }) => {
      setDisplayScore(Math.round(value * score));
    });

    Animated.sequence([
      Animated.timing(progress, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.sequence([
        Animated.spring(scale, {
          toValue: 1.04,
          tension: 300,
          friction: 20,
          useNativeDriver: true,
        }),
        Animated.spring(scale, {
          toValue: 1,
          tension: 200,
          friction: 15,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    return () => {
      progress.removeListener(listenerId);
    };
  }, [score, animated, isVisible, progress, scale]);

  // Animated stroke dash offset
  const animatedOffset = shouldAnimate || (animated && hasAnimated.current)
    ? progress.interpolate({
        inputRange: [0, 1],
        outputRange: [circumference, targetOffset],
      })
    : animated && !hasAnimated.current
      ? circumference  // Not yet visible — hide arc
      : targetOffset;  // Not animated — show full arc

  // ─── Font sizes relative to ring size ─────────────────────────────
  const scoreFontSize = size * 0.28;
  const percentFontSize = size * 0.13;
  const labelFontSize = size * 0.09;

  // For very small rings (header), hide percent and label
  const isCompact = size <= 40;

  return (
    <Animated.View
      style={[
        { width: size, height: size, transform: [{ scale }] },
      ]}
    >
      {/* SVG ring */}
      <Svg width={size} height={size} style={styles.svg}>
        {/* Track circle */}
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={colors.track}
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress arc */}
        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animatedOffset}
          rotation={-90}
          origin={`${center}, ${center}`}
        />
      </Svg>

      {/* Center content */}
      <View style={styles.center}>
        <View style={styles.scoreRow}>
          <Text
            style={[
              styles.scoreText,
              {
                fontSize: scoreFontSize,
                color: colors.scoreText,
              },
            ]}
          >
            {displayScore}
          </Text>
          {!isCompact && (
            <Text
              style={[
                styles.percentText,
                {
                  fontSize: percentFontSize,
                  color: colors.percentText,
                },
              ]}
            >
              %
            </Text>
          )}
        </View>
        {label && !isCompact && (
          <Text
            style={[
              styles.labelText,
              {
                fontSize: labelFontSize,
                color: colors.labelText ?? color,
              },
            ]}
            numberOfLines={1}
          >
            {label}
          </Text>
        )}
      </View>
    </Animated.View>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  svg: {
    position: "absolute",
  },
  center: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  scoreRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  scoreText: {
    fontWeight: "900",
    letterSpacing: -1,
  },
  percentText: {
    fontWeight: "700",
    marginTop: 2,
  },
  labelText: {
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginTop: -1,
  },
});
