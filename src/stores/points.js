import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getPointsForProfile,
  initializePointsForProfile,
  updateStatsForProfile,
} from "@/services/profilePoints";

import { getLastTestCompletionDate } from "@/services/tests";

export const usePointsStore = defineStore("points", () => {
  const loading = ref(false);
  const points = ref(0);
  const totalGamesPlayed = ref(0);
  const perfectGames = ref(0);
  const dailyStreak = ref(0);
  const highestDailyStreak = ref(0);
  const fastestTime = ref(null);

  const fetchPoints = async (profileId) => {
    console.log("---fetchPoints---");
    if (!profileId) return;
    try {
      const { data, error } = await getPointsForProfile(profileId);

      if (error && error.code !== "PGRST116") throw error;
      if (error?.code === "PGRST116") {
        // No points record found for this profile
        // Initialize points for the profile
        await initializePoints(profileId);
      } else if (error) {
        throw error;
      } else if (data) {
        points.value = data.total_points;
        totalGamesPlayed.value = data.total_games_played;
        perfectGames.value = data.perfect_games;
        fastestTime.value = data.fastest_time_ms;
        dailyStreak.value = data.daily_streak;
        highestDailyStreak.value = data.highest_daily_streak;
      }
    } catch (error) {
      console.log("Error fetching points:", error);
      resetPoints();
    }
  };

  const initializePoints = async (profileId) => {
    console.log("---initializePoints---");
    try {
      const { data, error } = await initializePointsForProfile(profileId);

      if (error) throw error;

      points.value = data.total_points;
      totalGamesPlayed.value = data.total_games_played;
      perfectGames.value = data.perfect_games;
      fastestTime.value = data.fastest_time_ms;
      dailyStreak.value = data.daily_streak;
      highestDailyStreak.value = data.highest_daily_streak;
    } catch (error) {
      console.log("Error initializing points: ", error);
      resetPoints();
    }
  };

  const updateGameStats = async (
    profileId,
    newPoints,
    isPerfectGame = false,
    completionTimeMs = null
  ) => {
    console.log("---PointsStore.updateGameStats---");

    if (!profileId) {
      throw "No Profile Id";
    }

    try {
      loading.value = true;

      let newStreak = await getNewStreak(profileId);

      // Update highest streak if current streak is higher
      let newHighestStreak = highestDailyStreak.value;
      if (newStreak > newHighestStreak) {
        newHighestStreak = newStreak;
      }

      let updates = {
        total_points: points.value + newPoints,
        total_games_played: totalGamesPlayed.value + 1,
        daily_streak: newStreak,
        highest_daily_streak: newHighestStreak,
      };
      if (isPerfectGame) {
        updates.perfect_games = perfectGames.value + 1;
      }
      // Update fastest time if this completion is faster
      if (
        completionTimeMs &&
        (!fastestTime.value || completionTimeMs < fastestTime.value)
      ) {
        updates.fastest_time_ms = completionTimeMs;
      }
      const { data, error } = await updateStatsForProfile(profileId, updates);

      if (error) throw error;

      // fetch points
      await fetchPoints(profileId);
    } catch (error) {
      console.error("Error updating game stats:", error);
    } finally {
      loading.value = false;
    }
  };

  const resetPoints = () => {
    points.value = 0;
    totalGamesPlayed.value = 0;
    perfectGames.value = 0;
    fastestTime.value = null;
  };

  const getNewStreak = async (profileId) => {
    // Get last test completion date
    const { data: lastTest, error: lastTestError } =
      await getLastTestCompletionDate(profileId);

    // return { data, error };
    // await getLastTestCompletionDate(profileId);

    if (lastTestError && lastTestError.code !== "PGRST116") throw lastTestError;

    // Calculate streak using store values
    let newStreak = dailyStreak.value;

    let newHighestStreak = highestDailyStreak.value;

    const today = new Date().toISOString().split("T")[0];

    if (!lastTest) {
      // First test ever
      newStreak = 1;
    } else {
      const lastTestDate = new Date(lastTest.completed_at)
        .toISOString()
        .split("T")[0];

      if (lastTestDate === today) {
        // Already completed a test today, maintain streak
        newStreak = dailyStreak.value;
      } else {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayString = yesterday.toISOString().split("T")[0];

        if (lastTestDate === yesterdayString) {
          // Completed test yesterday, increment streak
          newStreak = dailyStreak.value + 1;
        } else {
          // Streak broken
          newStreak = 1;
        }
      }
    }

    return newStreak;
  };

  return {
    points,
    totalGamesPlayed,
    perfectGames,
    fastestTime,
    dailyStreak,
    highestDailyStreak,
    loading,
    fetchPoints,
    updateGameStats,
    resetPoints,
  };
});
