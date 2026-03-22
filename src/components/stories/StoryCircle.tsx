import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Image } from "expo-image";
import { typography } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";
import { TIER_CONFIG, type CompanyStory, type TierConfig } from "../../types/story";

// The ring is built with 3 concentric layers:
//   1. Outer: LinearGradient circle (the colored ring)
//   2. Middle: Dark spacer circle (creates the gap between ring and logo)
//   3. Inner: White circle with the company logo
//
// Ring thickness = (outerSize - innerLogoSize) / 2
// The dark spacer is 3px smaller on each side than the gradient.

const SPACER_INSET = 3; // px inset from gradient edge to start of dark gap

interface StoryCircleProps {
  story: CompanyStory;
  isSeen: boolean;
  onPress: (story: CompanyStory) => void;
}

export function StoryCircle({ story, isSeen, onPress }: StoryCircleProps) {
  const { colors } = useTheme();
  const config = TIER_CONFIG[story.tier];

  // Press animation
  const scaleAnim = useRef(new Animated.Value(1)).current;
  // Ring animations
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isSeen) return;

    if (config.ringAnimation === "spin") {
      const spin = Animated.loop(
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      );
      spin.start();
      return () => spin.stop();
    }

    if (config.ringAnimation === "pulse") {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 0.6,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1200,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [config.ringAnimation, isSeen, rotationAnim, pulseAnim]);

  const handlePressIn = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  }, [scaleAnim]);

  const handlePressOut = useCallback(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 200,
      friction: 15,
    }).start();
  }, [scaleAnim]);

  const handlePress = useCallback(() => {
    onPress(story);
  }, [onPress, story]);

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Sizes
  const outerSize = config.circleSize;
  const spacerSize = outerSize - SPACER_INSET * 2;
  const logoContainerSize = spacerSize - 4; // 2px gap on each side inside spacer
  const logoImageSize = logoContainerSize - 6; // 3px padding inside white circle

  const ringColors: [string, string] = isSeen
    ? ["rgba(255,255,255,0.2)", "rgba(255,255,255,0.2)"]
    : [story.brandColors.primary, story.brandColors.secondary];

  const ringAnimStyle = (() => {
    if (isSeen) return { opacity: 1 };
    if (config.ringAnimation === "pulse") return { opacity: pulseAnim };
    if (config.ringAnimation === "spin") {
      return { transform: [{ rotate: rotation }] };
    }
    return {};
  })();

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.container}
        accessibilityLabel={`${story.companyName} story${isSeen ? "" : ", new"}`}
        accessibilityRole="button"
      >
        {/* Outer: Gradient ring */}
        <Animated.View
          style={[
            styles.outerRing,
            {
              width: outerSize,
              height: outerSize,
              borderRadius: outerSize / 2,
            },
            ringAnimStyle,
          ]}
        >
          <LinearGradient
            colors={ringColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: outerSize,
              height: outerSize,
              borderRadius: outerSize / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* Middle: Dark spacer (matches background) */}
            <View
              style={{
                width: spacerSize,
                height: spacerSize,
                borderRadius: spacerSize / 2,
                backgroundColor: colors.bg,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Inner: White logo circle */}
              <View
                style={{
                  width: logoContainerSize,
                  height: logoContainerSize,
                  borderRadius: logoContainerSize / 2,
                  backgroundColor: "#FFFFFF",
                  justifyContent: "center",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: story.companyLogo }}
                  style={{
                    width: logoImageSize,
                    height: logoImageSize,
                  }}
                  contentFit="contain"
                />
              </View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* NEW badge */}
        {!isSeen && (
          <NewBadge
            config={config}
            outerSize={outerSize}
            accentColor={colors.accent}
            bgColor={colors.bg}
          />
        )}

        {/* Company name */}
        <Text
          style={[
            styles.label,
            {
              color: isSeen ? colors.textTertiary : colors.textSecondary,
              width: outerSize + 16,
            },
          ]}
          numberOfLines={1}
        >
          {story.companyName}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

// ─── NEW Badge ──────────────────────────────────────────────────────────────

function NewBadge({
  config,
  outerSize,
  accentColor,
  bgColor,
}: {
  config: TierConfig;
  outerSize: number;
  accentColor: string;
  bgColor: string;
}) {
  const size = config.badgeSize;
  // Position at top-right of the outer ring
  const offset = outerSize * 0.15;

  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: accentColor,
          borderColor: bgColor,
          top: offset,
          right: offset - size / 2,
        },
      ]}
    />
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 6,
  },
  outerRing: {
    overflow: "hidden",
  },
  badge: {
    position: "absolute",
    borderWidth: 2,
    zIndex: 5,
  },
  label: {
    ...typography.caption,
    textAlign: "center",
  },
});
