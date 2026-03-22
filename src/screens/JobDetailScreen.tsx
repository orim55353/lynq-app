import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { View } from "react-native";
import { ExpandedJobCard } from "../components/ExpandedJobCard";
import { useSavedJobs } from "../context/SavedJobsContext";
import { useJobs } from "../hooks/useJobs";
import { useTheme } from "../hooks/useTheme";
import type { AppStackParamList } from "../navigation/AppStack";

type Props = NativeStackScreenProps<AppStackParamList, "JobDetail">;

export function JobDetailScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<Props["route"]>();
  const { jobs } = useJobs();
  const { isSaved, toggleSaved } = useSavedJobs();

  const job = useMemo(
    () => jobs.find((j) => j.id === route.params.jobId) ?? null,
    [jobs, route.params.jobId],
  );

  if (job == null) return null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ExpandedJobCard
        job={job}
        visible
        isSaved={isSaved(job.id)}
        cardTopY={0}
        onToggleSaved={toggleSaved}
        onClose={() => navigation.goBack()}
      />
    </View>
  );
}
