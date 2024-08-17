import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const signup = () => {
  return (
    <SafeAreaView className="h-full bg-[#000000]">
      <View className="flex-1 p-4 mt-4 ">
        <View className="flex flex-col justify-around p-6 mb-4 bg-[#56545454] rounded-3xl">
          <Text className="text-2xl font-bold text-white">Login</Text>
          <Link
            style={{ textDecorationLine: "none" }}
            className="text-xl font-bold bg-[#CBCF00] text-[#000000] rounded-3xl text-center px-8 py-3 underline"
            href="/signup"
          >
            GetStarted
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signup;
