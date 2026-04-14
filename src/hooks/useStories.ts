import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";
import { companyStories } from "../data/stories";
import type { CompanyStory, SeenStoriesMap } from "../types/story";

const SEEN_STORIES_KEY = "@lynq/seen_stories";

interface UseStoriesResult {
  stories: CompanyStory[];
  seenMap: SeenStoriesMap;
  markSlideSeen: (companyId: string, slideIndex: number, totalSlides: number) => void;
  isFullySeen: (companyId: string) => boolean;
  isUnseen: (companyId: string) => boolean;
  loading: boolean;
}

/**
 * Provides sorted company stories and seen-state management.
 * Falls back to static seed data when Firestore is unavailable.
 * Sort order: featured first, then unseen before seen, then by `order`.
 */
export function useStories(): UseStoriesResult {
  const [seenMap, setSeenMap] = useState<SeenStoriesMap>({});
  const [loading, setLoading] = useState(true);

  // Load seen state from AsyncStorage on mount
  useEffect(() => {
    AsyncStorage.getItem(SEEN_STORIES_KEY)
      .then((raw) => {
        if (raw) {
          setSeenMap(JSON.parse(raw));
        }
      })
      .catch(() => {
        // Silently fail — treat all as unseen
      })
      .finally(() => setLoading(false));
  }, []);

  const persistSeenMap = useCallback((updated: SeenStoriesMap) => {
    setSeenMap(updated);
    AsyncStorage.setItem(SEEN_STORIES_KEY, JSON.stringify(updated)).catch(() => {
      // Best-effort persist
    });
  }, []);

  const markSlideSeen = useCallback(
    (companyId: string, slideIndex: number, totalSlides: number) => {
      setSeenMap((prev) => {
        const existing = prev[companyId];
        const newIndex = Math.max(existing?.lastSeenSlideIndex ?? -1, slideIndex);
        const fullyViewed = newIndex >= totalSlides - 1;

        const updated: SeenStoriesMap = {
          ...prev,
          [companyId]: {
            lastSeenSlideIndex: newIndex,
            lastSeenAt: Date.now(),
            fullyViewed,
          },
        };

        // Persist outside of setState to avoid batching issues
        AsyncStorage.setItem(SEEN_STORIES_KEY, JSON.stringify(updated)).catch(() => {});
        return updated;
      });
    },
    [],
  );

  const isFullySeen = useCallback(
    (companyId: string) => seenMap[companyId]?.fullyViewed === true,
    [seenMap],
  );

  const isUnseen = useCallback(
    (companyId: string) => !seenMap[companyId],
    [seenMap],
  );

  // Sort: featured first → unseen before seen → by order
  const stories = useMemo(() => {
    const active = companyStories.filter((s) => s.status === "active");

    const tierWeight: Record<string, number> = { featured: 0, premium: 1, standard: 2 };

    return [...active].sort((a, b) => {
      // 1. Tier priority
      const tierDiff = (tierWeight[a.tier] ?? 3) - (tierWeight[b.tier] ?? 3);
      if (tierDiff !== 0) return tierDiff;

      // 2. Unseen before seen (within same tier)
      const aUnseen = !seenMap[a.companyId]?.fullyViewed;
      const bUnseen = !seenMap[b.companyId]?.fullyViewed;
      if (aUnseen !== bUnseen) return aUnseen ? -1 : 1;

      // 3. Explicit order
      return a.order - b.order;
    });
  }, [seenMap]);

  return { stories, seenMap, markSlideSeen, isFullySeen, isUnseen, loading };
}
