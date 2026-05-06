import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://192.168.1.120:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.token) {
          await AsyncStorage.setItem("token", data.token);
        }

        Alert.alert("Başarılı", "Giriş yapıldı");
        router.replace("/");
        console.log("LOGIN RESPONSE:", data);
      } else {
        Alert.alert("Hata", data.message || "Giriş başarısız");
      }
    } catch {
      Alert.alert("Hata", "API bağlantısı kurulamadı");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.logo}>TRENDIVA</Text>
        <Text style={styles.slogan}>Stilini keşfet, alışverişe başla</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Giriş Yap</Text>
        <Text style={styles.description}>
          Favori ürünlerini görmek ve sepetini yönetmek için giriş yap.
        </Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#999"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Şifre"
          placeholderTextColor="#999"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.linkText}>Hesabın yok mu? Kayıt Ol</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>Trendiva ile güvenli ve hızlı alışveriş</Text>
    </View>
  );
}

const PINK = "#d98ca3";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff4f7",
    padding: 22,
    justifyContent: "center",
  },
  topBox: {
    alignItems: "center",
    marginBottom: 28,
  },
  logo: {
    fontSize: 36,
    fontWeight: "900",
    color: PINK,
    letterSpacing: 2,
  },
  slogan: {
    marginTop: 8,
    color: "#777",
    fontSize: 15,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 22,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#111",
  },
  description: {
    color: "#777",
    fontSize: 14,
    marginBottom: 22,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0c7d3",
    backgroundColor: "#fff9fb",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
  },
  button: {
    backgroundColor: PINK,
    padding: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  linkText: {
    textAlign: "center",
    marginTop: 18,
    color: PINK,
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    marginTop: 24,
    color: "#999",
    fontSize: 13,
  },
});