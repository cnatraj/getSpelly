import { supabase } from "./client";

export const getPointsForProfile = async (profileId) => {
  const { data, error } = await supabase
    .from("profile_points")
    .select(
      "total_points, total_games_played, perfect_games, fastest_time_ms, daily_streak, highest_daily_streak"
    )
    .eq("profile_id", profileId)
    .single();
  return { data, error };
};

export const initializePointsForProfile = async (profileId) => {
  const { data, error } = await supabase
    .from("profile_points")
    .insert({
      profile_id: profileId,
      total_points: 0,
      total_games_played: 0,
      perfect_games: 0,
      fastest_time_ms: null,
      daily_streak: 0,
      highest_daily_streak: 0,
    })
    .select()
    .single();
  return { data, error };
};

export const updateStatsForProfile = async (profileId, updates) => {
  console.log("Services.updateStatsForProfile---");
  console.log("updates", updates);
  const { data, error } = await supabase
    .from("profile_points")
    .update(updates)
    .eq("profile_id", profileId);

  return { data, error };
};
