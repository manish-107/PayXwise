import React from "react";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomeButton from "../../components/customeButton";

const Signup = () => {
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [password, SetPassword] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");
  const [validateMsg, setValidateMsg] = React.useState({
    fullName: {
      title: "Enter the full name",
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
      title: "Confirm your password",
      color: "#6B7280",
    },
  });

  const validateData = () => {
    let isValid = true;

    // Check Full Name
    if (fullName.length <= 0) {
      setValidateMsg((prev) => ({
        ...prev,
        fullName: {
          title: "Please enter full name",
          color: "#aa2121",
        },
      }));
      isValid = false;
    } else {
      setValidateMsg((prev) => ({
        ...prev,
        fullName: {
          title: "Enter the full name",
          color: "#6B7280",
        },
      }));
    }

    // Check Email
    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidateMsg((prev) => ({
        ...prev,
        email: {
          title: "Please enter a valid email address",
          color: "#aa2121",
        },
      }));
      isValid = false;
    } else {
      setValidateMsg((prev) => ({
        ...prev,
        email: {
          title: "Enter the email",
          color: "#6B7280",
        },
      }));
    }

    // Check Password
    if (password.length <= 4) {
      setValidateMsg((prev) => ({
        ...prev,
        password: {
          title: "Password should be greater than 4 characters",
          color: "#aa2121",
        },
      }));
      isValid = false;
    } else {
      setValidateMsg((prev) => ({
        ...prev,
        password: {
          title: "Enter the password",
          color: "#6B7280",
        },
      }));
    }

    // Check Confirm Password
    if (confirmPass !== password) {
      setValidateMsg((prev) => ({
        ...prev,
        confirmPass: {
          title: "Passwords do not match",
          color: "#aa2121",
        },
      }));
      isValid = false;
    } else {
      setValidateMsg((prev) => ({
        ...prev,
        confirmPass: {
          title: "Confirm your password",
          color: "#6B7280",
        },
      }));
    }

    // Check Phone Number
    if (phoneNumber.length < 10 || isNaN(phoneNumber)) {
      setValidateMsg((prev) => ({
        ...prev,
        phoneNumber: {
          title: "Please enter a valid phone number (at least 10 digits)",
          color: "#aa2121",
        },
      }));
      isValid = false;
    } else {
      setValidateMsg((prev) => ({
        ...prev,
        phoneNumber: {
          title: "Enter your phone number",
          color: "#6B7280",
        },
      }));
    }

    return isValid;
  };

  const onclicklink = () => {
    if (validateData()) {
      router.push({
        pathname: "/signupnext",
        params: {
          fullName,
          email,
          phoneNumber,
          password,
        },
      });
    }
  };

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
                className="w-full h-10 pl-2 text-lg text-white bg-gray-900 border-2 rounded-lg"
                style={{ borderColor: validateMsg.fullName.color }}
                placeholder={validateMsg.fullName.title}
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
                style={{ borderColor: validateMsg.email.color }}
                value={email}
                onChangeText={setEmail}
                placeholder={validateMsg.email.title}
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
                placeholder={validateMsg.phoneNumber.title}
                placeholderTextColor="#888"
                style={{ borderColor: validateMsg.phoneNumber.color }}
              />
            </View>
            {/* Password Input with Toggle Visibility */}
            <View className="relative mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Password
              </Text>
              <TextInput
                className="w-full h-10 pl-3 pr-12 text-lg text-white bg-gray-900 border-2 border-gray-600 rounded-lg"
                placeholder={validateMsg.password.title}
                style={{ borderColor: validateMsg.password.color }}
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
                placeholder={validateMsg.confirmPass.title}
                style={{ borderColor: validateMsg.confirmPass.color }}
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
              Already have an account{" "}
              <Text className="font-light text-blue-600">Sign In</Text>
            </Text>
          </View>

          <CustomeButton onPress={onclicklink} text="Next ->" />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
