import { Stack } from "expo-router";
import { StyleSheet, View, Text, SafeAreaView } from "react-native";
import NoteInputView from "./(components)/NoteInputView";
import { useState } from "react";
import NoteGroup from "./(components)/NoteGroup";

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
            <View style={{ height: 16 }} />

            <View
              style={{
                alignItems: "stretch",
                justifyContent: "flex-start",
                gap: 16,
              }}
            >
              <Text style={{ fontSize: 36, fontFamily: "PTSerif_700Bold" }}>
                Notes
              </Text>

              {/* Input field */}
              <NoteInputView
                text={text}
                onChange={setText}
                onSubmit={onSubmit}
              />
            </View>

            {/* Divider */}
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 6,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {[...Array(3)].map((_, idx) => (
                <View
                  key={idx}
                  style={{
                    height: 6,
                    width: 6,
                    borderRadius: 3,
                    backgroundColor: "#ccc",
                  }}
                />
              ))}
            </View>

            {/* Notes */}
            <NoteGroup
              title="Example"
              notes={[
                {
                  text: "This is an example note",
                  createdAt: new Date(),
                },
                {
                  text: "This is another example note",
                  createdAt: new Date(),
                },
              ]}
            />
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
