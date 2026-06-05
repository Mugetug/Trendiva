import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "http://192.168.1.120:5000/api/products";

  const categories = ["Yeni Sezon", "Ceket", "Elbise", "Gömlek", "İndirim"];

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
  try {

    const response = await fetch(API_URL);

    const data = await response.json();

    setProducts(data);
  } catch (error) {
    console.log("API Hatası:", error);
  } finally {
    setLoading(false);
  }
};

  const handleDetail = (product: any) => {
    router.push({
      pathname: "/product-detail",
      params: {
        id: product._id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        image: product.image,
        images: JSON.stringify(product.images),
      },
    });
  };

  const handleAddToCart = async (product: any) => {
    try {
      const response = await fetch("http://192.168.1.120:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: "demo-user",
          productId: product._id,
          quantity: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Başarılı", `${product.name} sepete eklendi`);
        console.log("Ana sayfadan sepete eklendi:", data);
      } else {
        console.log("Ana sayfa sepete ekleme API hatası:", data);
        Alert.alert("Hata", data.message || "Sepete eklenemedi");
      }
    } catch (error) {
      console.log("Ana sayfa sepete ekleme bağlantı hatası:", error);
      Alert.alert("Hata", "API bağlantısı kurulamadı");
    }
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <View>
          <Text style={styles.brand}>TRENDIVA</Text>
          <Text style={styles.subtitle}>Yeni sezon ürünleri keşfet</Text>
        </View>
        <Text style={styles.heart}>♡</Text>
      </View>

      <View style={styles.banner}>
        <Text style={styles.bannerSmall}>Summer Collection</Text>
        <Text style={styles.bannerTitle}>Yeni Sezonda Şık Parçalar</Text>
        <Text style={styles.bannerText}>Seçili ürünlerde özel fırsatlar</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
      >
        {categories.map((category, index) => (
          <View
            key={index}
            style={[
              styles.categoryPill,
              index === 0 && styles.categoryPillActive,
            ]}
          >
            <Text
              style={[
                styles.categoryText,
                index === 0 && styles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Popüler Ürünler</Text>
        <Text style={styles.sectionLink}>Tümünü Gör</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Ürünler yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item: any) => item._id}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <View style={styles.imageWrapper}>
              <Image source={{ uri: item.image }} style={styles.productImage} />

              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>Yeni</Text>
              </View>

              <View style={styles.favoriteBadge}>
                <Text style={styles.favoriteText}>♡</Text>
              </View>
            </View>

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>

            <View style={styles.priceRow}>
              <Text style={styles.price}>{item.price} ₺</Text>
              <Text style={styles.stock}>Stok: {item.stock}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() => handleDetail(item)}
              >
                <Text style={styles.detailButtonText}>Detay Gör</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cartButton}
                onPress={() => handleAddToCart(item)}
              >
                <Text style={styles.cartButtonText}>Sepete Ekle</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f3f3",
  },

  listContent: {
    padding: 20,
    paddingBottom: 30,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    marginTop: 40,
    marginBottom: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: {
    fontSize: 30,
    fontWeight: "900",
    letterSpacing: 1.5,
    color: "#ff4fa3",
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },

  heart: {
    fontSize: 30,
    color: "#ff4fa3",
  },

  banner: {
    backgroundColor: "#ff4fa3",
    borderRadius: 22,
    padding: 22,
    marginBottom: 18,
  },

  bannerSmall: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },

  bannerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },

  bannerText: {
    color: "#ddd",
    fontSize: 14,
  },

  categoryScroll: {
    marginBottom: 18,
  },

  categoryPill: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },

  categoryPillActive: {
    backgroundColor: "#ff4fa3",
  },

  categoryText: {
    color: "#555",
    fontWeight: "600",
  },

  categoryTextActive: {
    color: "white",
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ff4fa3",
  },

  sectionLink: {
    color: "#777",
    fontWeight: "600",
  },

  card: {
  backgroundColor: "white",
  padding: 15,
  borderRadius: 18,
  marginBottom: 18,

  shadowColor: "#000",
  shadowOpacity: 0.12,
  shadowRadius: 12,
  shadowOffset: {
    width: 0,
    height: 4,
  },

  elevation: 5,
},

  imageWrapper: {
    position: "relative",
  },

  productImage: {
    width: "100%",
    height: 260,
    borderRadius: 18,
    marginBottom: 14,
  },

  discountBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "#111",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 16,
  },

  discountText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },

  favoriteBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    backgroundColor: "white",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  favoriteText: {
    fontSize: 22,
    color: "#111",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#111",
  },

  description: {
    color: "#666",
    fontSize: 14,
    lineHeight: 20,
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
    alignItems: "center",
  },

  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },

  stock: {
    color: "#4CAF50",
    fontSize: 15,
    fontWeight: "600",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 14,
  },

  detailButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginRight: 6,
    alignItems: "center",
  },

  cartButton: {
    backgroundColor: "#d98ca3",
    padding: 12,
    borderRadius: 12,
    flex: 1,
    marginLeft: 6,
    alignItems: "center",
  },

  detailButtonText: {
    color: "#111",
    fontWeight: "bold",
  },

  cartButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});