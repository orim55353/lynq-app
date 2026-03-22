import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useAuth } from "./AuthContext";
import { supabase } from "../lib/supabase";

const STORAGE_KEY = "savedJobs";
const isStringArray = (value: unknown): value is string[] =>
  Array.isArray(value) && value.every((entry) => typeof entry === "string");

interface SavedJobsContextValue {
  savedIds: string[];
  loaded: boolean;
  isSaved: (jobId: string) => boolean;
  toggleSaved: (jobId: string) => void;
  removeSaved: (jobId: string) => void;
}

const SavedJobsContext = createContext<SavedJobsContextValue | null>(null);

export function SavedJobsProvider({ children }: { children: ReactNode }) {
  const { uid, loading: authLoading } = useAuth();
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  // When signed in: fetch saved jobs from Supabase
  useEffect(() => {
    if (!uid) return;

    let isMounted = true;

    const loadFromSupabase = async () => {
      try {
        const { data: appUser } = await supabase
          .from("app_users")
          .select("id")
          .eq("authId", uid)
          .single();

        if (!appUser || !isMounted) return;

        const { data, error } = await supabase
          .from("saved_jobs")
          .select("jobId")
          .eq("appUserId", appUser.id);

        if (!isMounted) return;
        if (error) throw error;

        setSavedIds((data ?? []).map((row) => row.jobId as string));
      } catch {
        // Fall through
      } finally {
        if (isMounted) setLoaded(true);
      }
    };

    void loadFromSupabase();

    const channel = supabase
      .channel(`saved-jobs-${uid}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "saved_jobs" },
        () => { void loadFromSupabase(); },
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, [uid]);

  // When not signed in: load from AsyncStorage
  useEffect(() => {
    if (authLoading || uid) return;

    let isMounted = true;

    const loadSavedJobs = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && isMounted) {
          const parsed: unknown = JSON.parse(raw);
          if (isStringArray(parsed)) setSavedIds(parsed);
        }
      } catch {
        // Keep defaults
      } finally {
        if (isMounted) setLoaded(true);
      }
    };

    void loadSavedJobs();
    return () => { isMounted = false; };
  }, [authLoading, uid]);

  // One-time migration: AsyncStorage → Supabase
  useEffect(() => {
    if (!uid) return;

    let isMounted = true;

    const migrate = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw || !isMounted) return;
        const parsed: unknown = JSON.parse(raw);
        if (!isStringArray(parsed) || parsed.length === 0) return;

        const { data: appUser } = await supabase
          .from("app_users")
          .select("id")
          .eq("authId", uid)
          .single();

        if (!appUser || !isMounted) return;

        const rows = parsed.map((jobId) => ({
          appUserId: appUser.id,
          jobId,
        }));

        await supabase.from("saved_jobs").upsert(rows, { onConflict: "appUserId,jobId" });
        await AsyncStorage.removeItem(STORAGE_KEY);
      } catch {
        // Non-fatal
      }
    };

    void migrate();
    return () => { isMounted = false; };
  }, [uid]);

  const toggleSaved = useCallback(
    async (jobId: string) => {
      if (uid) {
        try {
          const { data: appUser } = await supabase
            .from("app_users")
            .select("id")
            .eq("authId", uid)
            .single();

          if (!appUser) return;

          if (savedIds.includes(jobId)) {
            await supabase
              .from("saved_jobs")
              .delete()
              .eq("appUserId", appUser.id)
              .eq("jobId", jobId);
            setSavedIds((prev) => prev.filter((id) => id !== jobId));
          } else {
            await supabase
              .from("saved_jobs")
              .insert({ appUserId: appUser.id, jobId });
            setSavedIds((prev) => [...prev, jobId]);
          }
        } catch {
          // Optimistic local update already done
        }
        return;
      }

      setSavedIds((prev) => {
        const next = prev.includes(jobId)
          ? prev.filter((id) => id !== jobId)
          : [...prev, jobId];
        void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [uid, savedIds],
  );

  const removeSaved = useCallback(
    async (jobId: string) => {
      if (uid) {
        try {
          const { data: appUser } = await supabase
            .from("app_users")
            .select("id")
            .eq("authId", uid)
            .single();

          if (appUser) {
            await supabase
              .from("saved_jobs")
              .delete()
              .eq("appUserId", appUser.id)
              .eq("jobId", jobId);
          }
        } catch {
          // Continue
        }
        setSavedIds((prev) => prev.filter((id) => id !== jobId));
        return;
      }

      setSavedIds((prev) => {
        const next = prev.filter((id) => id !== jobId);
        void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
        return next;
      });
    },
    [uid],
  );

  const isSaved = useCallback((jobId: string) => savedIds.includes(jobId), [savedIds]);

  const value = useMemo<SavedJobsContextValue>(
    () => ({
      savedIds,
      loaded: authLoading ? false : loaded,
      isSaved,
      toggleSaved,
      removeSaved,
    }),
    [authLoading, isSaved, loaded, removeSaved, savedIds, toggleSaved],
  );

  return (
    <SavedJobsContext.Provider value={value}>{children}</SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error("useSavedJobs must be used within SavedJobsProvider");
  }
  return context;
}
