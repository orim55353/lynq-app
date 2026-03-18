import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { profile as defaultProfile } from "../data/profile";
import { db, isFirestoreAvailable } from "../lib/firebase";

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

    const dbRef = db;
    if (!isFirestoreAvailable(dbRef)) {
      setProfile(defaultProfile);
      setLoading(false);
      setError(null);
      return;
    }

    let isMounted = true;

    const load = async () => {
      try {
        const userRef = doc(dbRef, "users", uid);
        const snapshot = await getDoc(userRef);

        if (!isMounted) return;

        if (snapshot.exists()) {
          setProfile(dataToProfile(snapshot.data() as Record<string, unknown>));
        } else {
          const initial = {
            ...defaultProfile,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
          await setDoc(userRef, initial);
          setProfile(defaultProfile);
        }
        setError(null);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setProfile(defaultProfile);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    void load();

    return () => {
      isMounted = false;
    };
  }, [uid]);

  const updateProfile = useCallback(
    async (updates: Partial<Profile>) => {
      const dbRef = db;
      if (!uid || !isFirestoreAvailable(dbRef)) return;

      const userRef = doc(dbRef, "users", uid);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
      setProfile((prev) => ({ ...prev, ...updates }));
    },
    [uid],
  );

  return { profile, loading, error, updateProfile };
}
