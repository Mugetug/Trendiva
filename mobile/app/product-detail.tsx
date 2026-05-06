import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ProductDetailScreen() {
  const { id, name, description, price, stock, image, images } = useLocalSearchParams();

  const imageList =
    typeof images === "string"
      ? JSON.parse(images)
      : [image];

  const addToCart = async () => {
  try {
    const response = await fetch("http://192.168.1.120:5000/api/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "demo-user",
        productId: id,
        quantity: 1,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      Alert.alert("Başarılı", `${name} sepete eklendi`);
      console.log("Sepete eklendi:", data);
    } else {
      console.log("Sepete ekleme API hatası:", data);
      Alert.alert("Hata", data.message || "Ürün sepete eklenemedi");
    }
  } catch (error) {
    console.log("Sepete ekleme bağlantı hatası:", error);
    Alert.alert("Hata", "API bağlantısı kurulamadı");
  }
};

  return (
    <View style={styles.container}>
      <FlatList
        data={imageList}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item as string }} style={styles.image} />
        )}
      />

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{price} ₺</Text>
      <Text style={styles.stock}>Stok: {stock}</Text>

      <TouchableOpacity style={styles.button} onPress={addToCart}>
        <Text style={styles.buttonText}>Sepete Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  image: {
    width: 350,
    height: 320,
    borderRadius: 16,
    marginTop: 40,
    marginBottom: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  stock: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#111",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
});