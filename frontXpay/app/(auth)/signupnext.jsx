import { Link } from "expo-router";
import React from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const signupnext = () => {
  return (
    <SafeAreaView className="h-full bg-[#000000]">
      <View className="flex-1 p-4 mt-4 ">
        <View className="flex flex-col justify-around p-6 mb-4 bg-[#00000054] rounded-3xl">
          <View className="mt-6">
            <View className="p-1 mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Date of birth
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
                Gender
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
                Security Questions
              </Text>
              <TextInput
                className="w-full h-10 text-white bg-[#161614] rounded-lg "
                placeholder="Enter text"
                // value={""}
                // onChangeText={""}
              />
              <TextInput
                className="w-full h-10 text-white bg-[#161614] rounded-lg "
                placeholder="Enter text"
                // value={""}
                // onChangeText={""}
              />
            </View>

            <Text className="flex p-5 mb-4 text-lg font-light text-center text-white">
              terms and condition
            </Text>
          </View>
          <Link
            style={{ textDecorationLine: "none" }}
            className="text-xl font-bold bg-[#CBCF00] text-[#000000] rounded-3xl text-center px-8 py-3 underline"
            href="/signupnext"
          >
            {`Create account`}
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default signupnext;
