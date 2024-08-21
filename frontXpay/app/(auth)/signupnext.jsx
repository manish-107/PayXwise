import { useLocalSearchParams } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import DateTimePicker from "react-native-ui-datepicker";
import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import dayjs from "dayjs";
import CustomeButton from "../../components/customeButton";

const SignupNext = () => {
  const [date, setDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  console.log(date.format("DD-MM-YYYY"));
  // Accessing passed parameters using useLocalSearchParams
  const { fullName, email, phoneNumber, password } = useLocalSearchParams();
  // console.log(fullName, email, phoneNumber, password);
  return (
    <SafeAreaView className="h-full bg-[#000000]">
      <View className="flex-1 p-4 mt-4 ">
        <View className="flex flex-col justify-around p-6 mb-4 bg-[#00000054] rounded-3xl">
          <View className="">
            {/* Input for Date of Birth */}
            <Text className="p-1 text-xl font-semibold text-white">
              Date of Birth
            </Text>

            {showDatePicker ? (
              <View style={{ backgroundColor: "white", zIndex: 50 }}>
                <DateTimePicker
                  mode="single" // Set mode to 'date' for selecting only date
                  date={date} // Convert Day.js date to JavaScript Date
                  onChange={(params) => setDate(params.date)} // Update the state with selected date
                />

                {/* Display the selected date */}
                <Text style={{ color: "#000", margin: 0, padding: 10 }}>
                  Selected Date: {date.format("DD-MM-YYYY")}
                </Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                className="inline-flex items-center px-3 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <View className="flex flex-row ">
                  <Text className="pr-3 text-xl font-semibold text-white ">
                    Date of Birth
                  </Text>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={20}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            )}

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
