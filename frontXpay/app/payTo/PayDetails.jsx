import { View, Text, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
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
    <SafeAreaView className="justify-between flex-1 p-4 bg-gray-100">
      {/* Header Section */}
      <View className="items-center mb-8">
        <Ionicons name="checkmark-circle" size={80} color="green" />
        <Text className="mt-4 text-3xl font-bold text-green-600">
          Payment Successful
        </Text>
        <Text className="mt-1 text-lg text-gray-500">7 Sept 2024, 6:04 PM</Text>
        <View className="p-4 mb-6">
          <View className="items-center">
            <Text className="text-5xl font-bold text-gray-900">₹ 260</Text>
            <Text className="mt-3 text-lg text-gray-500">Paid to Manish</Text>
            <Text className="text-lg text-gray-600">+91 8765654587</Text>
          </View>
        </View>
      </View>

      {/* Card Design with Border, Shadow, and Header */}
      <View className="relative flex-col mb-5 bg-white border rounded-lg shadow-sm border-slate-200 w-96 ">
        {/* Card Header */}
        <View className="px-1 pt-3 pb-2 mx-3 mb-0 border-b border-slate-200">
          <Text className="mb-2 text-xl font-semibold text-slate-800">
            Children Bank of Joseph
          </Text>
        </View>

        {/* Bank Info */}
        <View className="p-4">
          <View className="mb-4">
            <Text className="text-lg text-gray-500">UPI Transaction ID</Text>
            <Text className="text-lg font-semibold text-gray-900">
              8787876576523
            </Text>
          </View>

          <View className="mb-4">
            <Text className="text-lg text-gray-500">From</Text>
            <Text className="text-lg font-semibold text-gray-900">
              Manish (manish@gmail.com)
            </Text>
          </View>

          <View className="mb-4">
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
        <View className="px-1 pt-2 pb-3 mx-3 border-t border-slate-200">
          <Text className="text-base text-gray-500">Powered by PayXwise</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PayDetails;
