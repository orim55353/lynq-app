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
import { profile as defaultProfile } from "../data/profile";
import type { Profile } from "../hooks/useProfile";

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
  profile: Profile;
  profileLoading: boolean;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
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
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [profileLoading, setProfileLoading] = useState(true);

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

  const fetchProfile = useCallback(async (uid: string) => {
    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from("app_users")
        .select("*")
        .eq("authId", uid)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          // No row — will be created during onboarding
          setProfile(defaultProfile);
        }
      } else if (data) {
        const d = data as Record<string, unknown>;
        setProfile({
          initials: String(d.initials ?? defaultProfile.initials),
          name: String(d.name ?? defaultProfile.name),
          tagline: String(d.tagline ?? defaultProfile.tagline),
          email: String(d.email ?? defaultProfile.email),
          location: String(d.location ?? defaultProfile.location),
          experience: String(d.experience ?? defaultProfile.experience),
          skills: Array.isArray(d.skills) ? (d.skills as string[]) : defaultProfile.skills,
        });
      }
    } catch {
      setProfile(defaultProfile);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  const updateProfile = useCallback(
    async (updates: Partial<Profile>) => {
      const currentUid = user?.id;
      if (!currentUid) return;
      const { error } = await supabase
        .from("app_users")
        .update(updates)
        .eq("authId", currentUid);
      if (error) throw error;
      setProfile((prev) => ({ ...prev, ...updates }));
    },
    [user],
  );

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      const sessionUser = session?.user ?? null;
      setUser(sessionUser);
      if (sessionUser) {
        await Promise.all([
          checkOnboardingStatus(sessionUser.id),
          fetchProfile(sessionUser.id),
        ]);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const sessionUser = session?.user ?? null;
        setUser(sessionUser);
        if (sessionUser) {
          await Promise.all([
            checkOnboardingStatus(sessionUser.id),
            fetchProfile(sessionUser.id),
          ]);
        } else {
          setNeedsOnboarding(false);
          setProfile(defaultProfile);
          setProfileLoading(false);
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
    // Set onboarding flag BEFORE signUp so the auth state change listener
    // never renders the main app while the onboarding check is pending.
    setNeedsOnboarding(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      setNeedsOnboarding(false);
      throw error;
    }
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
    () => ({ user, uid, loading, needsOnboarding, onboardingResumeRoute, onboardingProfile, profile, profileLoading, updateProfile, completeOnboarding, signIn, register, signOut }),
    [user, uid, loading, needsOnboarding, onboardingResumeRoute, onboardingProfile, profile, profileLoading, updateProfile, completeOnboarding, signIn, register, signOut],
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
