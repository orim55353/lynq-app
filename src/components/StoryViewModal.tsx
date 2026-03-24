import { Ionicons } from "@expo/vector-icons";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Pressable,
  StyleSheet,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { JobCard } from "./JobCard";
import { spacing } from "../constants/theme";
import { useTheme } from "../hooks/useTheme";
import { Job } from "../types/models";
import { clamp } from "../utils/math";

const CLOSE_BUTTON_SIZE = 44;
const PROGRESS_BAR_HEIGHT = 3;
const PROGRESS_BAR_GAP = 4;
const STORY_DURATION_MS = 5000;
const TIMER_TICK_MS = 50;

interface StoryViewModalProps {
  visible: boolean;
  onClose: () => void;
  jobs: Job[];
  isSaved: (jobId: string) => boolean;
  onToggleSaved: (jobId: string) => void;
}

export function StoryViewModal({
  visible,
  onClose,
  jobs,
  isSaved,
  onToggleSaved,
}: StoryViewModalProps) {
  const { height: windowHeight, width: windowWidth } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { mode, colors } = useTheme();
  const listRef = useRef<FlatList<Job>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const currentIndexRef = useRef(currentIndex);
  currentIndexRef.current = currentIndex;

  const progressBarAreaHeight =
    insets.top + PROGRESS_BAR_HEIGHT + PROGRESS_BAR_GAP * 2 + spacing.sm;

  const layout = useMemo(() => {
    const cardHeight = windowHeight;
    const cardWidth = windowWidth;
    const cardTopGap = clamp(cardHeight * 0.016, spacing.sm, spacing.lg);
    const cardBottomGap = clamp(cardHeight * 0.028, spacing.md, spacing.lg);
    const topOffset = progressBarAreaHeight + CLOSE_BUTTON_SIZE + cardTopGap;
    const bottomOffset = Math.max(
      insets.bottom + clamp(cardHeight * 0.04, spacing.lg, spacing.xxl),
      cardBottomGap,
    );
    return { cardHeight, cardWidth, topOffset, bottomOffset };
  }, [windowHeight, windowWidth, insets.bottom, progressBarAreaHeight]);

  const goToIndex = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, jobs.length - 1));
      setCurrentIndex(clamped);
      setProgress(0);
      listRef.current?.scrollToOffset({ offset: clamped * layout.cardWidth, animated: true });
    },
    [jobs.length, layout.cardWidth],
  );

  useEffect(() => {
    if (visible) {
      setCurrentIndex(0);
      setProgress(0);
      listRef.current?.scrollToOffset({ offset: 0, animated: false });
    }
  }, [visible]);

  useEffect(() => {
    if (!visible || jobs.length === 0) return;
    const step = TIMER_TICK_MS / STORY_DURATION_MS;
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + step;
        if (next >= 1) {
          clearInterval(interval);
          const idx = currentIndexRef.current;
          if (idx < jobs.length - 1) {
            setCurrentIndex(idx + 1);
            setProgress(0);
            listRef.current?.scrollToOffset({ offset: (idx + 1) * layout.cardWidth, animated: true });
          } else {
            onClose();
          }
          return 1;
        }
        return next;
      });
    }, TIMER_TICK_MS);
    return () => clearInterval(interval);
  }, [visible, currentIndex, jobs.length, layout.cardWidth, onClose]);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const index = Math.round(x / layout.cardWidth);
      const clamped = Math.max(0, Math.min(index, jobs.length - 1));
      if (clamped !== currentIndexRef.current) {
        setCurrentIndex(clamped);
        setProgress(0);
      }
    },
    [jobs.length, layout.cardWidth],
  );

  const handleTapLeft = useCallback(() => {
    if (currentIndex > 0) goToIndex(currentIndex - 1);
    else onClose();
  }, [currentIndex, goToIndex, onClose]);

  const handleTapRight = useCallback(() => {
    if (currentIndex < jobs.length - 1) goToIndex(currentIndex + 1);
    else onClose();
  }, [currentIndex, jobs.length, goToIndex, onClose]);

  const renderItem = useCallback(
    ({ item }: { item: Job }) => (
      <View style={{ width: layout.cardWidth, height: layout.cardHeight }}>
        <JobCard
          job={item}
          cardHeight={layout.cardHeight}
          topOffset={layout.topOffset}
          bottomOffset={layout.bottomOffset}
          isSaved={isSaved(item.id)}
          onToggleSaved={onToggleSaved}
          mode={mode}
        />
      </View>
    ),
    [layout, isSaved, onToggleSaved, mode],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({ length: layout.cardWidth, offset: layout.cardWidth * index, index }),
    [layout.cardWidth],
  );

  const progressBarWidth =
    (windowWidth - spacing.lg * 2 - PROGRESS_BAR_GAP * Math.max(0, jobs.length - 1)) / jobs.length;

  const closeButtonTop = progressBarAreaHeight + spacing.xs;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" statusBarTranslucent onRequestClose={onClose}>
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        <FlatList
          ref={listRef}
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          snapToInterval={layout.cardWidth}
          snapToAlignment="start"
          disableIntervalMomentum
          getItemLayout={getItemLayout}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={3}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />

        <View style={[styles.progressBarRow, { paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg }]} pointerEvents="none">
          <View style={styles.progressBarTrack}>
            {jobs.map((_, index) => (
              <View key={index} style={[styles.progressSegment, { width: progressBarWidth }]}>
                <View style={[styles.progressSegmentFill, { backgroundColor: colors.accent, width: index < currentIndex ? "100%" : index === currentIndex ? `${progress * 100}%` : "0%" }]} />
              </View>
            ))}
          </View>
        </View>

        <Pressable
          style={[styles.closeButton, { top: closeButtonTop, backgroundColor: colors.glass, borderColor: colors.glassBorder }]}
          onPress={onClose}
          hitSlop={12}
          accessibilityLabel="סגור תצוגת סטורי"
          accessibilityRole="button"
        >
          <Ionicons name="close" size={24} color={colors.text} />
        </Pressable>

        <Pressable style={[styles.tapZone, styles.tapZoneLeft]} onPress={handleTapLeft} accessibilityLabel={currentIndex === 0 ? "סגור" : "הקודם"} accessibilityRole="button" />
        <Pressable style={[styles.tapZone, styles.tapZoneRight]} onPress={handleTapRight} accessibilityLabel={currentIndex === jobs.length - 1 ? "סגור" : "הבא"} accessibilityRole="button" />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  progressBarRow: { position: "absolute", left: 0, right: 0, zIndex: 25 },
  progressBarTrack: { flexDirection: "row", gap: PROGRESS_BAR_GAP },
  progressSegment: { height: PROGRESS_BAR_HEIGHT, borderRadius: PROGRESS_BAR_HEIGHT / 2, backgroundColor: "rgba(255,255,255,0.2)", overflow: "hidden" },
  progressSegmentFill: { height: "100%", borderRadius: PROGRESS_BAR_HEIGHT / 2 },
  tapZone: { position: "absolute", top: 0, bottom: 0, width: "40%", zIndex: 20 },
  tapZoneLeft: { left: 0 },
  tapZoneRight: { right: 0 },
  closeButton: { position: "absolute", right: spacing.lg, zIndex: 30, width: CLOSE_BUTTON_SIZE, height: CLOSE_BUTTON_SIZE, borderRadius: CLOSE_BUTTON_SIZE / 2, borderWidth: 1, justifyContent: "center", alignItems: "center" },
});
