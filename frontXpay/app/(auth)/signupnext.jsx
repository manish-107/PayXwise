import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TextInput,
  Alert,
} from "react-native";
import CustomeButton from "../../components/customeButton";
import axios from "axios";
import BASEURL from "../Var.js";
import LoadingScreen from "../../components/LoadingScreen"; // Import the loading screen

const genderData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const questionData = [
  { label: "What is your pet's name?", value: "1" },
  { label: "What is your favorite book?", value: "2" },
  { label: "What was the name of your first school?", value: "3" },
];

const SignupNext = () => {
  const [gender, setGender] = useState("");
  const [question, setQuestion] = useState("");
  const [isFocusGender, setIsFocusGender] = useState(false);
  const [isFocusQuestion, setIsFocusQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [bankname, setBankname] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const route = useRouter();
  const { fullName, email, phoneNumber, password } = useLocalSearchParams();

  const createAccount = () => {
    if (gender === "" || question === "" || answer === "" || bankname === "") {
      Alert.alert("Error", "Please fill all the fields.");
      return;
    }

    setLoading(true); // Start loading
    signupData();
  };

  const signupData = async () => {
    try {
      const signupRes = await axios.post(`${BASEURL}/api/v1/users/signup`, {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        password: password,
        gender: gender,
        securityQuestion: question,
        securityAnswer: answer,
        bankName: bankname,
      });

      Alert.alert("Success", "Account created successfully! Please sign in.");
      route.push({ pathname: "/signin" });
    } catch (error) {
      console.error("Error response: ", error.response);
      Alert.alert("Error", "Account creation failed. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) {
    return <LoadingScreen />; // Show loading screen while creating the account
  }

  return (
    <SafeAreaView className="h-full bg-[#000000]">
      <View className="flex-1 p-4 mt-4 ">
        <View className="flex flex-col justify-around p-6 mb-4 bg-[#00000054] rounded-3xl">
          {/* Gender Selection */}
          <View className="p-1 mb-3">
            <Text className="p-1 text-xl font-semibold text-white">Gender</Text>
            <Dropdown
              style={[
                styles.dropdown,
                isFocusGender && { borderColor: "blue" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={genderData}
              labelField="label"
              valueField="value"
              placeholder={!isFocusGender ? "Select Gender" : "..."}
              value={gender}
              onFocus={() => setIsFocusGender(true)}
              onBlur={() => setIsFocusGender(false)}
              onChange={(item) => {
                setGender(item.value);
                setIsFocusGender(false);
              }}
              renderItem={(item) => (
                <View style={styles.item}>
                  <Text style={styles}>{item.label}</Text>
                </View>
              )}
            />
          </View>
          <View className="p-1 mb-3">
            <Text className="p-1 text-xl font-semibold text-white">
              Bank name
            </Text>
            <TextInput
              className="w-full h-10 pl-2 text-lg text-white bg-gray-900 border-2 rounded-lg"
              style={{ borderColor: "#6B7280" }}
              placeholder={`Enter your bank name`}
              placeholderTextColor="#888"
              onChangeText={setBankname}
              value={bankname}
            />
          </View>
          {/* Security Questions */}
          <View className="p-1 mt-3 mb-3">
            <Text className="p-1 text-xl font-semibold text-white">
              Security Questions
            </Text>
            <Dropdown
              style={[
                styles.dropdown,
                isFocusQuestion && { borderColor: "blue" },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={questionData}
              labelField="label"
              valueField="value"
              placeholder={!isFocusQuestion ? "Select Question" : "..."}
              value={question}
              onFocus={() => setIsFocusQuestion(true)}
              onBlur={() => setIsFocusQuestion(false)}
              onChange={(item) => {
                setQuestion(item.value);
                setIsFocusQuestion(false);
              }}
              renderItem={(item) => (
                <View style={styles.item}>
                  <Text style={styles}>{item.label}</Text>
                </View>
              )}
            />
          </View>
          <View className="p-1 mb-3">
            <Text className="p-1 text-xl font-semibold text-white">Answer</Text>
            <TextInput
              className="w-full h-10 pl-2 text-lg text-white bg-black border-2 border-[#6B7280] mb-5  rounded-lg"
              placeholderTextColor="#888"
              onChangeText={setAnswer}
              value={answer}
            />
          </View>
          <CustomeButton onPress={createAccount} text="Create account" />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#888",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#fff",
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderRadius: 4,
    backgroundColor: "#fff",
  },
  textItem: {
    fontSize: 16,
    color: "#000",
  },
});

export default SignupNext;
