import { Stack, Tabs } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

const detailLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="account"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#000000", // Background color of the header
          },
          headerTintColor: "#fcf955", // Color of the header text and icons
          headerTitleStyle: {
            fontWeight: "bold", // Style the header title text
            fontSize: 24,
          },
          headerTitle: "", // Custom header title
        }}
      />
      <Stack.Screen name="expanse" options={{ headerShown: false }} />
      <Stack.Screen
        name="payPage"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#000000", // Background color of the header
          },
          headerTintColor: "#fcf955", // Color of the header text and icons
          headerTitleStyle: {
            fontWeight: "bold", // Style the header title text
            fontSize: 24,
          },
          headerTitle: "Previous", // Custom header title
        }}
      />
      <Stack.Screen
        name="transferMoney"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#000000", // Background color of the header
          },
          headerTintColor: "#fcf955", // Color of the header text and icons
          headerTitleStyle: {
            fontWeight: "bold", // Style the header title text
            fontSize: 24,
          },

          headerTitle: "transferMoney", // Custom header title
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ color: "#fcf955", fontSize: 24 }}>←</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("SomeScreen")}>
              <Text style={{ color: "#fcf955", fontSize: 24 }}>X</Text>
            </TouchableOpacity>
          ),
          headerTitleAlign: "center", // Center the title
        }}
      />
    </Stack>
  );
};

export default detailLayout;
