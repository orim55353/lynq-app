import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  useWindowDimensions,
  View,
  type ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ExpandedJobCard } from "../components/ExpandedJobCard";
import { JobCard } from "../components/JobCard";
import { StoryCirclesRow } from "../components/stories/StoryCirclesRow";
import { StoryViewer } from "../components/stories/StoryViewer";
import { spacing } from "../constants/theme";
import { useSavedJobs } from "../context/SavedJobsContext";
import { useJobs } from "../hooks/useJobs";
import { useStories } from "../hooks/useStories";
import { useTheme } from "../hooks/useTheme";
import type { Job } from "../types/models";
import type { CompanyStory } from "../types/story";
import { clamp } from "../utils/math";

export function DiscoverScreen() {
  const { height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const { jobs } = useJobs();
  const { isSaved, toggleSaved } = useSavedJobs();
  const { mode, colors } = useTheme();

  // ─── Stories ────────────────────────────────────────────────────────────
  const { stories, isFullySeen, markSlideSeen } = useStories();
  const [openStoryIndex, setOpenStoryIndex] = useState<number | null>(null);

  // ─── Job state ──────────────────────────────────────────────────────────
  const [expandedJob, setExpandedJob] = useState<Job | null>(null);
  const [storyHeaderHeight, setStoryHeaderHeight] = useState(100);
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set(["1"]));

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      setVisibleIds(new Set(viewableItems.map((v) => v.key)));
    },
  ).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 60,
  }).current;

  // ─── Story handlers ─────────────────────────────────────────────────────
  const handleSelectStory = useCallback(
    (story: CompanyStory) => {
      const index = stories.findIndex((s) => s.id === story.id);
      setOpenStoryIndex(index >= 0 ? index : 0);
    },
    [stories],
  );

  const handleCloseStory = useCallback(() => {
    setOpenStoryIndex(null);
  }, []);

  // ─── Job handlers ──────────────────────────────────────────────────────
  const handleExpand = useCallback((job: Job) => {
    setExpandedJob(job);
  }, []);

  const layout = useMemo(() => {
    const cardHeight = windowHeight;
    const cardTopGap = clamp(cardHeight * 0.016, spacing.sm, spacing.lg);
    const cardBottomGap = clamp(cardHeight * 0.035, spacing.xl, spacing.xxxl);
    const topOffset = storyHeaderHeight + cardTopGap;
    const bottomOffset = Math.max(
      tabBarHeight + cardBottomGap,
      insets.bottom + clamp(cardHeight * 0.06, spacing.xxl, spacing.huge),
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
        isVisible={visibleIds.has(item.id)}
      />
    ),
    [
      isSaved,
      layout.bottomOffset,
      layout.cardHeight,
      layout.topOffset,
      toggleSaved,
      handleExpand,
      mode,
      visibleIds,
    ],
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
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        getItemLayout={(_, index) => ({
          length: layout.cardHeight,
          offset: layout.cardHeight * index,
          index,
        })}
      />

      {/* ─── Company story circles ─── */}
      <StoryCirclesRow
        stories={stories}
        isFullySeen={isFullySeen}
        topInset={insets.top}
        onSelectStory={handleSelectStory}
        onHeightChange={setStoryHeaderHeight}
      />

      {/* ─── Story viewer modal ─── */}
      <StoryViewer
        visible={openStoryIndex !== null}
        stories={stories}
        initialStoryIndex={openStoryIndex ?? 0}
        onClose={handleCloseStory}
        onSlideSeen={markSlideSeen}
      />

      {/* ─── Expanded job detail ─── */}
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

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
