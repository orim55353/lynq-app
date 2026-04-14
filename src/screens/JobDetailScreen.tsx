import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { View } from "react-native";
import { ExpandedJobCard } from "../components/ExpandedJobCard";
import { useSavedJobs } from "../context/SavedJobsContext";
import { chats } from "../data/chat";
import { useJobs } from "../hooks/useJobs";
import { useTheme } from "../hooks/useTheme";
import type { AppStackParamList } from "../navigation/AppStack";

type Props = NativeStackScreenProps<AppStackParamList, "JobDetail">;

export function JobDetailScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const route = useRoute<Props["route"]>();
  const { jobs } = useJobs();
  const { isSaved, toggleSaved } = useSavedJobs();

  const job = useMemo(
    () => jobs.find((j) => j.id === route.params.jobId) ?? null,
    [jobs, route.params.jobId],
  );

  const chat = useMemo(
    () => (job != null ? chats.find((c) => c.jobId === job.id) ?? null : null),
    [job],
  );

  if (job == null) return null;

  const fromMatches = route.params.source === "matches";

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ExpandedJobCard
        job={job}
        visible
        isSaved={isSaved(job.id)}
        cardTopY={0}
        onToggleSaved={toggleSaved}
        onClose={() => navigation.goBack()}
        onGoToChat={fromMatches && chat != null ? () => {
          navigation.goBack();
          navigation.navigate("Conversation", { chatId: chat.id });
        } : undefined}
      />
    </View>
  );
}
