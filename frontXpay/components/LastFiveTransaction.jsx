import React from "react";
import { View, Text, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";

const LastFiveTransaction = () => {
  return (
    <View className="bg-[#D5EB4D] h-fit m-5 rounded-lg">
      <Text className="pt-3 pl-6 text-xl font-bold text-black">
        Last 5 transaction
      </Text>
      <View className="flex flex-col justify-between p-3">
        <View className="p-5 mb-5 ml-5 mr-5 text-white bg-black rounded-2xl ">
          <Text className="text-xl font-semibold text-white">Amount</Text>

          <View className="flex flex-row pt-3 pr-10">
            <Text className="text-xl font-bold text-white ">$ 100000</Text>
          </View>
        </View>
        <View className="p-5 mb-5 ml-5 mr-5 text-white bg-black rounded-2xl ">
          <Text className="text-xl font-semibold text-white">Amount</Text>

          <View className="flex flex-row pt-3 pr-10">
            <Text className="text-xl font-bold text-white ">$ 100000</Text>
          </View>
        </View>
        <View className="p-5 mb-5 ml-5 mr-5 text-white bg-black rounded-2xl ">
          <Text className="text-xl font-semibold text-white">Amount</Text>

          <View className="flex flex-row pt-3 pr-10">
            <Text className="text-xl font-bold text-white ">$ 100000</Text>
          </View>
        </View>
        <View className="p-5 mb-5 ml-5 mr-5 text-white bg-black rounded-2xl ">
          <Text className="text-xl font-semibold text-white">Amount</Text>

          <View className="flex flex-row pt-3 pr-10">
            <Text className="text-xl font-bold text-white ">$ 100000</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LastFiveTransaction;
