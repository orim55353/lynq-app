import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
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

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

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

export function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Staggered entrance: title(0), subtitle(100), email(250), password(350), button(450), link(500)
  const anims = useRef(
    Array.from({ length: 6 }, () => ({
      opacity: new Animated.Value(0),
      translateY: new Animated.Value(15),
    })),
  ).current;

  useEffect(() => {
    const delays = [0, 100, 250, 350, 450, 500];
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

  const handleLogin = useCallback(async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      Alert.alert("Error", "Please enter email and password.");
      return;
    }
    setLoading(true);
    try {
      await signIn(trimmedEmail, password);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed.";
      Alert.alert("Login failed", message);
    } finally {
      setLoading(false);
    }
  }, [email, password, signIn]);

  return (
    <AuthLayout
      linkPrefix="Don't have an account?"
      linkAction="Sign up"
      onLinkPress={() => navigation.navigate("Register")}
      linkDisabled={loading}
    >
      <Animated.View
        style={{
          opacity: anims[0].opacity,
          transform: [{ translateY: anims[0].translateY }],
        }}
      >
        <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
      </Animated.View>

      <Animated.View
        style={{
          opacity: anims[1].opacity,
          transform: [{ translateY: anims[1].translateY }],
          marginBottom: spacing.xxxl,
        }}
      >
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Sign in to continue your job search
        </Text>
      </Animated.View>

      <GlassInput
        label="Email"
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
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        autoComplete="password"
        editable={!loading}
        opacity={anims[3].opacity}
        translateY={anims[3].translateY}
      />

      <Animated.View
        style={[
          styles.buttonWrap,
          {
            opacity: anims[4].opacity,
            transform: [{ translateY: anims[4].translateY }],
          },
        ]}
      >
        <GradientButton
          label="Log in"
          onPress={handleLogin}
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
  },
  subtitle: {
    ...typography.body,
  },
  inputWrap: {
    marginBottom: spacing.lg,
  },
  inputLabel: {
    ...typography.label,
    marginBottom: spacing.sm,
    textTransform: "uppercase",
  },
  inputContainer: {
    height: 52,
    borderRadius: radius.md,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  input: {
    ...typography.body,
    flex: 1,
  },
  buttonWrap: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});
