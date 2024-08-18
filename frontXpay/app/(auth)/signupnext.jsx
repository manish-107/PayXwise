import { useLocalSearchParams } from "expo-router";
import React from "react";
import { SafeAreaView, Text, View, TextInput } from "react-native";
import CustomeButton from "../../components/customeButton";

const SignupNext = () => {
  // Accessing passed parameters using useLocalSearchParams
  const { fullName, email, phoneNumber, password } = useLocalSearchParams();
  console.log(fullName, email, phoneNumber, password);
  return (
    <SafeAreaView className="h-full bg-[#000000]">
      <View className="flex-1 p-4 mt-4 ">
        <View className="flex flex-col justify-around p-6 mb-4 bg-[#00000054] rounded-3xl">
          <View className="mt-6">
            {/* Input for Date of Birth */}
            <View className="p-1 mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Date of Birth
              </Text>
              <TextInput
                className="w-full h-10 text-white bg-[#161614] rounded-lg"
                placeholder="Enter your date of birth"
                placeholderTextColor="#888"
              />
            </View>

            {/* Input for Gender */}
            <View className="p-1 mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Gender
              </Text>
              <TextInput
                className="w-full h-10 text-white bg-[#161614] rounded-lg"
                placeholder="Enter your gender"
                placeholderTextColor="#888"
              />
            </View>

            {/* Input for Security Questions */}
            <View className="p-1 mb-3">
              <Text className="p-1 text-xl font-semibold text-white">
                Security Questions
              </Text>
              <TextInput
                className="w-full h-10 mb-2 text-white bg-[#161614] rounded-lg"
                placeholder="Enter your security question"
                placeholderTextColor="#888"
              />
              <TextInput
                className="w-full h-10 text-white bg-[#161614] rounded-lg"
                placeholder="Enter your security answer"
                placeholderTextColor="#888"
              />
            </View>

            <Text className="flex p-5 mb-4 text-lg font-light text-center text-white">
              Terms and conditions
            </Text>
          </View>

          <CustomeButton
            onPress={() => console.log("Create account pressed")}
            text="Create account"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupNext;
