import { Stack } from "expo-router";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import { NoteInputView } from "./(components)/NoteInputView";
import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");

  const onSubmit = async () => {};

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        {/* Content View */}
        <SafeAreaView>
          <View style={styles.contentView}>
            <Text style={{ fontSize: 36, fontFamily: "PTSerif_700Bold" }}>
              Notes
            </Text>

            {/* Input field */}
            <NoteInputView text={text} onChange={setText} onSubmit={onSubmit} />
          </View>
        </SafeAreaView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },

  contentView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: 24,
    paddingHorizontal: 16,
  },
});
