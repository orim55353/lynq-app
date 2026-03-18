import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
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
import { db, isFirestoreAvailable } from "../lib/firebase";

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

  // When signed in and Firestore available: subscribe to Firestore savedJobs subcollection
  useEffect(() => {
    const dbRef = db;
    if (!uid || !isFirestoreAvailable(dbRef)) return;

    const savedJobsRef = collection(dbRef, "users", uid, "savedJobs");
    const unsubscribe = onSnapshot(savedJobsRef, (snapshot) => {
      const ids = snapshot.docs.map((d) => d.id);
      setSavedIds(ids);
      setLoaded(true);
    });

    return () => unsubscribe();
  }, [uid]);

  // When not signed in (auth ready): load from AsyncStorage
  useEffect(() => {
    if (authLoading || uid) return;

    let isMounted = true;

    const loadSavedJobs = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && isMounted) {
          const parsed: unknown = JSON.parse(raw);
          if (isStringArray(parsed)) {
            setSavedIds(parsed);
          }
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
  }, [authLoading, uid]);

  // When signed in but Firestore not available: still load from AsyncStorage so we have some state
  useEffect(() => {
    if (!uid || isFirestoreAvailable(db)) return;

    let isMounted = true;
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw && isMounted) {
          const parsed: unknown = JSON.parse(raw);
          if (isStringArray(parsed)) setSavedIds(parsed);
        }
      } catch {
        // ignore
      } finally {
        if (isMounted) setLoaded(true);
      }
    };
    void load();
    return () => { isMounted = false; };
  }, [uid]);

  // One-time migration: when we get a uid and Firestore is available, copy AsyncStorage to Firestore
  useEffect(() => {
    const dbRef = db;
    if (!uid || !isFirestoreAvailable(dbRef)) return;

    let isMounted = true;

    const migrate = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw || !isMounted) return;
        const parsed: unknown = JSON.parse(raw);
        if (!isStringArray(parsed) || parsed.length === 0) return;

        const batch = parsed;
        for (const jobId of batch) {
          const ref = doc(dbRef, "users", uid, "savedJobs", jobId);
          await setDoc(ref, { jobId, savedAt: serverTimestamp() });
        }
        await AsyncStorage.removeItem(STORAGE_KEY);
      } catch {
        // Non-fatal: Firestore subscription will still run
      }
    };

    void migrate();

    return () => {
      isMounted = false;
    };
  }, [uid]);

  const toggleSaved = useCallback(
    async (jobId: string) => {
      const dbRef = db;
      if (uid && isFirestoreAvailable(dbRef)) {
        const ref = doc(dbRef, "users", uid, "savedJobs", jobId);
        if (savedIds.includes(jobId)) {
          await deleteDoc(ref);
        } else {
          await setDoc(ref, { jobId, savedAt: serverTimestamp() });
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
      const dbRef = db;
      if (uid && isFirestoreAvailable(dbRef)) {
        const ref = doc(dbRef, "users", uid, "savedJobs", jobId);
        await deleteDoc(ref);
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
