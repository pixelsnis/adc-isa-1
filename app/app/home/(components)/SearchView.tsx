import { useState } from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import { ModelMessage } from "ai";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import AIService from "@/lib/ai";

export default function SearchView() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ModelMessage[]>([]);

  const resultAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: loading || messages.length > 0 ? 1 : 0,
      transform: [
        {
          translateY: loading || messages.length > 0 ? 0 : -36,
        },
      ],
    };
  });

  const onSubmit = async ({ query }: { query: string }) => {
    if (loading) return;

    setLoading(true);

    try {
      setMessages((prev) => [
        ...prev,
        { role: "user", content: [{ type: "text", text: query }] },
      ]);

      const result = await AIService.ask(messages);
      if (!result) {
        throw new Error("No response from AI service");
      }

      setMessages((prev) => [...prev, ...result]);
    } catch (err) {
      console.error("Failed to submit search", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.overlay}>
      <SafeAreaView style={styles.safeArea}>
        <Animated.View style={resultAnimatedStyle}>
          <SearchResult loading={loading} messages={messages} />
        </Animated.View>
        <SearchInput query={query} onChange={setQuery} onSubmit={onSubmit} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.54)",
  },
  safeArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
