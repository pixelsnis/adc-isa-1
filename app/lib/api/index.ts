import Contract from "@waffles/contract";
import { initClient } from "@ts-rest/core";
import { supabase } from "../supabase";

const getClient = async (
  options: { authenticated?: boolean } = { authenticated: true }
) => {
  const baseHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (options.authenticated) {
    const session = await supabase.auth.getSession();
    const accessToken = session.data.session?.access_token;

    if (!accessToken) {
      throw new Error("No access token found");
    }

    baseHeaders.Authorization = `Bearer ${accessToken}`;
  }

  return initClient(Contract, {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000",
    baseHeaders,
  });
};

export const API = {
  getClient,
};
