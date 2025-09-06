import Contract from "@waffles/contract";
import { initClient } from "@ts-rest/core";
import { supabase } from "../supabase";

const getClient = async () => {
  const session = await supabase.auth.getSession();
  const accessToken = session.data.session?.access_token;

  if (!accessToken) {
    throw new Error("No access token found");
  }

  return initClient(Contract, {
    baseUrl: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000",
    baseHeaders: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const API = {
  getClient,
};
