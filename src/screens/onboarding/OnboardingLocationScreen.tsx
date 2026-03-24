import { Ionicons } from "@expo/vector-icons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { GradientButton } from "../../components/GradientButton";
import { OnboardingLayout } from "../../components/OnboardingLayout";
import { radius, spacing, typography } from "../../constants/theme";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../hooks/useTheme";
import { supabase } from "../../lib/supabase";
import type { OnboardingStackParamList } from "../../navigation/OnboardingNavigator";

type Props = NativeStackScreenProps<OnboardingStackParamList, "Location">;

/** Normalize free-text location input into clean "City, State" format. */
async function normalizeLocation(input: string): Promise<string | null> {
  try {
    const coords = await Location.geocodeAsync(input);
    if (coords.length === 0) return null;

    const [result] = await Location.reverseGeocodeAsync({
      latitude: coords[0].latitude,
      longitude: coords[0].longitude,
    });

    if (!result) return null;

    const city = result.city ?? result.subregion ?? "";
    const region = result.region ?? "";
    const clean = [city, region].filter(Boolean).join(", ");
    return clean || null;
  } catch {
    return null;
  }
}

export function OnboardingLocationScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { uid, onboardingProfile } = useAuth();
  const [location, setLocation] = useState(onboardingProfile.location ?? "");
  const [detecting, setDetecting] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleTranslateY = useRef(new Animated.Value(20)).current;
  const formOpacity = useRef(new Animated.Value(0)).current;
  const formTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.stagger(150, [
      Animated.parallel([
        Animated.timing(titleOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(titleTranslateY, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
      ]),
      Animated.parallel([
        Animated.timing(formOpacity, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.spring(formTranslateY, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true }),
      ]),
    ]).start();
  }, [titleOpacity, titleTranslateY, formOpacity, formTranslateY]);

  const detectLocation = useCallback(async () => {
    setDetecting(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setDetecting(false);
        return;
      }

      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const [result] = await Location.reverseGeocodeAsync({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });

      if (result) {
        const city = result.city ?? result.subregion ?? "";
        const region = result.region ?? "";
        setLocation([city, region].filter(Boolean).join(", "));
      }
    } catch {
      // GPS failed silently — user can type manually
    } finally {
      setDetecting(false);
    }
  }, []);

  const handleContinue = useCallback(async () => {
    if (!uid || !location.trim()) return;

    setSubmitting(true);
    try {
      // Normalize input via geocode → reverse geocode
      const normalized = await normalizeLocation(location.trim());
      const cleanLocation = normalized ?? location.trim();

      await supabase
        .from("app_users")
        .update({ location: cleanLocation })
        .eq("authId", uid);

      setLocation(cleanLocation);
    } catch {
      // Non-blocking — save raw input
      try {
        await supabase
          .from("app_users")
          .update({ location: location.trim() })
          .eq("authId", uid);
      } catch {
        // Silent
      }
    }
    setSubmitting(false);
    navigation.navigate("Role");
  }, [uid, location, navigation]);

  return (
    <OnboardingLayout step={3}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <View style={styles.content}>
          <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }}>
            <Text style={[styles.title, { color: colors.text }]}>
              איפה אתם נמצאים?
            </Text>
          </Animated.View>

          <Animated.View style={{ opacity: formOpacity, transform: [{ translateY: formTranslateY }] }}>
            {/* GPS button */}
            <Pressable
              style={[styles.gpsButton, { backgroundColor: colors.accentSoft, borderColor: colors.borderAccent }]}
              onPress={detectLocation}
              disabled={detecting}
            >
              {detecting ? (
                <ActivityIndicator size="small" color={colors.accent} />
              ) : (
                <Ionicons name="navigate" size={20} color={colors.accent} />
              )}
              <Text style={[styles.gpsText, { color: colors.accent }]}>
                {detecting ? "מאתר..." : "השתמש במיקום שלי"}
              </Text>
            </Pressable>

            <Text style={[styles.orText, { color: colors.textTertiary }]}>או הקלידו</Text>

            {/* Manual input */}
            <View style={[styles.inputWrap, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={location}
                onChangeText={setLocation}
                placeholder="תל אביב"
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="words"
                editable={!submitting && !detecting}
              />
            </View>
          </Animated.View>

          <View style={styles.spacer} />

          <GradientButton
            label="המשך"
            onPress={handleContinue}
            loading={submitting}
            disabled={!location.trim()}
            large
          />
        </View>
      </KeyboardAvoidingView>
    </OnboardingLayout>
  );
}

const styles = StyleSheet.create({
  keyboard: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1.2,
    marginBottom: spacing.xxxl,
    textAlign: "right",
    writingDirection: "rtl",
  },
  gpsButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.md,
    paddingVertical: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.xl,
  },
  gpsText: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "right",
    writingDirection: "rtl",
  },
  orText: {
    ...typography.bodySmall,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  inputWrap: {
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  input: {
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: spacing.xs,
    textAlign: "right",
    writingDirection: "rtl",
  },
  spacer: { flex: 1 },
});
