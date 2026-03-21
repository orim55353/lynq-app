import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { radius, shadows, spacing, typography } from "../constants/theme";
import { accentGradient } from "../constants/gradients";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../hooks/useTheme";
import type { AuthStackParamList } from "../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboard}
        >
          <View style={styles.content}>
            <View style={styles.brandRow}>
              <View style={[styles.brandIcon, shadows.glow, { backgroundColor: colors.accent }]}>
                <Text style={styles.brandBolt}>&#9889;</Text>
              </View>
              <Text style={[styles.brandName, { color: colors.text }]}>Lynq</Text>
            </View>

            <Text style={[styles.title, { color: colors.text }]}>Welcome back</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Sign in to continue your job search</Text>

            <View style={styles.inputWrap}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Email</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.bgSubtle, color: colors.text }]}
                placeholder="you@email.com"
                placeholderTextColor={colors.textTertiary}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
                editable={!loading}
              />
            </View>

            <View style={styles.inputWrap}>
              <Text style={[styles.inputLabel, { color: colors.textSecondary }]}>Password</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colors.bgSubtle, color: colors.text }]}
                placeholder="Enter your password"
                placeholderTextColor={colors.textTertiary}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
                editable={!loading}
              />
            </View>

            <Pressable
              onPress={handleLogin}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              disabled={loading}
            >
              <LinearGradient
                colors={accentGradient}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[styles.buttonGradient, shadows.glow]}
              >
                {loading ? (
                  <ActivityIndicator color={colors.textInverse} />
                ) : (
                  <Text style={[styles.buttonText, { color: colors.textInverse }]}>Log in</Text>
                )}
              </LinearGradient>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
              disabled={loading}
            >
              <Text style={[styles.linkText, { color: colors.textSecondary }]}>
                Don't have an account? <Text style={{ color: colors.accent, fontWeight: "700" }}>Sign up</Text>
              </Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safe: { flex: 1 },
  keyboard: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: spacing.huge,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginBottom: spacing.xxxl,
  },
  brandIcon: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    justifyContent: "center",
    alignItems: "center",
  },
  brandBolt: { fontSize: 22, color: "#FFFFFF" },
  brandName: { fontSize: 28, fontWeight: "800", letterSpacing: -1 },
  title: { ...typography.displayLarge, marginBottom: spacing.xs },
  subtitle: { ...typography.body, marginBottom: spacing.xxxl },
  inputWrap: { marginBottom: spacing.lg },
  inputLabel: { ...typography.label, marginBottom: spacing.sm, textTransform: "uppercase" },
  input: {
    height: 52,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    ...typography.body,
  },
  button: { marginTop: spacing.lg, marginBottom: spacing.xl, borderRadius: radius.pill, overflow: "hidden" },
  buttonPressed: { opacity: 0.9 },
  buttonGradient: { height: 56, borderRadius: radius.pill, justifyContent: "center", alignItems: "center" },
  buttonText: { ...typography.button },
  link: { alignSelf: "center", padding: spacing.md },
  linkPressed: { opacity: 0.7 },
  linkText: { ...typography.body },
});
