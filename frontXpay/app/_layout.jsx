import React from "react";
import { Stack } from "expo-router";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "expo-router";
const _layout = () => {
  const payNavigate = useNavigation();
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(details)" options={{ headerShown: false }} />
        <Stack.Screen
          name="payTo/PayDetails"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "white", // Background color of the header
            },
            headerTitleStyle: {
              fontWeight: "bold", // Style the header title text
              fontSize: 24,
            },

            headerTitle: "Payment details", // Custom header title
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => payNavigate.navigate("dashboard")}
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),

            headerTitleAlign: "center", // Center the title
          }}
        />
        <Stack.Screen name="search/[query]" options={{ headerShown: false }} />
        <Stack.Screen
          name="payTo/[toQuery]"
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: "white", // Background color of the header
            },
            headerTitleStyle: {
              fontWeight: "bold", // Style the header title text
              fontSize: 24,
            },

            headerTitle: "transferMoney", // Custom header title
            headerLeft: () => (
              <TouchableOpacity onPress={() => payNavigate.goBack()}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => payNavigate.navigate("dashboard")}
              >
                <FontAwesome name="close" size={24} color="black" />
              </TouchableOpacity>
            ),
            headerTitleAlign: "center", // Center the title
          }}
        />
      </Stack>
    </>
  );
};

export default _layout;
