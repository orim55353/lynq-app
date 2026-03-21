import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { jobs as staticJobs } from "../data/jobs";
import { db, isFirestoreAvailable } from "../lib/firebase";
import type { Job } from "../types/models";

export function useJobs(): { jobs: Job[]; loading: boolean; error: Error | null } {
  const [jobs, setJobs] = useState<Job[]>(staticJobs);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const dbRef = db;
    if (!isFirestoreAvailable(dbRef)) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const load = async () => {
      try {
        const jobsRef = collection(dbRef, "jobs");
        const snapshot = await getDocs(jobsRef);
        if (!isMounted) return;

        const fromFirestore = snapshot.docs.map((doc): Job => {
          const d = doc.data() as Record<string, unknown>;
          const g = Array.isArray(d.gradient) ? (d.gradient as string[]) : [];
          const gradient: [string, string] = g.length >= 2 ? [g[0], g[1]] : ["#00E5FF", "#0891B2"];
          const tagline = typeof d.tagline === "string" ? d.tagline : "";
          return { id: doc.id, ...d, gradient, tagline } as Job;
        });
        if (fromFirestore.length > 0) {
          setJobs(fromFirestore);
        }
        setError(null);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
          setJobs(staticJobs);
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
  }, []);

  return { jobs, loading, error };
}
