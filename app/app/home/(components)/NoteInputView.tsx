import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from "react-native-reanimated";

type Props = {
  text: string;
  onChange: (text: string) => void;
  onSubmit: () => Promise<void>;
};

export default function NoteInputView(props: Props) {
  const { text, onChange, onSubmit } = props;
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onSubmit();
      onChange("");
    } catch (err) {
      console.error("Failed to submit note", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ paddingHorizontal: 12, paddingVertical: 6 }}>
        <Text style={{ fontFamily: "Geist_400Regular", fontSize: 13 }}>
          Add a Note
        </Text>
      </View>

      {/* Divider */}
      <View style={{ height: 1, backgroundColor: "#eee" }} />

      {/* Input */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          paddingHorizontal: 12,
          paddingVertical: 6,
        }}
      >
        <TextInput
          value={text}
          onChange={(e) => onChange(e.nativeEvent.text)}
          placeholder="What do you want to remember?"
          style={[styles.input]}
          multiline={true}
        />

        {/* Submit Button (animates in when text is non-empty) */}
        <SubmitButtonAnimated text={text} loading={loading} onSubmit={submit} />
      </View>
    </View>
  );
}

function SubmitButtonAnimated({
  text,
  loading,
  onSubmit,
}: {
  text: string;
  loading: boolean;
  onSubmit: () => Promise<void>;
}) {
  const visible = useSharedValue(text.trim().length > 0 ? 1 : 0);

  useEffect(() => {
    const shouldShow = text.trim().length > 0;
    visible.value = shouldShow
      ? withTiming(1, { duration: 180 })
      : withTiming(0, { duration: 160 });
  }, [text, visible]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(visible.value, [0, 1], [6, 0]);
    return {
      opacity: visible.value,
      transform: [{ translateY }],
    } as any;
  });

  const isVisible = text.trim().length > 0;

  return (
    <Animated.View
      style={[
        { width: "100%", display: "flex", alignItems: "flex-end" },
        animatedStyle,
      ]}
      pointerEvents={isVisible ? "auto" : "none"}
    >
      <Pressable onPress={() => onSubmit()} accessibilityRole="button">
        <View style={styles.button}>
          {loading ? (
            <ActivityIndicator color="#fff" size={16} />
          ) : (
            <FontAwesome name="check" color="#fff" size={16} />
          )}
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 16,
    display: "flex",
    flexDirection: "column",
    gap: 0,
    alignItems: "stretch",
  },
  input: {
    fontFamily: "Geist_400Regular",
    height: 64,
    fontSize: 16,
  },
  button: {
    height: 30,
    width: 30,
    backgroundColor: "#ff5e00",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
  },
});
