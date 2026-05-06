import React, { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useFocusEffect } from "expo-router";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://192.168.1.120:5000";
  const USER_ID = "demo-user";

  useFocusEffect(
    useCallback(() => {
      fetchCart();
    }, [])
  );

  const fetchCart = async () => {
    try {
      setLoading(true);

      const cartRes = await fetch(`${BASE_URL}/api/cart/${USER_ID}`);
      const cartData = await cartRes.json();

      const productRes = await fetch(`${BASE_URL}/api/products`);
      const productData = await productRes.json();

      console.log("Sepet verisi:", cartData);

      setCartItems(cartData);
      setProducts(productData);
    } catch (error) {
      console.log("Sepet yükleme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProduct = (productId: string) => {
    return products.find((product: any) => product._id === productId);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total: number, item: any) => {
      const product: any = getProduct(item.productId);
      if (!product) return total;
      return total + product.price * item.quantity;
    }, 0);
  };

  const handleRemove = async (cartItemId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/cart/item/${cartItemId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Alert.alert("Başarılı", "Ürün sepetten kaldırıldı");
        fetchCart();
      } else {
        Alert.alert("Hata", "Silme işlemi başarısız");
      }
    } catch {
      Alert.alert("Hata", "API bağlantısı kurulamadı");
    }
  };

  const createOrder = async () => {
    if (cartItems.length === 0) {
      Alert.alert("Uyarı", "Sepetiniz boş");
      return;
    }

    try {
      const firstCartItem: any = cartItems[0];

      const response = await fetch(`${BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: USER_ID,
          cartId: firstCartItem._id,
          paymentMethod: "Kapıda Ödeme",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Başarılı", "Sipariş başarıyla oluşturuldu");
        console.log("Sipariş oluşturuldu:", data);
      } else {
        Alert.alert("Hata", data.message || "Sipariş oluşturulamadı");
      }
    } catch (error) {
      console.log("Sipariş oluşturma hatası:", error);
      Alert.alert("Hata", "API bağlantısı kurulamadı");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Sepet yükleniyor...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sepetim</Text>

      {cartItems.length === 0 ? (
        <Text>Sepetiniz boş.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item: any) => item._id}
            renderItem={({ item }: any) => {
              const product: any = getProduct(item.productId);

              return (
                <View style={styles.card}>
                  <Text style={styles.name}>
                    {product ? product.name : "Ürün bulunamadı"}
                  </Text>
                  <Text>Adet: {item.quantity}</Text>
                  <Text style={styles.price}>
                    {product ? `${product.price} ₺` : ""}
                  </Text>

                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemove(item._id)}
                  >
                    <Text style={styles.removeButtonText}>Sepetten Kaldır</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          />

          <View style={styles.summary}>
            <Text style={styles.totalText}>Toplam: {calculateTotal()} ₺</Text>

            <TouchableOpacity style={styles.orderButton} onPress={createOrder}>
              <Text style={styles.orderButtonText}>Sipariş Oluştur</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  removeButton: {
    backgroundColor: "#ff4fa3",
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
  },
  removeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  summary: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  orderButton: {
    backgroundColor: "#d98ca3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  orderButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});