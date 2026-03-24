import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthLayout } from "../components/AuthLayout";
import { GradientButton } from "../components/GradientButton";
import { radius, spacing, typography } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";
import type { AuthStackParamList } from "../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "Register">;

/** Glass input with focus animation */
function GlassInput({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
  autoComplete,
  editable,
  opacity,
  translateY,
}: {
  readonly label: string;
  readonly value: string;
  readonly onChangeText: (t: string) => void;
  readonly placeholder: string;
  readonly secureTextEntry?: boolean;
  readonly autoCapitalize?: "none" | "sentences";
  readonly keyboardType?: "email-address" | "default";
  readonly autoComplete?: "email" | "password" | "new-password";
  readonly editable?: boolean;
  readonly opacity: Animated.Value;
  readonly translateY: Animated.Value;
}) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);
  const borderAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = useCallback(() => {
    setFocused(true);
    Animated.timing(borderAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [borderAnim]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    Animated.timing(borderAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [borderAnim]);

  const borderColor = borderAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.glassBorder, colors.accent],
  });

  return (
    <Animated.View style={[styles.inputWrap, { opacity, transform: [{ translateY }] }]}>
      <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>
        {label}
      </Text>
      <Animated.View
        style={[
          styles.inputContainer,
          {
            backgroundColor: focused ? colors.glassHeavy : colors.glass,
            borderColor,
          },
        ]}
      >
        <TextInput
          style={[styles.input, { color: colors.text }]}
          placeholder={placeholder}
          placeholderTextColor={colors.textTertiary}
          defaultValue={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          autoCapitalize={autoCapitalize}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          editable={editable}
        />
      </Animated.View>
    </Animated.View>
  );
}

export function RegisterScreen({ navigation }: Props) {
  const { register } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Staggered entrance: title(0), subtitle(100), email(250), password(350), confirm(450), button(550)
  const anims = useRef(
    Array.from({ length: 7 }, () => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(15),
    })),
  ).current;

  useEffect(() => {
    const delays = [0, 100, 250, 350, 450, 550, 600];
    const animations = anims.flatMap((anim, i) => [
      Animated.timing(anim.opacity, {
        toValue: 1,
        duration: 300,
        delay: delays[i],
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(anim.translateY, {
        toValue: 0,
        duration: 300,
        delay: delays[i],
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]);
    Animated.parallel(animations).start();
  }, [anims]);

  const handleRegister = useCallback(async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password || !confirmPassword) {
      Alert.alert("שגיאה", "נא למלא את כל השדות.");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("שגיאה", "הסיסמאות לא תואמות.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("שגיאה", "הסיסמה חייבת להכיל לפחות 6 תווים.");
      return;
    }
    setLoading(true);
    try {
      await register(trimmedEmail, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "ההרשמה נכשלה.";
      Alert.alert("ההרשמה נכשלה", message);
    } finally {
      setLoading(false);
    }
  }, [email, password, confirmPassword, register]);

  return (
    <AuthLayout
      linkPrefix="כבר יש לכם חשבון?"
      linkAction="התחברות"
      onLinkPress={() => navigation.navigate("Login")}
      linkDisabled={loading}
    >
      <Animated.View
        style={{
          opacity: anims[0].opacity,
          transform: [{ translateY: anims[0].translateY }],
        }}
      >
        <Text style={[styles.title, { color: colors.text }]}>יצירת חשבון</Text>
      </Animated.View>

      <Animated.View
        style={{
          opacity: anims[1].opacity,
          transform: [{ translateY: anims[1].translateY }],
          marginBottom: spacing.xxl,
        }}
      >
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          הצטרפו לדרך המהירה למצוא את התפקיד הבא
        </Text>
      </Animated.View>

      <GlassInput
        label="אימייל"
        value={email}
        onChangeText={setEmail}
        placeholder="you@email.com"
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        editable={!loading}
        opacity={anims[2].opacity}
        translateY={anims[2].translateY}
      />

      <GlassInput
        label="סיסמה"
        value={password}
        onChangeText={setPassword}
        placeholder="לפחות 6 תווים"
        secureTextEntry
        autoComplete="new-password"
        editable={!loading}
        opacity={anims[3].opacity}
        translateY={anims[3].translateY}
      />

      <GlassInput
        label="אימות סיסמה"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholder="חזרו על הסיסמה"
        secureTextEntry
        autoComplete="new-password"
        editable={!loading}
        opacity={anims[4].opacity}
        translateY={anims[4].translateY}
      />

      <Animated.View
        style={[
          styles.buttonWrap,
          {
            opacity: anims[5].opacity,
            transform: [{ translateY: anims[5].translateY }],
          },
        ]}
      >
        <GradientButton
          label="הרשמה"
          onPress={handleRegister}
          loading={loading}
          large
          height={56}
        />
      </Animated.View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    ...typography.displayLarge,
    marginBottom: spacing.xs,
    textAlign: "right" as const,
    writingDirection: "rtl" as const,
  },
  subtitle: {
    ...typography.body,
    textAlign: "right" as const,
    writingDirection: "rtl" as const,
  },
  inputWrap: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...typography.label,
    marginBottom: spacing.sm,
    textAlign: "right" as const,
    writingDirection: "rtl" as const,
  },
  inputContainer: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  input: {
    fontSize: 15,
    fontWeight: "400" as const,
    flex: 1,
    padding: 0,
    textAlign: "right" as const,
    writingDirection: "rtl" as const,
  },
  buttonWrap: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});
