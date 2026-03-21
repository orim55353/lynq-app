import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExpandedJobCard } from "../components/ExpandedJobCard";
import { JobCard } from "../components/JobCard";
import { StoryCircle, StoryHeader } from "../components/StoryHeader";
import { StoryViewModal } from "../components/StoryViewModal";
import { spacing } from "../constants/theme";
import { useSavedJobs } from "../context/SavedJobsContext";
import { useJobs } from "../hooks/useJobs";
import { useTheme } from "../hooks/useTheme";
import type { Job } from "../types/models";
import { clamp } from "../utils/math";

const storyCircles: StoryCircle[] = [
  { id: "tech", label: "Tech", image: "https://images.unsplash.com/photo-1544847558-3ccacb31ee7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbGFwdG9wJTIwY29kaW5nfGVufDF8fHx8MTc3MTI1MTY5MHww&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#00E5FF", "#0891B2"] },
  { id: "finance", label: "Finance", image: "https://images.unsplash.com/photo-1675580167286-47ea50993b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwbW9uZXklMjBidXNpbmVzc3xlbnwxfHx8fDE3NzEyODY5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#2DD4BF", "#14B8A6"] },
  { id: "design", label: "Design", image: "https://images.unsplash.com/photo-1624901344246-8759f305fef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBjcmVhdGl2ZSUyMGFydHxlbnwxfHx8fDE3NzEyMDY1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#FB923C", "#EF4444"] },
  { id: "marketing", label: "Marketing", image: "https://images.unsplash.com/photo-1566514883564-c4cdfa535113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhbmFseXRpY3MlMjBidXNpbmVzc3xlbnwxfHx8fDE3NzEyODY5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#60A5FA", "#3B82F6"] },
  { id: "sales", label: "Sales", image: "https://images.unsplash.com/photo-1748361920780-2a77fdc2cd32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMGhhbmRzaGFrZSUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MTIxNzYwMnww&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#FBBF24", "#F97316"] },
  { id: "healthcare", label: "Health", image: "https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGhvc3BpdGFsfGVufDF8fHx8MTc3MTE4NjU4NXww&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#A78BFA", "#8B5CF6"] },
  { id: "tech2", label: "Tech", image: "https://images.unsplash.com/photo-1544847558-3ccacb31ee7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbGFwdG9wJTIwY29kaW5nfGVufDF8fHx8MTc3MTI1MTY5MHww&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#00E5FF", "#0891B2"] },
  { id: "finance2", label: "Finance", image: "https://images.unsplash.com/photo-1675580167286-47ea50993b8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNlJTIwbW9uZXklMjBidXNpbmVzc3xlbnwxfHx8fDE3NzEyODY5NTN8MA&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#2DD4BF", "#14B8A6"] },
  { id: "design2", label: "Design", image: "https://images.unsplash.com/photo-1624901344246-8759f305fef3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNpZ24lMjBjcmVhdGl2ZSUyMGFydHxlbnwxfHx8fDE3NzEyMDY1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#FB923C", "#EF4444"] },
  { id: "marketing2", label: "Marketing", image: "https://images.unsplash.com/photo-1566514883564-c4cdfa535113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJrZXRpbmclMjBhbmFseXRpY3MlMjBidXNpbmVzc3xlbnwxfHx8fDE3NzEyODY5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#60A5FA", "#3B82F6"] },
  { id: "sales2", label: "Sales", image: "https://images.unsplash.com/photo-1748361920780-2a77fdc2cd32?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxlcyUyMGhhbmRzaGFrZSUyMGJ1c2luZXNzfGVufDF8fHx8MTc3MTIxNzYwMnww&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#FBBF24", "#F97316"] },
  { id: "healthcare2", label: "Health", image: "https://images.unsplash.com/photo-1769147555720-71fc71bfc216?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwbWVkaWNhbCUyMGhvc3BpdGFsfGVufDF8fHx8MTc3MTE4NjU4NXww&ixlib=rb-4.1.0&q=80&w=1080", gradient: ["#A78BFA", "#8B5CF6"] },
];

export function DiscoverScreen() {
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { jobs } = useJobs();
  const { isSaved, toggleSaved } = useSavedJobs();
  const { mode, colors } = useTheme();
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [openStoryId, setOpenStoryId] = useState<string | null>(null);
  const [expandedJob, setExpandedJob] = useState<Job | null>(null);
  const [storyHeaderHeight, setStoryHeaderHeight] = useState(112);

  const handleSelectStory = useCallback((id: string) => {
    setSelectedStory(id);
    setOpenStoryId(id);
  }, []);

  const handleExpand = useCallback((job: Job) => {
    setExpandedJob(job);
  }, []);

  const layout = useMemo(() => {
    const cardHeight = windowHeight;
    const cardTopGap = clamp(cardHeight * 0.016, spacing.sm, spacing.lg);
    const cardBottomGap = clamp(cardHeight * 0.028, spacing.md, spacing.lg);
    const topOffset = storyHeaderHeight + cardTopGap;
    const bottomOffset = Math.max(
      tabBarHeight + cardBottomGap,
      insets.bottom + clamp(cardHeight * 0.04, spacing.lg, spacing.xxl),
    );

    return { cardHeight, topOffset, bottomOffset };
  }, [windowHeight, storyHeaderHeight, tabBarHeight, insets.bottom]);

  const renderItem = useCallback(
    ({ item }: { item: Job }) => (
      <JobCard
        job={item}
        cardHeight={layout.cardHeight}
        topOffset={layout.topOffset}
        bottomOffset={layout.bottomOffset}
        isSaved={isSaved(item.id)}
        onToggleSaved={toggleSaved}
        onExpand={handleExpand}
        mode={mode}
      />
    ),
    [isSaved, layout.bottomOffset, layout.cardHeight, layout.topOffset, toggleSaved, handleExpand, mode],
  );

  return (
    <View style={[styles.screen, { backgroundColor: colors.bg }]}>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        initialNumToRender={3}
        windowSize={5}
        maxToRenderPerBatch={3}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        bounces={false}
        decelerationRate="fast"
        snapToInterval={layout.cardHeight}
        disableIntervalMomentum
        getItemLayout={(_, index) => ({
          length: layout.cardHeight,
          offset: layout.cardHeight * index,
          index,
        })}
      />

      <StoryHeader
        stories={storyCircles}
        selectedStory={selectedStory}
        topInset={insets.top}
        onSelectStory={handleSelectStory}
        onHeightChange={setStoryHeaderHeight}
      />

      <StoryViewModal
        visible={openStoryId != null}
        onClose={() => setOpenStoryId(null)}
        jobs={jobs}
        isSaved={isSaved}
        onToggleSaved={toggleSaved}
      />

      {expandedJob && (
        <ExpandedJobCard
          job={expandedJob}
          visible
          isSaved={isSaved(expandedJob.id)}
          cardTopY={layout.topOffset}
          onToggleSaved={toggleSaved}
          onClose={() => setExpandedJob(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
