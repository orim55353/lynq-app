import { useCallback, useEffect, useState } from "react";
import { profile as defaultProfile } from "../data/profile";
import { supabase } from "../lib/supabase";

export interface Profile {
  initials: string;
  name: string;
  tagline: string;
  email: string;
  location: string;
  experience: string;
  skills: string[];
}

function dataToProfile(data: Record<string, unknown>): Profile {
  return {
    initials: String(data.initials ?? defaultProfile.initials),
    name: String(data.name ?? defaultProfile.name),
    tagline: String(data.tagline ?? defaultProfile.tagline),
    email: String(data.email ?? defaultProfile.email),
    location: String(data.location ?? defaultProfile.location),
    experience: String(data.experience ?? defaultProfile.experience),
    skills: Array.isArray(data.skills) ? (data.skills as string[]) : defaultProfile.skills,
  };
}

export function useProfile(uid: string | null): {
  profile: Profile;
  loading: boolean;
  error: Error | null;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
} {
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!uid) {
      setProfile(defaultProfile);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;

    const load = async () => {
      try {
        const { data, error: queryError } = await supabase
          .from("app_users")
          .select("*")
          .eq("authId", uid)
          .single();

        if (!isMounted) return;

        if (queryError) {
          if (queryError.code === "PGRST116") {
            const { error: insertError } = await supabase
              .from("app_users")
              .insert({
                authId: uid,
                email: "",
                name: defaultProfile.name,
                initials: defaultProfile.initials,
                tagline: defaultProfile.tagline,
                location: defaultProfile.location,
                experience: defaultProfile.experience,
                skills: defaultProfile.skills,
              });
            if (insertError) throw insertError;
            setProfile(defaultProfile);
          } else {
            throw queryError;
          }
        } else {
          setProfile(dataToProfile(data as Record<string, unknown>));
        }
        setError(null);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setProfile(defaultProfile);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    void load();
    return () => { isMounted = false; };
  }, [uid]);

  const updateProfile = useCallback(
    async (updates: Partial<Profile>) => {
      if (!uid) return;
      const { error: updateError } = await supabase
        .from("app_users")
        .update(updates)
        .eq("authId", uid);
      if (updateError) throw updateError;
      setProfile((prev) => ({ ...prev, ...updates }));
    },
    [uid],
  );

  return { profile, loading, error, updateProfile };
}
