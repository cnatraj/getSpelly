import { supabase } from "./client";

const tableName = "spelling_tests";

export const createTestForProfile = async (profileId, totalWords) => {
  const { data, error } = await supabase
    .from(tableName)
    .insert({
      profile_id: profileId,
      total_words: totalWords,
      is_complete: false,
      test_score: 0,
    })
    .select()
    .single();

  return { data, error };
};

export const saveCompletedTestResult = async (
  testId,
  totalScore,
  correctSpellings,
  isPerfectTest
) => {
  const { error } = await supabase
    .from(tableName)
    .update({
      test_score: totalScore,
      is_perfect: isPerfectTest,
      correct_spellings: correctSpellings,
      is_complete: true,
      completed_at: new Date().toISOString(),
    })
    .eq("id", testId);

  return { error };
};

export const getOneTestDetails = async (testId, profileId) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("id", testId)
    .eq("profile_id", profileId)
    .single();

  return { data, error };
};

export const getLastTestCompletionDate = async (profileId) => {
  const { data, error } = await supabase
    .from(tableName)
    .select("completed_at")
    .eq("profile_id", profileId)
    .order("completed_at", { ascending: false })
    .limit(1)
    .single();
  console.log("data", data);
  return { data, error };
};
