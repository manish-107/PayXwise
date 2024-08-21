import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView, Text, View, StyleSheet, TextInput } from "react-native";
import CustomeButton from "../../components/customeButton";

const genderData = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

const questionData = [
  { label: "What is your pet's name?", value: "pet" },
  { label: "What is your favorite book?", value: "book" },
  { label: "What was the name of your first school?", value: "school" },
];

const SignupNext = () => {
  const [gender, setGender] = useState("");
  const [question, setQuestion] = useState("");
  const [isFocusGender, setIsFocusGender] = useState(false);
  const [isFocusQuestion, setIsFocusQuestion] = useState(false);
  const [answer, setAnswer] = useState("");

  // Accessing passed parameters using useLocalSearchParams
  const { fullName, email, phoneNumber, password } = useLocalSearchParams();

  const createAccount = () => {
    if (gender == "" || question == "" || answer == "") {
      return;
    }
    console.log(fullName, email, phoneNumber, password);
    console.log(gender, question, answer);
  };

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
          <CustomeButton
            onPress={() => createAccount()}
            text="Create account"
          />
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
