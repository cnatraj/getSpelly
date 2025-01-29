import { supabase } from "./client";
import { useSettingsStore } from "@/stores/settings";

const tableName = "test_words";
const settingsStore = useSettingsStore();

export const getWordsForProfile = async (profileId) => {
  // First, get the completed word IDs for the current profile
  const { data: completedWords } = await supabase
    .from("completed_words")
    .select("word_id")
    .eq("profile_id", profileId)
    .eq("is_correct", true);

  // Create the query based on whether there are completed words
  let query = supabase
    .from(tableName)
    .select("*")
    .limit(settingsStore.wordsPerTest);

  // Only add the not-in condition if there are completed words
  if (completedWords && completedWords.length > 0) {
    const completedWordIds = completedWords.map((cw) => cw.word_id) || [];
    query = query.not("id", "in", `(${completedWordIds.join(",")})`);
  }

  const { data, error } = await query;

  return { data, error };
};
