import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerBackTitle: "Geri",
        }}
      />

      <Stack.Screen
        name="register"
        options={{
          title: "",
          headerBackTitle: "Geri",
        }}
      />

      <Stack.Screen
        name="product-detail"
        options={{
          title: "Ürün Detayı",
        }}
      />
    </Stack>
  );
}