import { View, Text, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const PayDetails = () => {
  // const navigation = useNavigation();
  // Handle hardware back button to navigate to the dashboard
  useEffect(() => {
    const onBackPress = () => {
      router.push("(tabs)/dashboard"); // Navigate to Dashboard
      return true; // Prevent default back action
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [router]);

  return (
    <SafeAreaView className="justify-between flex-1 p-6 bg-gray-100">
      {/* Header Section */}
      <View>
        <View className="items-center mb-6">
          <Ionicons name="checkmark-circle" size={64} color="green" />
          <Text className="mt-4 text-xl font-bold text-green-600">
            Payment Successful
          </Text>
          <Text className="mt-1 text-gray-500">7 Sept 2024, 6:04 PM</Text>
        </View>

        {/* Transaction Summary */}
        <View className="p-4 mb-4 rounded-lg">
          <View className="items-center">
            <Text className="mt-2 text-4xl font-bold">₹ 260</Text>
            <Text className="mt-2 text-gray-500">Paid to Manish</Text>
            <Text className="text-gray-600">+91 8765654587</Text>
          </View>
        </View>
      </View>

      {/* Bank Info */}
      <View className="p-4 mb-4 bg-white rounded-lg">
        <View className="mb-4">
          <Text className="text-lg font-bold">Transaction Details</Text>
        </View>
        <View className="flex-col justify-between mb-2">
          <Text className="text-gray-500">UPI Transaction ID</Text>
          <Text className="font-semibold">8787876576523</Text>
        </View>
        <View className="flex-col justify-between mb-2">
          <Text className="text-gray-500">From</Text>
          <Text className="font-semibold">Manish (manish@gmail.com)</Text>
        </View>
        <View className="flex-col justify-between mb-2">
          <Text className="text-gray-500">To</Text>
          <Text className="font-semibold">Anish (anish@gmail.com)</Text>
        </View>
        <View className="flex-col justify-between">
          <Text className="text-gray-500">Bank</Text>
          <Text className="font-semibold">Union Bank of India</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PayDetails;
