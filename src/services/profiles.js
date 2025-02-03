import { titles } from "@/constants/titles";
import { supabase } from "./client";

const tableName = "profiles";

export const getProfilesByUserId = async (userId) => {
  const { data, error } = await supabase
    .from(tableName)
    .select()
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  return { data, error };
};

export const createProfileForUserId = async (userId, profileName) => {
  const { data, error } = await supabase
    .from(tableName)
    .insert({
      user_id: userId,
      name: profileName,
      title: titles[0].title,
      created_at: new Date().toISOString(),
    })
    .select()
    .single();

  return { data, error };
};

export const updateProfileForProfileId = async (profileId, profileData) => {
  const { data, error } = await supabase
    .from(tableName)
    .update(profileData)
    .eq("id", profileId)
    .select()
    .single();

  return { data, error };
};
