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
import { colors, radius, spacing } from "../constants/theme";
import { useAuth } from "../context/AuthContext";
import type { AuthStackParamList } from "../navigation/AuthNavigator";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
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
    <LinearGradient colors={["#FAF5FF", "#FDF2F8"]} style={styles.gradient}>
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboard}
        >
          <View style={styles.content}>
            <Text style={styles.title}>Welcome back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor={colors.gray400}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
              editable={!loading}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={colors.gray400}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              editable={!loading}
            />

            <Pressable
              onPress={handleLogin}
              style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
              disabled={loading}
            >
              <LinearGradient
                colors={[colors.purple500, colors.pink500]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={styles.buttonGradient}
              >
                {loading ? (
                  <ActivityIndicator color={colors.white} />
                ) : (
                  <Text style={styles.buttonText}>Log in</Text>
                )}
              </LinearGradient>
            </Pressable>

            <Pressable
              onPress={() => navigation.navigate("Register")}
              style={({ pressed }) => [styles.link, pressed && styles.linkPressed]}
              disabled={loading}
            >
              <Text style={styles.linkText}>Don't have an account? Sign up</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: { flex: 1 },
  safe: { flex: 1 },
  keyboard: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: spacing.xxl,
    paddingTop: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.gray900,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray500,
    marginBottom: 32,
  },
  input: {
    height: 52,
    backgroundColor: colors.white,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    fontSize: 16,
    color: colors.gray900,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.gray200,
  },
  button: {
    marginTop: 8,
    marginBottom: spacing.xl,
    borderRadius: radius.pill,
    overflow: "hidden",
  },
  buttonPressed: { opacity: 0.9 },
  buttonGradient: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },
  link: {
    alignSelf: "center",
    padding: spacing.md,
  },
  linkPressed: { opacity: 0.7 },
  linkText: {
    color: colors.purple500,
    fontSize: 15,
    fontWeight: "600",
  },
});
