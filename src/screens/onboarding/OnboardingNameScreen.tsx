import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  KeyboardAvoidingView,
  Platform,
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

type Props = NativeStackScreenProps<OnboardingStackParamList, "Name">;

export function OnboardingNameScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const { user, onboardingProfile } = useAuth();

  // Autofill from saved profile data
  const savedName = onboardingProfile.name ?? "";
  const nameParts = savedName.split(" ");
  const [firstName, setFirstName] = useState(nameParts[0] ?? "");
  const [lastName, setLastName] = useState(nameParts.slice(1).join(" ") ?? "");
  const [submitting, setSubmitting] = useState(false);

  const lastNameRef = useRef<TextInput>(null);
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

  const canSubmit = firstName.trim().length > 0 && lastName.trim().length > 0;

  const handleSubmit = useCallback(async () => {
    if (!canSubmit || !user) return;
    setSubmitting(true);

    const name = `${firstName.trim()} ${lastName.trim()}`;
    const initials = `${firstName.trim()[0]}${lastName.trim()[0]}`.toUpperCase();

    try {
      const now = new Date().toISOString();
      const { error } = await supabase.from("app_users").upsert(
        {
          authId: user.id,
          email: user.email ?? "",
          name,
          initials,
          onboardingCompleted: false,
          createdAt: now,
          updatedAt: now,
        },
        { onConflict: "authId" },
      );

      if (error) {
        console.error("[Onboarding] Failed to create app_users row:", error.message);
        Alert.alert("Something went wrong", "Please try again.");
        return;
      }

      navigation.navigate("Location");
    } catch (err) {
      console.error("[Onboarding] Name submit error:", err);
      Alert.alert("Something went wrong", "Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [canSubmit, user, firstName, lastName, navigation]);

  return (
    <OnboardingLayout step={2}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboard}
      >
        <View style={styles.content}>
          <Animated.View style={{ opacity: titleOpacity, transform: [{ translateY: titleTranslateY }] }}>
            <Text style={[styles.title, { color: colors.text }]}>
              What's your name?
            </Text>
          </Animated.View>

          <Animated.View style={{ opacity: formOpacity, transform: [{ translateY: formTranslateY }] }}>
            <View style={[styles.inputWrap, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>First name</Text>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="John"
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="words"
                autoComplete="given-name"
                returnKeyType="next"
                onSubmitEditing={() => lastNameRef.current?.focus()}
                editable={!submitting}
              />
            </View>

            <View style={[styles.inputWrap, { backgroundColor: colors.glass, borderColor: colors.glassBorder }]}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Last name</Text>
              <TextInput
                ref={lastNameRef}
                style={[styles.input, { color: colors.text }]}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Smith"
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="words"
                autoComplete="family-name"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
                editable={!submitting}
              />
            </View>
          </Animated.View>

          <View style={styles.spacer} />

          <GradientButton
            label="Continue"
            onPress={handleSubmit}
            loading={submitting}
            disabled={!canSubmit}
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
  },
  inputWrap: {
    borderRadius: radius.lg,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...typography.label,
    marginBottom: spacing.xs,
  },
  input: {
    fontSize: 18,
    fontWeight: "600",
    paddingVertical: spacing.xs,
  },
  spacer: { flex: 1 },
});
