import { Stack } from "expo-router";
import {
  useFonts as useGeist,
  Geist_400Regular,
  Geist_600SemiBold,
} from "@expo-google-fonts/geist";
import {
  useFonts as usePTSerif,
  PTSerif_700Bold,
} from "@expo-google-fonts/pt-serif";
import { SplashScreen } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const [geistLoaded] = useGeist({
    Geist_400Regular,
    Geist_600SemiBold,
  });
  const [ptSerifLoaded] = usePTSerif({
    PTSerif_700Bold,
  });

  const fontsLoaded = geistLoaded && ptSerifLoaded;

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
