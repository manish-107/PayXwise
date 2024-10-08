import { Stack, Tabs } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useNavigation } from "expo-router";

const detailLayout = () => {
  const navigation = useNavigation();
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
      <Stack.Screen name="QRCode" options={{ headerShown: true }} />
    </Stack>
  );
};

export default detailLayout;
