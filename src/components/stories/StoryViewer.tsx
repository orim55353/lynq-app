import { useCallback, useEffect, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  Pressable,
  Share,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { spacing } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";
import type { CompanyStory, StoryCTA as StoryCTAType, StorySlide } from "../../types/story";
import { StoryCompanyHeader } from "./StoryCompanyHeader";
import { StoryCTA } from "./StoryCTA";
import { StoryEngagementBar } from "./StoryEngagementBar";
import { StoryProgressBar } from "./StoryProgressBar";
import { CultureSlide } from "./slides/CultureSlide";
import { DayInLifeSlide } from "./slides/DayInLifeSlide";
import { JobHighlightSlide } from "./slides/JobHighlightSlide";
import { TestimonialSlide } from "./slides/TestimonialSlide";

const TIMER_TICK_MS = 50;

interface StoryViewerProps {
  visible: boolean;
  stories: CompanyStory[];
  initialStoryIndex: number;
  onClose: () => void;
  onSlideSeen: (companyId: string, slideIndex: number, totalSlides: number) => void;
}

export function StoryViewer({
  visible,
  stories,
  initialStoryIndex,
  onClose,
  onSlideSeen,
}: StoryViewerProps) {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  // ─── State ──────────────────────────────────────────────────────────────
  const [companyIndex, setCompanyIndex] = useState(initialStoryIndex);
  const [slideIndex, setSlideIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);

  // Refs for timer access
  const companyIndexRef = useRef(companyIndex);
  companyIndexRef.current = companyIndex;
  const slideIndexRef = useRef(slideIndex);
  slideIndexRef.current = slideIndex;
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const listRef = useRef<FlatList<CompanyStory>>(null);

  const currentCompany = stories[companyIndex];
  const currentSlides = currentCompany?.slides ?? [];
  const currentSlide = currentSlides[slideIndex];

  // ─── Reset on open ──────────────────────────────────────────────────────
  useEffect(() => {
    if (visible) {
      const idx = Math.max(0, Math.min(initialStoryIndex, stories.length - 1));
      setCompanyIndex(idx);
      setSlideIndex(0);
      setProgress(0);
      setPaused(false);
      // Scroll to initial company
      setTimeout(() => {
        listRef.current?.scrollToOffset({ offset: idx * windowWidth, animated: false });
      }, 50);
    }
  }, [visible, initialStoryIndex, stories.length, windowWidth]);

  // ─── Mark slide as seen ─────────────────────────────────────────────────
  useEffect(() => {
    if (!visible || !currentCompany) return;
    onSlideSeen(currentCompany.companyId, slideIndex, currentSlides.length);
  }, [visible, companyIndex, slideIndex, currentCompany, currentSlides.length, onSlideSeen]);

  // ─── Auto-advance timer ─────────────────────────────────────────────────
  useEffect(() => {
    if (!visible || !currentSlide || paused) return;

    const duration = currentSlide.duration || 5000;
    const step = TIMER_TICK_MS / duration;

    const interval = setInterval(() => {
      if (pausedRef.current) return;

      setProgress((p) => {
        const next = p + step;
        if (next >= 1) {
          clearInterval(interval);
          advanceSlide();
          return 1;
        }
        return next;
      });
    }, TIMER_TICK_MS);

    return () => clearInterval(interval);
  }, [visible, companyIndex, slideIndex, paused, currentSlide]);

  // ─── Navigation helpers ─────────────────────────────────────────────────
  const advanceSlide = useCallback(() => {
    const ci = companyIndexRef.current;
    const si = slideIndexRef.current;
    const company = stories[ci];
    if (!company) return;

    if (si < company.slides.length - 1) {
      // Next slide in same company
      setSlideIndex(si + 1);
      setProgress(0);
    } else if (ci < stories.length - 1) {
      // Next company
      const nextCi = ci + 1;
      setCompanyIndex(nextCi);
      setSlideIndex(0);
      setProgress(0);
      listRef.current?.scrollToOffset({ offset: nextCi * windowWidth, animated: true });
    } else {
      // End of all stories
      onClose();
    }
  }, [stories, windowWidth, onClose]);

  const goBackSlide = useCallback(() => {
    const si = slideIndexRef.current;
    const ci = companyIndexRef.current;

    if (si > 0) {
      setSlideIndex(si - 1);
      setProgress(0);
    } else if (ci > 0) {
      const prevCi = ci - 1;
      setCompanyIndex(prevCi);
      setSlideIndex(0);
      setProgress(0);
      listRef.current?.scrollToOffset({ offset: prevCi * windowWidth, animated: true });
    } else {
      onClose();
    }
  }, [windowWidth, onClose]);

  // ─── Tap zones ──────────────────────────────────────────────────────────
  const handleTapLeft = useCallback(() => goBackSlide(), [goBackSlide]);
  const handleTapRight = useCallback(() => {
    setProgress(0);
    advanceSlide();
  }, [advanceSlide]);

  // Long press to pause
  const handleLongPressIn = useCallback(() => setPaused(true), []);
  const handleLongPressOut = useCallback(() => setPaused(false), []);

  // ─── Horizontal scroll between companies ────────────────────────────────
  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const index = Math.round(x / windowWidth);
      const clamped = Math.max(0, Math.min(index, stories.length - 1));
      if (clamped !== companyIndexRef.current) {
        setCompanyIndex(clamped);
        setSlideIndex(0);
        setProgress(0);
      }
    },
    [stories.length, windowWidth],
  );

  // ─── CTA handler ────────────────────────────────────────────────────────
  const handleCTA = useCallback((cta: StoryCTAType) => {
    // Phase 1: just log. Phase 2 will wire to navigation.
    // For now, close the viewer so the user can see the feed.
    onClose();
  }, [onClose]);

  const handleShare = useCallback(() => {
    if (!currentCompany) return;
    Share.share({
      message: `Check out ${currentCompany.companyName} on Lynq!`,
    }).catch(() => {});
  }, [currentCompany]);

  const handleSave = useCallback(() => {
    // Phase 2: wire to follow/save
  }, []);

  // ─── Slide renderer ─────────────────────────────────────────────────────
  const renderSlide = (slide: StorySlide, company: CompanyStory) => {
    switch (slide.type) {
      case "job_highlight":
        return <JobHighlightSlide slide={slide} company={company} />;
      case "testimonial":
        return <TestimonialSlide slide={slide} company={company} />;
      case "day_in_life":
        return <DayInLifeSlide slide={slide} company={company} />;
      case "culture":
      case "custom":
      default:
        return <CultureSlide slide={slide} />;
    }
  };

  // ─── FlatList renders one "page" per company ────────────────────────────
  const renderCompanyPage = useCallback(
    ({ item, index }: { item: CompanyStory; index: number }) => {
      // Only render slides for the active company (perf)
      const isActive = index === companyIndex;
      const slide = isActive ? item.slides[slideIndex] : item.slides[0];

      return (
        <View style={{ width: windowWidth, height: windowHeight }}>
          {slide && renderSlide(slide, item)}
        </View>
      );
    },
    [companyIndex, slideIndex, windowWidth, windowHeight],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: windowWidth,
      offset: windowWidth * index,
      index,
    }),
    [windowWidth],
  );

  if (!currentCompany || !currentSlide) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={[styles.container, { backgroundColor: colors.bg }]}>
        {/* Background: company pages */}
        <FlatList
          ref={listRef}
          data={stories}
          keyExtractor={(item) => item.id}
          renderItem={renderCompanyPage}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          bounces={false}
          decelerationRate="fast"
          snapToInterval={windowWidth}
          snapToAlignment="start"
          disableIntervalMomentum
          getItemLayout={getItemLayout}
          initialNumToRender={2}
          maxToRenderPerBatch={2}
          windowSize={3}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />

        {/* ─── Overlay UI ─── */}

        {/* Progress bar */}
        <StoryProgressBar
          totalSlides={currentSlides.length}
          currentIndex={slideIndex}
          progress={progress}
          topInset={insets.top}
        />

        {/* Company header + close */}
        <View style={{ position: "absolute", top: insets.top + 20, left: 0, right: 0, zIndex: 25 }}>
          <StoryCompanyHeader company={currentCompany} onClose={onClose} />
        </View>

        {/* Bottom actions: CTA + engagement stacked with proper spacing */}
        <View style={[styles.bottomActions, { bottom: insets.bottom + 16 }]}>
          {currentSlide.cta && (
            <StoryCTA
              cta={currentSlide.cta}
              brandColors={currentCompany.brandColors}
              onPress={handleCTA}
            />
          )}
          <StoryEngagementBar
            totalViews={currentCompany.totalViews}
            onShare={handleShare}
            onSave={handleSave}
          />
        </View>

        {/* Tap zones */}
        <Pressable
          style={[styles.tapZone, styles.tapZoneLeft]}
          onPress={handleTapLeft}
          onLongPress={handleLongPressIn}
          onPressOut={handleLongPressOut}
          delayLongPress={200}
          accessibilityLabel="Previous"
          accessibilityRole="button"
        />
        <Pressable
          style={[styles.tapZone, styles.tapZoneRight]}
          onPress={handleTapRight}
          onLongPress={handleLongPressIn}
          onPressOut={handleLongPressOut}
          delayLongPress={200}
          accessibilityLabel="Next"
          accessibilityRole="button"
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomActions: {
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 25,
    alignItems: "center",
    gap: 16,
    paddingHorizontal: spacing.xxl,
  },
  tapZone: {
    position: "absolute",
    top: 0,
    bottom: 0,
    zIndex: 20,
  },
  tapZoneLeft: {
    left: 0,
    width: "30%",
  },
  tapZoneRight: {
    right: 0,
    width: "70%",
  },
});
