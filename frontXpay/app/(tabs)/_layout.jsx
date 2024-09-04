import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";

const TabIcon = ({ icon, color, name }) => {
  return (
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        resizeMode="contain"
        style={[styles.iconImage, { tintColor: color }]}
      />
      <Text style={[styles.iconText, { color }]}>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: "#D5EB4D",
        tabBarInactiveTintColor: "white",
      }}
    >
      <Tabs.Screen
        name="dashboard"
        options={{
          title: "Dashboard",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Scan"
        options={{
          title: "Scan",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="qr-code-scanner" size={36} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="expanse"
        options={{
          title: "Expanse",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Foundation name="graph-bar" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "black",
    paddingTop: 10,
    height: 70, // Optional: Adjust height if needed
  },
  iconContainer: {
    alignItems: "center",
  },
  iconImage: {
    width: 24,
    height: 24,
  },
  iconText: {
    fontSize: 12,
  },
});

export default TabsLayout;
