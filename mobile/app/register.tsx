import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://192.168.1.120:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Başarılı", "Kayıt oluşturuldu");
        router.push("/login");
      } else {
        Alert.alert("Hata", data.message || "Kayıt başarısız");
      }
    } catch {
      Alert.alert("Hata", "API bağlantısı kurulamadı");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBox}>
        <Text style={styles.logo}>TRENDIVA</Text>
        <Text style={styles.slogan}>Yeni üyeliğini oluştur</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Kayıt Ol</Text>
        <Text style={styles.description}>
          Trendiva dünyasına katıl, ürünleri keşfet ve sepetini yönet.
        </Text>

        <TextInput
          placeholder="Ad"
          placeholderTextColor="#777"
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />

        <TextInput
          placeholder="Soyad"
          placeholderTextColor="#777"
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Şifre"
          placeholderTextColor="#777"
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.linkText}>Zaten hesabın var mı? Giriş Yap</Text>
        </TouchableOpacity>
      </View>
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
    marginBottom: 24,
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
    marginBottom: 20,
    lineHeight: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#f0c7d3",
    backgroundColor: "#fff9fb",
    padding: 14,
    borderRadius: 14,
    marginBottom: 13,
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
});