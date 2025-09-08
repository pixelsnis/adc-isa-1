import { Stack } from "expo-router";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import NoteInputView from "./(components)/NoteInputView";
import { useEffect, useState } from "react";
import NoteGroup from "./(components)/NoteGroup";
import NotesService from "@/lib/notes";

export default function Home() {
  const [text, setText] = useState("");
  const [fetching, setFetching] = useState(false);
  const [notes, setNotes] = useState<{ text: string; createdAt: Date }[]>([]);

  const fetchNotes = async () => {
    setFetching(true);
    try {
      const notes = await NotesService.load();
      setNotes(notes.map((n) => ({ text: n.content, createdAt: n.createdAt })));
    } catch (err) {
      console.error("Failed to fetch notes", err);
    } finally {
      setFetching(false);
    }
  };

  const onSubmit = async () => {
    if (text.trim() === "") return;

    setNotes((prev) => [{ text: text.trim(), createdAt: new Date() }, ...prev]);
    setText("");
  };

  useEffect(() => {
    fetchNotes();
  }, []);

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
            {notes.length === 0 ? null : (
              <View
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {groupNotesByDay(notes).map((group) => (
                  <NoteGroup
                    key={group.key}
                    title={group.title}
                    notes={group.notes}
                  />
                ))}
              </View>
            )}
          </View>

          {/* Loader */}
          {fetching && (
            <View>
              <ActivityIndicator size="small" />
            </View>
          )}
        </SafeAreaView>
      </View>
    </>
  );
}

function groupNotesByDay(notes: { text: string; createdAt: Date }[]) {
  const map = new Map<
    string,
    { key: string; title: string; notes: { text: string; createdAt: Date }[] }
  >();

  const toKey = (d: Date) => d.toISOString().slice(0, 10); // YYYY-MM-DD

  const isToday = (d: Date) => {
    const now = new Date();
    return toKey(now) === toKey(d);
  };

  const isYesterday = (d: Date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return toKey(yesterday) === toKey(d);
  };

  for (const note of notes) {
    const key = toKey(note.createdAt);
    if (!map.has(key)) {
      const title = isToday(note.createdAt)
        ? "Today"
        : isYesterday(note.createdAt)
        ? "Yesterday"
        : new Date(note.createdAt).toLocaleDateString();

      map.set(key, { key, title, notes: [note] });
    } else {
      map.get(key)!.notes.push(note);
    }
  }

  // Convert to array and sort descending by key (date)
  const arr = Array.from(map.values()).sort((a, b) => (a.key < b.key ? 1 : -1));

  // Ensure notes within each group are newest-first (descending)
  arr.forEach((g) => {
    g.notes.sort(
      (a, b) =>
        +new Date(b.createdAt).getTime() - +new Date(a.createdAt).getTime()
    );
  });

  return arr;
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
