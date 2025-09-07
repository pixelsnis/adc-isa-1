import { Stack } from "expo-router";
import { View } from "react-native";

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View>{/* Put view here */}</View>
    </>
  );
}
