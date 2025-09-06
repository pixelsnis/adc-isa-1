import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient, processLock } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://ruipsahegjajpshqviry.supabase.co",
  "sb_publishable_W3LPZ0GDRaMb83w1bDjetQ_aNf5eaSV",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  }
);
