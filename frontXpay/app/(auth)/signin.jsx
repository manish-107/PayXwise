import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomeButton from "../../components/customeButton.jsx";

const signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const signIn = () => {
    console.log("sign in");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      {/* Center the content */}
      <View className="items-center justify-center flex-1 p-4">
        <View className="flex flex-col justify-around w-full p-6 bg-black bg-opacity-50 rounded-3xl">
          <Text className="text-4xl font-bold text-[#CBCF00] text-center">
            Sign In
          </Text>
          <View className="mt-6">
            {/* Email Input */}
            <View className="p-1 mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Email
              </Text>
              <TextInput
                className="w-full h-10 pl-2 text-lg text-white bg-gray-900 border-2 border-gray-600 rounded-lg"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Enter your email id"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#888"
              />
            </View>

            {/* Password Input with Toggle Visibility */}
            <View className="relative mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Password
              </Text>
              <TextInput
                className="w-full h-10 pl-3 pr-12 text-lg text-white bg-gray-900 border-2 border-gray-600 rounded-lg"
                value={password}
                placeholder="Enter your password"
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                placeholderTextColor="#888"
              />
              <TouchableOpacity
                className="absolute transform -translate-y-1/2 right-2 top-1/2"
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <MaterialCommunityIcons
                  name={passwordVisible ? "eye-off" : "eye"}
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Link and Button */}
          <Text className="flex p-5 mb-4 text-xl font-light text-center text-white">
            Don't have an account?{" "}
            <Link className="font-light text-blue-600" href="/signup">
              Sign Up
            </Link>
          </Text>

          <CustomeButton onPress={signIn} text="Sign in" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signin;
