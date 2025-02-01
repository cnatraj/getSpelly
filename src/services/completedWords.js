import { useProfileStore } from "@/stores/profile";
import { supabase } from "./client";
import { useSettingsStore } from "@/stores/settings";

const tableName = "completed_words";
const settingsStore = useSettingsStore();
const profileStore = useProfileStore();

export const markWordInTestAsComplete = async (
  testId,
  wordId,
  isCorrect,
  completionTime,
  timeBonus
) => {
  const pointsEarned = isCorrect ? settingsStore.pointsPerCorrectWord : 0;
  const totalPoints = pointsEarned + timeBonus;

  const { error } = await supabase.from(tableName).insert({
    profile_id: profileStore.activeProfile.id,
    word_id: wordId,
    spelling_test_id: testId,
    is_correct: isCorrect,
    time_bonus_points: timeBonus,
    correct_word_points: pointsEarned,
    total_points: totalPoints,
    completion_time_ms: completionTime,
  });

  return { error };
};

export const getCompletedWordsForTest = async (testId) => {
  const { data, error } = await supabase
    .from(tableName)
    .select(
      `
    *,
    test_words (
        word,
        is_difficult
    )
    `
    )
    .eq("spelling_test_id", testId)
    .eq("profile_id", profileStore.activeProfile.id);

  return { data, error };
};

export const getTotalCorrectWords = async (profileId) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("is_correct")
    .eq("profile_id", profileId)
    .eq("is_correct", true);

  return { data, error };
};
