import {
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import { useState } from "react";

type Props = {
  query: string;
  onChange: (text: string) => void;
  onSubmit: ({ query }: { query: string }) => Promise<void>;
};

export default function SearchInput({ query, onChange, onSubmit }: Props) {
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (loading) return;

    setLoading(true);
    try {
      await onSubmit({ query: query.trim() });
    } catch (err) {
      console.error("Failed to submit search", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 16,
        paddingVertical: 10,
        paddingRight: 10,
        backgroundColor: "#fff",
        borderRadius: 24,
        margin: 12,
      }}
    >
      <TextInput
        value={query}
        onChangeText={(text) => {
          if (loading) return;
          onChange(text);
        }}
        placeholder="Ask a question"
        style={{
          fontFamily: "Geist_400Regular",
          fontSize: 16,
          flex: 1,
        }}
        returnKeyType="send"
        onSubmitEditing={() => {
          if (query.trim() !== "") submit();
        }}
      />

      <TouchableOpacity
        onPress={submit}
        disabled={query.trim() === ""}
        style={{
          height: 30,
          width: 30,
          borderRadius: 15,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ff5e00",
          opacity: query.trim() === "" ? 0.5 : 1,
        }}
        accessibilityLabel="Send"
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <FontAwesome name="arrow-up" color="#fff" size={16} />
        )}
      </TouchableOpacity>
    </View>
  );
}
