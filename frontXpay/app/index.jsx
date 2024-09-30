import React, { useEffect, useState } from "react";
import { Text, View, Image, Dimensions } from "react-native";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import indeximg from "../assets/indeximg2.png";

const Index = () => {
  // Get the screen height
  const { height } = Dimensions.get("window");
  const router = useRouter(); // For programmatic navigation
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        if (token) {
          // Redirect to the dashboard if token exists
          router.replace("/dashboard");
        }
        setLoading(false); // Set loading to false after checking token
      } catch (error) {
        router.push("(auth)/signin");
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) {
    // Optionally render a loading screen while checking for token
    return (
      <SafeAreaView className="h-full bg-[#1c1d1d] flex justify-center items-center">
        <Text className="text-white">Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="h-full bg-[#1c1d1d]">
      <View className="justify-around flex-1 p-4 mt-4">
        <View>
          <Image
            source={indeximg}
            style={{
              width: "100%",
              height: height * 0.5, // Adjust the height to 50% of screen height
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
            href="/signin"
          >
            Get Started
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;
