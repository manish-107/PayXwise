import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomeButton from "../../components/customeButton.jsx";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For storing JWT token
import BASEURL from "../Var.js"; // Your base URL

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const route = useRouter();

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem("jwtToken", token);
    } catch (error) {
      console.log("Error storing token", error);
    }
  };

  const signIn = async () => {
    setLoading(true); // Start loading
    try {
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      const response = await axios.post(`${BASEURL}/api/v1/users/signin`, {
        email: trimmedEmail,
        password: trimmedPassword,
      });

      const { token } = response.data;

      if (token) {
        await storeToken(token);
        route.push({ pathname: "/dashboard" });
      } else {
        Alert.alert("Sign-in Error", "Token not found.");
      }
    } catch (error) {
      Alert.alert(
        "Sign-in Error",
        error.response?.data?.message || "An error occurred during sign-in."
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const isSignInDisabled = !email.trim() || !password.trim();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View className="items-center justify-center flex-1 p-4">
        <View className="flex flex-col justify-around w-full p-6 bg-black bg-opacity-50 rounded-3xl">
          <Text className="text-4xl font-bold text-[#CBCF00] text-center">
            Sign In
          </Text>
          {loading && <ActivityIndicator size="large" color="#CBCF00" />}
          <View className="mt-6">
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

          <Text className="flex p-5 mb-4 text-xl font-light text-center text-white">
            Don't have an account?{" "}
            <Link className="font-light text-blue-600" href="/signup">
              Sign Up
            </Link>
          </Text>

          <CustomeButton
            onPress={signIn}
            text="Sign in"
            disabled={loading || isSignInDisabled}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
