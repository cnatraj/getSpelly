import { streakBadges } from "@/constants/streakBadges";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useBadgesStore = defineStore("badges", () => {
  const maxStreak = ref(0);

  const setMaxStreak = (streak) => {
    maxStreak.value = streak;
  };

  const badges = computed(() => {
    return streakBadges.map((badge) => ({
      ...badge,
      isUnlocked: maxStreak.value >= badge.threshold,
    }));
  });

  const currentBadge = computed(() => {
    return (
      [...badges.value].reverse().find((badge) => badge.isUnlocked) || null
    );
  });

  return {
    setMaxStreak,
    badges,
    currentBadge,
  };
});
