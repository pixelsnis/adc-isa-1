import { ModelMessage } from "ai";
import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  FadeInDown,
  FadeOutDown,
  FadeInUp,
  FadeOutUp,
} from "react-native-reanimated";

type Props = {
  loading: boolean;
  messages: ModelMessage[];
};

export default function SearchResult({ loading, messages }: Props) {
  const text = useMemo(() => {
    if (messages.length === 0) return "";

    // Get last assistant message
    const assistantMessage = [...messages]
      .reverse()
      .find((m) => m.role === "assistant");

    // If the content type is string, return it
    if (assistantMessage && typeof assistantMessage.content === "string") {
      return assistantMessage.content;
    }

    // Otherwise, iterate through the content array and concatenate all string parts
    if (assistantMessage && Array.isArray(assistantMessage.content)) {
      return assistantMessage.content
        .map((part) => (part.type == "text" ? part.text : ""))
        .join("");
    }
    return "";
  }, [messages]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Animated.View
          key="thinking"
          entering={FadeInDown.duration(300)}
          exiting={FadeOutDown.duration(200)}
        >
          <Text style={[styles.text, { textAlign: "center" }]}>
            Thinking...
          </Text>
        </Animated.View>
      ) : (
        <Animated.View
          key="result"
          entering={FadeInUp.duration(300)}
          exiting={FadeOutUp.duration(200)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          <Text style={styles.text}>{text}</Text>
          <Text
            style={{
              fontFamily: "Geist_400Regular",
              fontSize: 12,
              color: "#aaa",
            }}
          >
            Waffles may make mistakes. Double-check sensitive answers.
          </Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 23,
    borderWidth: 1,
    borderColor: "#FF5E00",
    // iOS shadow
    shadowColor: "#FF5E00",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 18,
    // Android elevation
    elevation: 12,
    margin: 12,
  },
  text: {
    fontFamily: "Geist_400Regular",
    fontSize: 16,
    textAlign: "left",
  },
});
