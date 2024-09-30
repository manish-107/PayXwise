import { View, Text, BackHandler, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Don't forget to import AsyncStorage
import BASEURL from "../Var.js";

const PayDetails = () => {
  const [transDetails, setTransDetails] = useState(null); // Initialize as null
  const { transactionId } = useLocalSearchParams();
  const route = useRouter();

  const fetchTransactionDetails = async (transId) => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        Alert.alert("Error", "Unauthorized. Token not found.");
        return;
      }
      const response = await axios.get(
        `${BASEURL}/api/v1/transaction/transactionDetails/${transactionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setTransDetails(response.data); // Assign the response data to the state
    } catch (error) {
      Alert.alert("Error", `Something went wrong`);
      route.push("(auth)/signin");
    }
  };

  useEffect(() => {
    fetchTransactionDetails(transactionId);
    const onBackPress = () => {
      router.push("(tabs)/dashboard"); // Navigate to Dashboard
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [router, transactionId]);

  if (!transDetails) {
    // Render a loading state while transaction details are being fetched
    return (
      <SafeAreaView className="items-center justify-center flex-1">
        <Text>Paying please wait...</Text>
      </SafeAreaView>
    );
  }

  // Destructure the data
  const { amount, description, fromUser, toUser, status, transDate } =
    transDetails;

  return (
    <SafeAreaView className="justify-around flex-1 p-4 bg-gray-100">
      {/* Header Section */}
      <View className="items-center mb-4">
        <Ionicons
          name={status === "success" ? "checkmark-circle" : "alert-circle"}
          size={60}
          color={status === "success" ? "green" : "red"}
        />
        <Text className="mt-2 text-2xl font-bold text-green-600">
          {status === "success" ? "Payment Successful" : "Payment Failed"}
        </Text>
        <Text className="mt-1 text-gray-500 text-md">
          {new Date(transDate).toLocaleString()}
        </Text>
        <View className="p-2 mb-4">
          <View className="items-center">
            <Text className="text-4xl font-bold text-gray-900">₹ {amount}</Text>
            <Text className="mt-2 text-gray-500 text-md">
              Paid to {toUser.fullName}
            </Text>
            <Text className="text-gray-600 text-md">{toUser.email}</Text>
          </View>
        </View>
      </View>

      {/* Card Design with Border, Shadow, and Header */}
      <View className="flex-col mb-4 bg-white border rounded-lg shadow-sm border-slate-200">
        {/* Card Header */}
        <View className="px-2 pt-2 pb-1 mx-3 border-b border-slate-200">
          <Text className="text-lg font-semibold text-slate-800">
            {fromUser.accounts[0].bankName}
          </Text>
        </View>

        {/* Bank Info */}
        <View className="p-3">
          <View className="mb-2">
            <Text className="text-lg text-gray-500">UPI Transaction ID</Text>
            <Text className="font-semibold text-gray-900 text-md">
              {transactionId}
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-lg text-gray-500">From</Text>
            <Text className="text-lg font-semibold text-gray-900">
              {fromUser.fullName} ({fromUser.email})
            </Text>
          </View>

          <View className="mb-2">
            <Text className="text-lg text-gray-500">To</Text>
            <Text className="text-lg font-semibold text-gray-900">
              {toUser.fullName} ({toUser.email})
            </Text>
          </View>

          <View>
            <Text className="text-lg text-gray-500">Bank</Text>
            <Text className="text-lg font-semibold text-gray-900">
              {toUser.accounts[0].bankName}
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View className="px-2 pt-2 pb-2 mx-3 border-t border-slate-200">
        <Text className="text-sm text-center text-gray-500">
          Powered by PayXwise
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default PayDetails;
