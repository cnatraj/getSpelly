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
  completionTime
) => {
  const pointsEarned = isCorrect ? settingsStore.pointsPerCorrectWord : 0;

  const { error } = await supabase.from(tableName).insert({
    profile_id: profileStore.activeProfile.id,
    word_id: wordId,
    spelling_test_id: testId,
    is_correct: isCorrect,
    total_points: pointsEarned,
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
