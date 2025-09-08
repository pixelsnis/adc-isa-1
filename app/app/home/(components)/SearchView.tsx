import React, { useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";
import { ModelMessage } from "ai";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";
import AIService from "@/lib/ai";

export default function SearchView({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ModelMessage[]>([]);

  const rootOpacity = useSharedValue(0);
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

  React.useEffect(() => {
    rootOpacity.value = withTiming(1, {
      duration: 240,
      easing: Easing.out(Easing.cubic),
    });
    return () => {
      rootOpacity.value = withTiming(0, { duration: 160 });
    };
  }, [rootOpacity]);

  const rootStyle = useAnimatedStyle(() => ({
    opacity: rootOpacity.value,
  }));

  const onSubmit = async ({ query }: { query: string }) => {
    if (loading) return;

    setLoading(true);

    try {
      const newMessages: ModelMessage[] = [
        ...messages,
        { role: "user", content: [{ type: "text", text: query }] },
      ];

      setQuery("");

      const result = await AIService.ask(newMessages);
      if (!result) {
        throw new Error("No response from AI service");
      }

      setMessages([...newMessages, ...result]);
    } catch (err) {
      console.error("Failed to submit search", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View style={[styles.overlay, rootStyle]}>
      <TouchableWithoutFeedback onPress={() => onClose && onClose()}>
        <View style={StyleSheet.absoluteFill} />
      </TouchableWithoutFeedback>

      <SafeAreaView style={styles.safeArea} pointerEvents="box-none">
        <Animated.View style={resultAnimatedStyle}>
          <SearchResult loading={loading} messages={messages} />
        </Animated.View>
        <SearchInput query={query} onChange={setQuery} onSubmit={onSubmit} />
      </SafeAreaView>
    </Animated.View>
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
