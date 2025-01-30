import { defineStore } from "pinia";
import { ref } from "vue";
import {
  getPointsForProfile,
  initializePointsForProfile,
  updateStatsForProfile,
} from "@/services/profilePoints";

export const usePointsStore = defineStore("points", () => {
  const loading = ref(false);
  const points = ref(0);
  const totalGamesPlayed = ref(0);
  const perfectGames = ref(0);
  const fastestTime = ref(null);

  const fetchPoints = async (profileId) => {
    console.log("---fetchPoints---");
    if (!profileId) return;
    try {
      const { data, error } = await getPointsForProfile(profileId);

      if (error && error.code !== "PGRST116") throw error;

      if (data) {
        points.value = data.total_points;
        totalGamesPlayed.value = data.total_games_played;
        perfectGames.value = data.perfect_games;
        fastestTime.value = data.fastest_time_ms;
      } else {
        await initializePoints(profileId);
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
      let updates = {
        total_points: points.value + newPoints,
        total_games_played: totalGamesPlayed.value + 1,
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

      const { data, error } = updateStatsForProfile(profileId, updates);

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

  return {
    points,
    totalGamesPlayed,
    perfectGames,
    loading,
    fetchPoints,
    updateGameStats,
    resetPoints,
  };
});
