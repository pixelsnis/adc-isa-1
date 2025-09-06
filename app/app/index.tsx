import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View } from "react-native";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      // Doesn't automatically push to /home when signed in so that any other API calls can finish.
      // Make sure to push to /home after sign in manually.
      if (!session) {
        router.replace("/login");
      }
    });
  }, []);

  return <View></View>;
}
