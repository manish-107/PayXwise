import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomeButton from "../../components/customeButton";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, SetPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [validateMsg, setValidateMsg] = React.useState({
    fullName: {
      title: "Enter the email",
      color: "#6B7280",
    },
    email: {
      title: "Enter the email",
      color: "#6B7280",
    },
    phoneNumber: {
      title: "Enter the phone number",
      color: "#6B7280",
    },
    password: {
      title: "Enter the password",
      color: "#6B7280",
    },
    confirmPass: {
      title: "Enter the password again",
      color: "#6B7280",
    },
  });

  const onclicklink = () => {
    console.log(fullName, email, phoneNumber, password, confirmPass);
  };

  // Define the conditional border color

  // Define the style object with dynamic border color

  return (
    <SafeAreaView className="h-full bg-black">
      <View className="flex-1 p-4 mt-4">
        <View className="flex flex-col justify-around p-6 mb-4 bg-black bg-opacity-50 rounded-3xl">
          <Text className="text-2xl font-bold text-[#CBCF00]">
            Create Account
          </Text>
          <View className="mt-6">
            {/* Full Name Input */}
            <View className="p-1 mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Full Name
              </Text>
              <TextInput
                className="w-full h-10 pl-2 text-lg text-white bg-gray-900 rounded-lg"
                style={{ borderColor: validateMsg.fullName.color }}
                placeholder={`${validateMsg.fullName.title}`}
                placeholderTextColor="#888"
                onChangeText={setFullName}
                value={fullName}
              />
            </View>
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
                value={email}
                onChangeText={setEmail}
                placeholder={`${validateMsg.email.title}`}
                placeholderTextColor="#888"
              />
            </View>
            {/* Phone Number Input */}
            <View className="p-1 mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Phone Number
              </Text>
              <TextInput
                className="w-full h-10 pl-2 text-lg text-white bg-gray-900 border-2 border-gray-600 rounded-lg"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder={`${validateMsg.phoneNumber.title}`}
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
                placeholder={`${validateMsg.password.title}`}
                value={password}
                onChangeText={SetPassword}
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
            {/* Confirm Password Input with Toggle Visibility */}
            <View className="relative mb-1">
              <Text className="p-1 text-xl font-semibold text-white">
                Confirm Password
              </Text>
              <TextInput
                className="w-full h-10 pl-3 pr-12 text-lg text-white bg-gray-900 border-2 border-gray-600 rounded-lg"
                placeholder={`${validateMsg.confirmPass.title}`}
                secureTextEntry={!passwordVisible}
                value={confirmPass}
                onChangeText={setConfirmPass}
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
            <Text className="flex p-5 mb-4 text-lg font-light text-center text-white">
              Don’t have an account{" "}
              <Text className="font-light text-blue-600">Signup</Text>
            </Text>
          </View>

          <CustomeButton onPress={onclicklink} text="Next ->" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
