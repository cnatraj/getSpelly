import { supabase } from "./client";

export const getUserAccountByUserId = async (userId) => {
  const { data: existingAccount } = await supabase
    .from("accounts")
    .select()
    .eq("user_id", userId)
    .single();

  return existingAccount;
};

export const createUserAccount = async (userId, fullName) => {
  const { error: insertError } = await supabase.from("accounts").insert({
    user_id: userId,
    name: fullName || "User",
    created_at: new Date().toISOString(),
  });

  return insertError;
};
