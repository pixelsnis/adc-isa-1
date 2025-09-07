import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { Geist_400Regular, Geist_600SemiBold } from "@expo-google-fonts/geist";
import { PTSerif_700Bold } from "@expo-google-fonts/pt-serif";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Geist_400Regular,
    Geist_600SemiBold,
    PTSerif_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) {
      SplashScreen.preventAutoHideAsync();
    } else {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return <Stack />;
}
