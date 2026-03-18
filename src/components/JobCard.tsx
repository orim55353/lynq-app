import { memo, useCallback, useMemo } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import {
  Alert,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import {
  colors,
  getFontScale,
  radius,
  spacing,
  horizontalPaddingBounds,
} from "../constants/theme";
import { Job } from "../types/models";
import { clamp } from "../utils/math";

interface JobCardProps {
  job: Job;
  cardHeight: number;
  topOffset: number;
  bottomOffset: number;
  isSaved: boolean;
  onToggleSaved: (jobId: string) => void;
}

export const JobCard = memo(function JobCard({
  job,
  cardHeight,
  topOffset,
  bottomOffset,
  isSaved,
  onToggleSaved,
}: JobCardProps) {
  const { width } = useWindowDimensions();
  const layout = useMemo(
    () => ({
      horizontalPadding: clamp(
        width * 0.06,
        horizontalPaddingBounds.min,
        horizontalPaddingBounds.max,
      ),
      descriptionLines: clamp(Math.floor(cardHeight / 180), 3, 6),
    }),
    [cardHeight, width],
  );

  const fontScale = useMemo(() => getFontScale(width), [width]);
  const fontSizes = useMemo(
    () => ({
      company: Math.round(18 * fontScale),
      matchText: Math.round(12 * fontScale),
      title: Math.round(36 * fontScale),
      titleLineHeight: Math.round(36 * fontScale),
      salary: Math.round(26 * fontScale),
      salaryLineHeight: Math.round(30 * fontScale),
      badgeText: Math.round(14 * fontScale),
      description: Math.round(14 * fontScale),
      descriptionLineHeight: Math.round(21 * fontScale),
      infoLabel: Math.round(11 * fontScale),
      infoValue: Math.round(11 * fontScale),
      benefitPill: Math.round(13 * fontScale),
      applyText: Math.round(20 * fontScale),
    }),
    [fontScale],
  );

  const contentStyle = useMemo(
    () => [
      styles.content,
      {
        paddingTop: topOffset,
        paddingBottom: bottomOffset,
        paddingHorizontal: layout.horizontalPadding,
      },
    ],
    [layout.horizontalPadding, topOffset, bottomOffset],
  );

  const onToggleSavePress = useCallback(() => {
    onToggleSaved(job.id);
  }, [job.id, onToggleSaved]);

  const onApplyPress = useCallback(() => {
    Alert.alert("Apply", `Applying to ${job.title} at ${job.company}`);
  }, [job.company, job.title]);

  return (
    <View style={[styles.page, { height: cardHeight }]}>
      <ImageBackground
        source={{ uri: job.bgImage }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      />

      <LinearGradient
        colors={[job.gradient[0], job.gradient[1]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[StyleSheet.absoluteFill, { opacity: 0.85 }]}
      />

      <LinearGradient
        colors={["rgba(255,255,255,0.45)", "rgba(255,255,255,0.25)", "transparent"]}
        locations={[0, 0.35, 0.8]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.spotlight}
      />

      <LinearGradient
        colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.72)"]}
        style={StyleSheet.absoluteFill}
      />

      <View style={contentStyle}>
        <View style={styles.topSection}>
          <View style={styles.companyRow}>
            <View style={styles.logoWrap}>
              <Image source={{ uri: job.logoImage }} style={styles.logo} resizeMode="contain" />
            </View>
            <View style={styles.companyTextWrap}>
              <Text style={[styles.company, { fontSize: fontSizes.company }]}>{job.company}</Text>
            </View>
            <View style={styles.matchWrap}>
              <View style={styles.matchDot} />
              <Text style={[styles.matchText, { fontSize: fontSizes.matchText }]}>{job.compatibilityScore}% Match</Text>
            </View>
          </View>

          <Text style={[styles.title, { fontSize: fontSizes.title, lineHeight: fontSizes.titleLineHeight }]}>
            {job.title}
          </Text>
          <Text style={[styles.salary, { fontSize: fontSizes.salary, lineHeight: fontSizes.salaryLineHeight }]}>
            {job.salary}
          </Text>

          <View style={styles.badgeRow}>
            <View style={styles.badge}>
              <Ionicons name="location-outline" size={15} color={colors.white} />
              <Text style={[styles.badgeText, { fontSize: fontSizes.badgeText }]}>{job.location}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={[styles.badgeText, { fontSize: fontSizes.badgeText }]}>{job.type}</Text>
            </View>
          </View>
        </View>

        <View style={styles.spacer} />

        <View style={styles.bottomSection}>
          <Text
            style={[
              styles.description,
              { fontSize: fontSizes.description, lineHeight: fontSizes.descriptionLineHeight },
            ]}
            numberOfLines={layout.descriptionLines}
            ellipsizeMode="tail"
          >
            {job.description}
          </Text>

          <View style={styles.infoPanel}>
            <View style={styles.infoCell}>
              <Ionicons name="briefcase-outline" size={18} color={colors.white} />
              <Text style={[styles.infoLabel, { fontSize: fontSizes.infoLabel }]}>Experience</Text>
              <Text style={[styles.infoValue, { fontSize: fontSizes.infoValue }]}>{job.experience}</Text>
            </View>
            <View style={[styles.infoCell, styles.infoBorder]}>
              <Ionicons name="calendar-outline" size={18} color={colors.white} />
              <Text style={[styles.infoLabel, { fontSize: fontSizes.infoLabel }]}>Schedule</Text>
              <Text style={[styles.infoValue, { fontSize: fontSizes.infoValue }]}>{job.schedule}</Text>
            </View>
            <View style={styles.infoCell}>
              <Ionicons name="map-outline" size={18} color={colors.white} />
              <Text style={[styles.infoLabel, { fontSize: fontSizes.infoLabel }]}>Work Type</Text>
              <Text style={[styles.infoValue, { fontSize: fontSizes.infoValue }]}>{job.workType}</Text>
            </View>
          </View>

          <View style={styles.benefitsRow}>
            {job.benefits.slice(0, 4).map((benefit) => (
              <Text key={benefit} style={[styles.benefitPill, { fontSize: fontSizes.benefitPill }]}>
                {benefit}
              </Text>
            ))}
          </View>

          <View style={styles.actionRow}>
            <Pressable
              style={[styles.bookmarkButton, isSaved && styles.bookmarkButtonSaved]}
              onPress={onToggleSavePress}
            >
              <Ionicons
                name="bookmark"
                size={24}
                color={isSaved ? colors.black : colors.white}
              />
            </Pressable>
            <Pressable style={styles.applyButton} onPress={onApplyPress}>
              <Text style={[styles.applyText, { fontSize: fontSizes.applyText }]}>Apply Now</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  page: {
    width: "100%",
    backgroundColor: colors.black,
  },
  spotlight: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  topSection: {},
  spacer: {
    flex: 1,
  },
  bottomSection: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.sm,
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    gap: spacing.md,
  },
  logoWrap: {
    width: 58,
    height: 58,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 14,
    padding: spacing.sm,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  companyTextWrap: {
    flex: 1,
  },
  company: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },
  matchWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  matchDot: {
    width: 8,
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: "#4ADE80",
  },
  matchText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 12,
  },
  title: {
    color: colors.white,
    fontSize: 36,
    lineHeight: 36,
    fontWeight: "900",
    marginBottom: spacing.sm,
  },
  salary: {
    color: colors.white,
    fontSize: 26,
    lineHeight: 30,
    fontWeight: "700",
    marginBottom: spacing.sm,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.24)",
  },
  badgeText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    color: colors.white,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: spacing.lg,
  },
  infoPanel: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: spacing.md,
    flexDirection: "row",
    marginBottom: spacing.lg,
  },
  infoCell: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  infoBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  infoLabel: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 11,
    fontWeight: "500",
  },
  infoValue: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700",
  },
  benefitsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  benefitPill: {
    color: "rgba(255,255,255,0.9)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.15)",
    fontSize: 13,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  bookmarkButton: {
    width: 56,
    height: 56,
    borderRadius: radius.pill,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  bookmarkButtonSaved: {
    backgroundColor: colors.white,
    borderColor: colors.white,
  },
  applyButton: {
    flex: 1,
    height: 56,
    borderRadius: radius.pill,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  applyText: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "800",
  },
});
