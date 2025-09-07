import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useState, useRef, useEffect, useMemo } from "react";
import { z } from "zod";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Stack, useRouter } from "expo-router";
import { AuthService } from "@/lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const opacity = useSharedValue(1);
  const animationRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    opacity.value = withTiming(loading ? 0.5 : 1, { duration: 200 });
  }, [loading]);

  const router = useRouter();

  const handleSignIn = async () => {
    if (!isFormValid) return;
    setLoading(true);
    try {
      await AuthService.signInWithEmail(email, password);
      // success — navigate to /home
      router.replace("/home");
    } catch (err) {
      console.error("Sign in failed", err);
    } finally {
      setLoading(false);
    }
  };

  const schema = useMemo(
    () =>
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    []
  );

  const isFormValid = useMemo(() => {
    const result = schema.safeParse({ email, password });
    return result.success;
  }, [email, password, schema]);

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.centeredContent,
              useAnimatedStyle(() => ({ opacity: opacity.value })),
            ]}
          >
            <Text style={styles.title}>Let’s get started</Text>
            <View style={styles.inputCard}>
              <TextInput
                style={styles.input}
                placeholder="you@example.com"
                placeholderTextColor="#aaa"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                editable={!loading}
              />
              <View style={styles.divider} />
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                textContentType="password"
                editable={!loading}
              />
            </View>
            <TouchableOpacity
              style={[
                styles.cta,
                (!isFormValid || loading) && { opacity: 0.5 },
              ]}
              onPress={handleSignIn}
              activeOpacity={0.8}
              disabled={loading || !isFormValid}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.ctaText}>Sign in</Text>
              )}
            </TouchableOpacity>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
  },
  centeredContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    gap: 16,
  },
  title: {
    fontFamily: "Geist_600SemiBold",
    fontSize: 24,
    color: "#000",
    textAlign: "center",
    marginBottom: 8,
  },
  inputCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    width: 370,
    maxWidth: "100%",
    overflow: "hidden",
    marginBottom: 8,
  },
  input: {
    fontFamily: "Geist_400Regular",
    fontSize: 17,
    color: "#000",
    paddingHorizontal: 16,
    paddingVertical: 12,
    width: 370,
    maxWidth: "100%",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 0,
  },
  cta: {
    backgroundColor: "#ff5e00",
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 8,
  },
  ctaText: {
    fontFamily: "Geist_400Regular",
    fontSize: 17,
    color: "#fff",
    letterSpacing: -0.4,
  },
});
