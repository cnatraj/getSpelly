import { supabase } from "./client";

export const getProfilesByUserId = async (userId) => {
  const { data, error } = await supabase
    .from("profiles")
    .select()
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  return { data, error };
};

export const createProfileForUserId = async (userId, profileName) => {
  const { data, error } = await supabase
    .from("profiles")
    .insert({
      user_id: userId,
      name: profileName,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
};
