import React from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import indeximg from "../assets/indeximg2.png";

const Index = () => {
  // Get the screen height
  const { height } = Dimensions.get("window");

  return (
    <SafeAreaView className="h-full bg-[#1c1d1d]">
      <View className="justify-around flex-1 p-4 mt-4">
        <View>
          <Image
            source={indeximg}
            style={{
              width: "100%",
              height: height * 0.5, // Adjust the height to 30% of screen height

              marginHorizontal: 10, // Add horizontal margin (left and right)
              padding: 0,
            }}
            resizeMode="contain" // Ensure the image maintains its aspect ratio
          />
        </View>
        <View className="flex flex-col justify-around p-6 mb-4 bg-[#161614] rounded-3xl">
          <Text className="text-4xl font-extrabold text-white ">
            Pay<Text className="text-[#00C2C7]">X</Text>wise
          </Text>
          <Text className="text-3xl font-medium pt-3 leading-relaxed text-[#b3b3b3]">
            Simplify{" "}
            <Text className="text-[#F1F469] font-bold">transaction </Text>
            and
            <Text className="text-[#F1F469] font-bold"> expense</Text>{" "}
            management
          </Text>
          <Text className="py-6 text-lg text-[#CBCBC7]">
            Here's a styled version of your component with the desired changes
          </Text>
          <Link
            style={{ textDecorationLine: "none" }}
            className="text-xl font-bold bg-[#CBCF00] text-[#000000] rounded-3xl text-center px-8 py-3 underline"
            href="/dashboard"
          >
            GetStarted
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
