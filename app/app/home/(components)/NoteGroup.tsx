import { View, Text } from "react-native";

type Props = {
  title: string;
  notes: {
    text: string;
    createdAt: Date;
  }[];
};

export default function NoteGroup({ title, notes }: Props) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "stretch",
        justifyContent: "flex-start",
      }}
    >
      {/* Header */}
      <Text
        style={{
          fontFamily: "Geist_600SemiBold",
          fontSize: 16,
          paddingHorizontal: 6,
        }}
      >
        {title}
      </Text>

      {/* Notes */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 0,
          alignItems: "stretch",
          justifyContent: "flex-start",
          borderRadius: 16,
          backgroundColor: "#fff",
          overflow: "hidden",
        }}
      >
        {notes.map((note, index) => (
          <View
            key={index}
            style={{
              borderTopWidth: index === 0 ? 0 : 1,
              borderTopColor: "#eee",
            }}
          >
            <NoteItem text={note.text} createdAt={note.createdAt} />
          </View>
        ))}
      </View>
    </View>
  );
}

function NoteItem({ text, createdAt }: { text: string; createdAt: Date }) {
  // Format time to hh:mm AM/PM
  const hours = createdAt.getHours();
  const minutes = createdAt.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timeString = `${formattedHours}:${formattedMinutes} ${ampm}`;

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        alignItems: "stretch",
        justifyContent: "flex-start",
        paddingHorizontal: 12,
        paddingVertical: 10,
      }}
    >
      <Text
        style={{
          fontFamily: "Geist_400Regular",
          fontSize: 16,
          textAlign: "left",
        }}
      >
        {text}
      </Text>
      <Text
        style={{ fontFamily: "Geist_400Regular", fontSize: 12, color: "#aaa" }}
      >
        {timeString}
      </Text>
    </View>
  );
}
