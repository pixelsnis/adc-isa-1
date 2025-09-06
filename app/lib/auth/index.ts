import { API } from "../api";
import { supabase } from "../supabase";

const signInWithEmail = async (email: string, password: string) => {
  const client = await API.getClient();

  // Check if the account exists
  const existsResponse = await client.account.exists({ body: { email } });
  if (existsResponse.status !== 200) {
    throw new Error("Failed to check if account exists");
  }

  const exists = existsResponse.body.exists;

  // If the account doesn't exist, create it and make the account
  if (!exists) {
    await supabase.auth.signUp({ email, password });
    const created = await client.account.create({ body: { email } });

    if (created.status !== 201) {
      throw new Error("Failed to create account");
    }

    return {
      user: created.body,
    };
  }

  // If the account exists, sign in
  await supabase.auth.signInWithPassword({ email, password });
  const user = await client.account.get();

  if (user.status !== 200) {
    throw new Error("Failed to fetch user after sign-in");
  }

  return {
    user: user.body,
  };
};

export const AuthService = {
  signInWithEmail,
};
