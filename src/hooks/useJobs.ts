import { useState } from "react";
import { jobs as staticJobs } from "../data/jobs";
import type { Job } from "../types/models";

// TODO: Switch to Supabase query when ready to show real jobs
// import { supabase } from "../lib/supabase";

export function useJobs(): { jobs: Job[]; loading: boolean; error: Error | null } {
  const [jobs] = useState<Job[]>(staticJobs);

  return { jobs, loading: false, error: null };
}
