import React from "react";
import { Text, View, TextInput } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const signup = () => {
  return (
    <SafeAreaView className="h-full bg-[#000000]">
      <View className="flex-1 p-4 mt-4 ">
        <View className="flex flex-col justify-around p-6 mb-4 bg-[#00000054] rounded-3xl">
          <Text className="text-2xl font-bold text-[#fcf955]">
            Create Account
          </Text>
          <View className="mt-6">
            <View className="p-1 mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Full Name
              </Text>
              <TextInput
                className="w-full h-10 text-white bg-[#161614] rounded-lg "
                placeholder="Enter text"
                // value={""}
                // onChangeText={""}
              />
            </View>
            <View className="p-1 mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Email
              </Text>
              <TextInput
                className="w-full h-10 text-white bg-[#161614] rounded-lg "
                placeholder="Enter text"
                // value={""}
                // onChangeText={""}
              />
            </View>
            <View className="p-1 mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Phone number
              </Text>
              <TextInput
                className="w-full h-10 text-white bg-[#161614] rounded-lg "
                placeholder="Enter text"
                // value={""}
                // onChangeText={""}
              />
            </View>
            <View className="p-1 mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Password
              </Text>
              <TextInput
                className="w-full h-10 text-white bg-[#161614] rounded-lg "
                placeholder="Enter text"
                // value={""}
                // onChangeText={""}
              />
            </View>
            <View className="p-1 mb-1">
              <Text className="p-1 text-xl font-semibold text-white">
                Confirm password
              </Text>
              <TextInput
                className="w-full h-10 text-white bg-[#161614] rounded-lg "
                placeholder="Enter text"
                // value={""}
                // onChangeText={""}
              />
            </View>
            <Text className="flex p-5 mb-4 text-lg font-light text-center text-white">
              Dont have an account{" "}
              <Text className="font-light text-blue-600">Signup</Text>
            </Text>
          </View>
          <Link
            style={{ textDecorationLine: "none" }}
            className="text-xl font-bold bg-[#CBCF00] text-[#000000] rounded-3xl text-center px-8 py-3 underline"
            href="/signupnext"
          >
            {`Next ->`}
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signup;
