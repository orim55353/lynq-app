import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { supabase } from "../lib/supabase";
import type { User } from "@supabase/supabase-js";

import type { OnboardingStackParamList } from "../navigation/OnboardingNavigator";

type OnboardingRoute = keyof OnboardingStackParamList;

export interface OnboardingProfile {
  readonly name: string | null;
  readonly location: string | null;
  readonly experience: string | null;
  readonly skills: string[] | null;
}

const EMPTY_PROFILE: OnboardingProfile = { name: null, location: null, experience: null, skills: null };

interface AuthContextValue {
  user: User | null;
  uid: string | null;
  loading: boolean;
  needsOnboarding: boolean;
  onboardingResumeRoute: OnboardingRoute;
  onboardingProfile: OnboardingProfile;
  completeOnboarding: () => void;
  signIn: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);
  const [onboardingResumeRoute, setOnboardingResumeRoute] = useState<OnboardingRoute>("Welcome");
  const [onboardingProfile, setOnboardingProfile] = useState<OnboardingProfile>(EMPTY_PROFILE);

  /** Derive onboarding resume step from which profile fields are already filled. */
  function deriveResumeRoute(profile: {
    name?: string | null;
    location?: string | null;
    experience?: string | null;
    skills?: string[] | null;
  }): OnboardingRoute {
    if (!profile.name) return "Welcome";
    if (!profile.location) return "Location";
    if (!profile.experience) return "Role";
    return "Traits";
  }

  // Check if user has completed onboarding and determine resume step
  const checkOnboardingStatus = useCallback(async (uid: string) => {
    try {
      const { data } = await supabase
        .from("app_users")
        .select("onboardingCompleted, name, location, experience, skills")
        .eq("authId", uid)
        .single();

      if (!data || !data.onboardingCompleted) {
        setNeedsOnboarding(true);
        if (data) {
          setOnboardingResumeRoute(deriveResumeRoute(data));
          setOnboardingProfile({
            name: data.name ?? null,
            location: data.location ?? null,
            experience: data.experience ?? null,
            skills: data.skills ?? null,
          });
        } else {
          setOnboardingResumeRoute("Welcome");
          setOnboardingProfile(EMPTY_PROFILE);
        }
      } else {
        setNeedsOnboarding(false);
      }
    } catch {
      // No row found — needs onboarding from the start
      setNeedsOnboarding(true);
      setOnboardingResumeRoute("Welcome");
      setOnboardingProfile(EMPTY_PROFILE);
    }
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      if (sessionUser) {
        await checkOnboardingStatus(sessionUser.id);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);
        if (sessionUser) {
          await checkOnboardingStatus(sessionUser.id);
        } else {
          setNeedsOnboarding(false);
        }
        setLoading(false);
      },
    );

    return () => subscription.unsubscribe();
  }, [checkOnboardingStatus]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    // New user always needs onboarding
    setNeedsOnboarding(true);
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  const completeOnboarding = useCallback(() => {
    setNeedsOnboarding(false);
  }, []);

  const uid = user?.id ?? null;

  const value = useMemo<AuthContextValue>(
    () => ({ user, uid, loading, needsOnboarding, onboardingResumeRoute, onboardingProfile, completeOnboarding, signIn, register, signOut }),
    [user, uid, loading, needsOnboarding, onboardingResumeRoute, onboardingProfile, completeOnboarding, signIn, register, signOut],
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
