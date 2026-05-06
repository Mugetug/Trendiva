import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function AccountScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <Text style={styles.logo}>TRENDIVA</Text>
        <Text style={styles.subtitle}>
          Modayı keşfet, tarzını oluştur
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Hesabım</Text>

        <Text style={styles.description}>
          Siparişlerini görüntülemek, favorilerini kaydetmek ve alışverişe devam etmek için giriş yap.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/login")}
        >
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push("/register")}
        >
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footerText}>
        Trendiva ile güvenli alışveriş deneyimi
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f8",
    padding: 20,
    justifyContent: "center",
  },

  topArea: {
    alignItems: "center",
    marginBottom: 35,
  },

  logo: {
    fontSize: 46,
    fontWeight: "bold",
    color: "#d98ca3",
    letterSpacing: 2,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 18,
    color: "#777",
  },

  card: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#111",
  },

  description: {
    fontSize: 18,
    color: "#666",
    lineHeight: 28,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#d98ca3",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 15,
  },

  registerButton: {
    backgroundColor: "#e9b7c5",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },

  footerText: {
    textAlign: "center",
    marginTop: 35,
    color: "#888",
    fontSize: 16,
  },
});