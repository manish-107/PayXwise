import { ScrollView, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <>
      <SafeAreaView className="h-full bg-[#161616]">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="p-10 mt-10">
            <View className="flex w-full">
              <Text className="pb-3 text-4xl font-extrabold text-white">
                Pay<Text className="text-[#00C2C7]">X</Text>wise
              </Text>
            </View>
            <Text className="text-2xl font-medium leading-relaxed text-[#b3b3b3]">
              Simplify{" "}
              <Text className="text-[#55e3e0] font-bold">transactions</Text> and
              {"\n"}
              <Text className="text-[#55e3e0] font-bold">expense</Text>{" "}
              management
            </Text>
            <View className="flex flex-row justify-around gap">
              <Link
                className="mt-10 text-lg font-semibold text-[#00C2C7] bg-white px-5 py-4  underline"
                href="/signup"
              >
                Sign up
              </Link>
              <Link
                className="mt-10 text-lg font-semibold text-[#00C2C7] bg-white px-5 py-4 underline"
                href="/signup"
              >
                Sign up
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default index;
