import React from "react";
import { View, Text, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";

const DashboardPeople = () => {
  return (
    <View className="bg-[#C2C2C2] h-fit m-5 rounded-lg">
      <Text className="pt-3 pl-6 text-xl font-bold text-black">Peoples</Text>
      <View className="flex flex-row justify-between p-3">
        <Link
          className="w-20 h-20 p-3 mt-2 text-center bg-black rounded-full"
          href="/scan"
        >
          <Pressable>
            <Entypo name="user" size={26} color="white" />
            <Text className="text-white">Scan</Text>
          </Pressable>
        </Link>
        <Link
          className="w-20 h-20 p-3 mt-2 text-center bg-black rounded-full"
          href="/scan"
        >
          <Pressable>
            <Entypo name="user" size={26} color="white" />
            <Text className="text-white">Scan</Text>
          </Pressable>
        </Link>
        <Link
          className="w-20 h-20 p-3 mt-2 text-center bg-black rounded-full"
          href="/scan"
        >
          <Pressable>
            <Entypo name="user" size={26} color="white" />
            <Text className="text-white">Scan</Text>
          </Pressable>
        </Link>
        <Link
          className="w-20 h-20 p-3 mt-2 text-center bg-black rounded-full"
          href="/scan"
        >
          <Pressable>
            <Entypo name="user" size={26} color="white" />
            <Text className="text-white">Scan</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
};

export default DashboardPeople;
