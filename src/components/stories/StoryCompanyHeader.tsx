import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import { spacing, typography } from "../../constants/theme";
import { useTheme } from "../../hooks/useTheme";
import type { CompanyStory } from "../../types/story";

interface StoryCompanyHeaderProps {
  company: CompanyStory;
  onClose: () => void;
}

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return "Just now";
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function StoryCompanyHeader({ company, onClose }: StoryCompanyHeaderProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {/* Company logo */}
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: company.companyLogo }}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        {/* Company info */}
        <View style={styles.info}>
          <Text style={styles.companyName} numberOfLines={1}>
            {company.companyName}
          </Text>
          <Text style={styles.meta}>
            Sponsored{" \u00B7 "}{formatRelativeTime(company.publishedAt)}
          </Text>
        </View>
      </View>

      {/* Close button */}
      <Pressable
        onPress={onClose}
        style={[
          styles.closeButton,
          {
            backgroundColor: colors.glass,
            borderColor: colors.glassBorder,
          },
        ]}
        hitSlop={12}
        accessibilityLabel="Close story"
        accessibilityRole="button"
      >
        <Ionicons name="close" size={22} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const CLOSE_SIZE = 40;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    flex: 1,
  },
  logoContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
  },
  logo: {
    width: 28,
    height: 28,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  companyName: {
    ...typography.subheading,
    color: "#FFFFFF",
    fontWeight: "700",
  },
  meta: {
    ...typography.caption,
    color: "rgba(255,255,255,0.5)",
  },
  closeButton: {
    width: CLOSE_SIZE,
    height: CLOSE_SIZE,
    borderRadius: CLOSE_SIZE / 2,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
