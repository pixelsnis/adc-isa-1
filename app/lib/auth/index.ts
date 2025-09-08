import { API } from "../api";
import { supabase } from "../supabase";

const signInWithEmail = async (email: string, password: string) => {
  console.info("Auth.signInWithEmail start", { email });

  var client = await API.getClient({ authenticated: false });

  // Check if the account exists
  const existsResponse = await client.account.exists({ body: { email } });
  console.info("Auth.existsResponse", {
    status: existsResponse.status,
    body: existsResponse.body,
  });
  if (existsResponse.status !== 200) {
    console.info("Auth.existsResponse failed", {
      status: existsResponse.status,
    });
    throw new Error("Failed to check if account exists");
  }

  const exists = existsResponse.body.exists;

  // If the account doesn't exist, create it and make the account
  if (!exists) {
    console.info("Auth: account does not exist, signing up", { email });
    await supabase.auth.signUp({ email, password });

    client = await API.getClient({ authenticated: true });

    const created = await client.account.create({ body: { email } });
    console.info("Auth.createResponse", {
      status: created.status,
      body: created.body,
    });

    if (created.status !== 201) {
      console.info("Auth.create failed", { status: created.status });
      throw new Error("Failed to create account");
    }

    console.info("Auth: account created", { email });
    return {
      user: created.body,
    };
  }

  // If the account exists, sign in
  console.info("Auth: account exists, signing in", { email });
  await supabase.auth.signInWithPassword({ email, password });

  client = await API.getClient({ authenticated: true });

  const user = await client.account.get();
  console.info("Auth.getUserResponse", {
    status: user.status,
    body: user.body,
  });

  if (user.status !== 200) {
    console.info("Auth.get user failed", { status: user.status });
    throw new Error("Failed to fetch user after sign-in");
  }

  console.info("Auth.signInWithEmail success", { email });
  return {
    user: user.body,
  };
};

export const AuthService = {
  signInWithEmail,
};
