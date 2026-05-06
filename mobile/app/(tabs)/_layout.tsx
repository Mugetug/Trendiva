import { Tabs } from "expo-router";
import React from "react";
import { Text } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Anasayfa",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>⌂</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: "Sepetim",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>🛒</Text>
          ),
        }}
      />

      <Tabs.Screen
        name="account"
        options={{
          title: "Hesabım",
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 22 }}>👤</Text>
          ),
        }}
      />
    </Tabs>
  );
}