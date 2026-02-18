import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo, useRef, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radius } from "../constants/theme";
import { useSavedJobs } from "../context/SavedJobsContext";
import { jobs } from "../data/jobs";
import { Job } from "../types/models";

const SCREEN_HEIGHT = Dimensions.get("window").height;

export function DiscoverScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const cardHeight = SCREEN_HEIGHT - tabBarHeight - 10;
  const { isSaved, toggleSaved } = useSavedJobs();
  const [currentIndex, setCurrentIndex] = useState(0);

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 60 });
  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (
        viewableItems.length > 0 &&
        typeof viewableItems[0].index === "number"
      ) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  );

  const keyExtractor = (item: Job) => item.id;

  const applyNow = useMemo(() => jobs[currentIndex], [currentIndex]);

  return (
    <FlatList
      data={jobs}
      keyExtractor={keyExtractor}
      renderItem={({ item, index }) => (
        <View style={[styles.page, { height: cardHeight }]}>
          <ImageBackground
            source={{ uri: item.bgImage }}
            style={StyleSheet.absoluteFill}
            resizeMode="cover"
          />

          <LinearGradient
            colors={[item.gradient[0], item.gradient[1]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[StyleSheet.absoluteFill, { opacity: 0.85 }]}
          />

          <LinearGradient
            colors={[
              "rgba(255,255,255,0.45)",
              "rgba(255,255,255,0.25)",
              "transparent",
            ]}
            locations={[0, 0.35, 0.8]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.spotlight}
          />

          <LinearGradient
            colors={["rgba(0,0,0,0.3)", "rgba(0,0,0,0.5)", "rgba(0,0,0,0.72)"]}
            style={StyleSheet.absoluteFill}
          />

          <View
            style={[
              styles.content,
              {
                paddingTop: insets.top + 10,
              },
            ]}
          >
            <View>
              <View style={styles.companyRow}>
                <View style={styles.logoWrap}>
                  <Image
                    source={{ uri: item.logoImage }}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.companyTextWrap}>
                  <Text style={styles.company}>{item.company}</Text>
                </View>
                <View style={styles.matchWrap}>
                  <View style={styles.matchDot} />
                  <Text style={styles.matchText}>
                    {item.compatibilityScore}% Match
                  </Text>
                </View>
              </View>

              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.salary}>{item.salary}</Text>

              <View style={styles.badgeRow}>
                <View style={styles.badge}>
                  <Ionicons
                    name="location-outline"
                    size={15}
                    color={colors.white}
                  />
                  <Text style={styles.badgeText}>{item.location}</Text>
                </View>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.type}</Text>
                </View>
              </View>
            </View>

            <View style={{ paddingBottom: 24 }}>
              <Text style={styles.description}>{item.description}</Text>

              <View style={styles.infoPanel}>
                <View style={styles.infoCell}>
                  <Ionicons
                    name="briefcase-outline"
                    size={18}
                    color={colors.white}
                  />
                  <Text style={styles.infoLabel}>Experience</Text>
                  <Text style={styles.infoValue}>{item.experience}</Text>
                </View>
                <View style={[styles.infoCell, styles.infoBorder]}>
                  <Ionicons
                    name="calendar-outline"
                    size={18}
                    color={colors.white}
                  />
                  <Text style={styles.infoLabel}>Schedule</Text>
                  <Text style={styles.infoValue}>{item.schedule}</Text>
                </View>
                <View style={styles.infoCell}>
                  <Ionicons name="map-outline" size={18} color={colors.white} />
                  <Text style={styles.infoLabel}>Work Type</Text>
                  <Text style={styles.infoValue}>{item.workType}</Text>
                </View>
              </View>

              <View style={styles.benefitsRow}>
                {item.benefits.slice(0, 4).map((benefit) => (
                  <Text key={benefit} style={styles.benefitPill}>
                    {benefit}
                  </Text>
                ))}
              </View>

              {index === currentIndex ? (
                <View style={styles.actionRow}>
                  <Pressable
                    style={[
                      styles.bookmarkButton,
                      isSaved(item.id) && styles.bookmarkButtonSaved,
                    ]}
                    onPress={() => toggleSaved(item.id)}
                  >
                    <Ionicons name="bookmark" size={24} color={colors.white} />
                  </Pressable>
                  <Pressable
                    style={styles.applyButton}
                    onPress={() =>
                      Alert.alert(
                        "Apply",
                        `Applying to ${applyNow.title} at ${applyNow.company}`,
                      )
                    }
                  >
                    <Text style={styles.applyText}>Apply Now</Text>
                  </Pressable>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      )}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      bounces={false}
      snapToInterval={cardHeight}
      decelerationRate="fast"
      viewabilityConfig={viewabilityConfig.current}
      onViewableItemsChanged={onViewableItemsChanged.current}
      getItemLayout={(_, index) => ({
        length: cardHeight,
        offset: cardHeight * index,
        index,
      })}
    />
  );
}

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
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  companyRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    gap: 10,
  },
  logoWrap: {
    width: 58,
    height: 58,
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 14,
    padding: 8,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    fontSize: 42,
    lineHeight: 46,
    fontWeight: "900",
    marginBottom: 6,
  },
  salary: {
    color: colors.white,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "800",
    marginBottom: 14,
  },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 14,
    paddingVertical: 9,
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
    marginBottom: 14,
  },
  infoPanel: {
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 14,
    flexDirection: "row",
    marginBottom: 14,
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
    gap: 8,
    marginBottom: 14,
  },
  benefitPill: {
    color: "rgba(255,255,255,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.15)",
    fontSize: 13,
    fontWeight: "500",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
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
    backgroundColor: colors.yellow500,
    borderColor: colors.yellow500,
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
