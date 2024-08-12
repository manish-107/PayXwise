import { ScrollView, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const index = () => {
  return (
    <>
      <SafeAreaView className="h-full bg-[#f7f7f7]">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="justify-between flex-1 p-6 mt-8">
            <View>
              <Text className="pb-3 text-4xl font-extrabold text-white">
                Pay<Text className="text-[#00C2C7]">X</Text>wise
              </Text>
            </View>
            <View className="flex flex-col justify-around p-5 mt-10 bg-[#161614] rounded-3xl">
              <Text className="text-3xl font-medium pt-3 leading-relaxed text-[#b3b3b3]">
                Simplify{" "}
                <Text className="text-[#F1F469] font-bold">transaction </Text>{" "}
                and
                <Text className="text-[#F1F469] font-bold"> expense</Text>{" "}
                management
              </Text>
              <Text className="py-6 text-lg text-[#CBCBC7] ">
                Here's a styled version of your component with the desired
                changes
              </Text>
              <Link
                style={{ textDecorationLine: "none" }}
                className="text-xl font-bold bg-[#CBCF00] text-[#000000] rounded-3xl text-center px-8 py-3 underline"
                href="/signup"
              >
                GetStarted
              </Link>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default index;
