import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "savedJobs";

interface SavedJobsContextValue {
  savedIds: string[];
  loaded: boolean;
  isSaved: (jobId: string) => boolean;
  toggleSaved: (jobId: string) => void;
  removeSaved: (jobId: string) => void;
}

const SavedJobsContext = createContext<SavedJobsContextValue | null>(null);

export function SavedJobsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadSavedJobs = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && isMounted) {
          setSavedIds(JSON.parse(raw));
        }
      } catch {
        // Keep defaults if storage is corrupted/unavailable.
      } finally {
        if (isMounted) {
          setLoaded(true);
        }
      }
    };

    void loadSavedJobs();

    return () => {
      isMounted = false;
    };
  }, []);

  const persist = (next: string[]) => {
    setSavedIds(next);
    void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const value = useMemo<SavedJobsContextValue>(
    () => ({
      savedIds,
      loaded,
      isSaved: (jobId) => savedIds.includes(jobId),
      toggleSaved: (jobId) => {
        const next = savedIds.includes(jobId)
          ? savedIds.filter((id) => id !== jobId)
          : [...savedIds, jobId];
        persist(next);
      },
      removeSaved: (jobId) => {
        persist(savedIds.filter((id) => id !== jobId));
      },
    }),
    [loaded, savedIds],
  );

  return <SavedJobsContext.Provider value={value}>{children}</SavedJobsContext.Provider>;
}

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) {
    throw new Error("useSavedJobs must be used within SavedJobsProvider");
  }
  return context;
}
