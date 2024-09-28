import { View, Text, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";

const PayDetails = () => {
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
    <SafeAreaView className="justify-around flex-1 p-4 bg-gray-100">
      {/* Header Section */}
      <View className="items-center mb-4">
        <Ionicons name="checkmark-circle" size={60} color="green" />
        <Text className="mt-2 text-2xl font-bold text-green-600">
          Payment Successful
        </Text>
        <Text className="mt-1 text-gray-500 text-md">7 Sept 2024, 6:04 PM</Text>
        <View className="p-2 mb-4">
          <View className="items-center">
            <Text className="text-4xl font-bold text-gray-900">₹ 260</Text>
            <Text className="mt-2 text-gray-500 text-md">Paid to Manish</Text>
            <Text className="text-gray-600 text-md">+91 8765654587</Text>
          </View>
        </View>
      </View>

      {/* Card Design with Border, Shadow, and Header */}
      <View className="flex-col mb-4 bg-white border rounded-lg shadow-sm border-slate-200">
        {/* Card Header */}
        <View className="px-2 pt-2 pb-1 mx-3 border-b border-slate-200">
          <Text className="text-lg font-semibold text-slate-800">
            Children Bank of Joseph
          </Text>
        </View>

        {/* Bank Info */}
        <View className="p-3">
          <View className="mb-2">
            <Text className="text-lg text-gray-500">UPI Transaction ID</Text>
            <Text className="font-semibold text-gray-900 text-md">
              8787876576523
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-lg text-gray-500">From</Text>
            <Text className="text-lg font-semibold text-gray-900">
              Manish (manish@gmail.com)
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-lg text-gray-500">To</Text>
            <Text className="text-lg font-semibold text-gray-900">
              Anish (anish@gmail.com)
            </Text>
          </View>

          <View>
            <Text className="text-lg text-gray-500">Bank</Text>
            <Text className="text-lg font-semibold text-gray-900">
              Union Bank of India
            </Text>
          </View>
        </View>

        {/* Card Footer */}
      </View>
      <View className="px-2 pt-2 pb-2 mx-3 border-t border-slate-200">
        <Text className="text-sm text-center text-gray-500">
          Powered by PayXwise
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PayDetails;
