import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASEURL from "../Var.js";

// const BASEURL = "your_base_url"; // Replace with your actual base URL

const SendToUser = () => {
  const { toQuery } = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState("");
  const [expenseList, setExpenseList] = useState([
    "Rent",
    "Groceries",
    "Utilities",
    "Subscriptions",
  ]);
  const [filteredExpenses, setFilteredExpenses] = useState(expenseList);
  const [isTyping, setIsTyping] = useState(false);
  const [showPayButton, setShowPayButton] = useState(false);
  const [userDetails, setUserDetails] = useState({}); // State to hold user details

  // Function to fetch user details by user ID
  const fetchUserDetails = async (userId) => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        Alert.alert("Error", "Unauthorized. Token not found.");
        return;
      }

      const response = await axios.get(
        `${BASEURL}/api/v1/transaction/userSearch/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming response contains user details
      const { user } = response.data;

      // Update state with user details
      setUserDetails(user);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch user details.");
    }
  };

  useEffect(() => {
    if (toQuery) {
      fetchUserDetails(toQuery);
    }
  }, [toQuery]);

  // Existing code...

  const handleExpenseChange = (text) => {
    setExpense(text);
    setIsTyping(true);
    if (text === "") {
      setFilteredExpenses(expenseList);
      setIsTyping(false);
    } else {
      setFilteredExpenses(
        expenseList.filter((item) =>
          item.toLowerCase().includes(text.toLowerCase())
        )
      );
    }
  };

  const createExpense = () => {
    if (expense && !expenseList.includes(expense)) {
      setExpenseList([...expenseList, expense]);
      setFilteredExpenses([...expenseList, expense]);
    }
    setExpense("");
    setIsTyping(false);
  };

  const payAmount = () => {
    console.log(amount, description, expense, toQuery);
    router.push("payTo/PayDetails");
  };

  useEffect(() => {
    if (amount.length > 0 && description.length >= 3 && expense && toQuery) {
      setShowPayButton(true);
    } else {
      setShowPayButton(false);
    }
  }, [amount, description, expense, toQuery]);

  return (
    <SafeAreaView className="justify-center flex-1 p-5 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="items-center ">
          <Text className="text-lg font-bold text-gray-900">
            Paying: {userDetails.fullName || "User"}
          </Text>
          <Text className="text-lg font-extrabold text-green-500">
            Bank Name: {userDetails.accounts?.[0]?.bankName || "Unknown"}
          </Text>
          <Text className="pt-3 text-lg font-bold">{`To: ${toQuery}`}</Text>

          {/* Numeric Input for Amount */}
          <TextInput
            className="w-4/5 my-3 text-5xl font-semibold text-center text-gray-900"
            placeholder="$0.00"
            placeholderTextColor="#7b7b7b"
            keyboardType="numeric"
            value={amount}
            onChangeText={(text) => setAmount(text)}
          />

          {/* Expense Selection Box */}
          <View className="w-4/5 my-3">
            <TextInput
              className="p-2 border border-gray-300 rounded-md"
              placeholder="Search or create an expense"
              placeholderTextColor="#999"
              value={expense}
              onChangeText={handleExpenseChange}
            />
            {isTyping && (
              <>
                <FlatList
                  data={filteredExpenses}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      className="p-2 my-1 bg-gray-200 rounded-md"
                      onPress={() => {
                        setExpense(item);
                        setIsTyping(false);
                      }}
                    >
                      <Text className="text-base">{item}</Text>
                    </TouchableOpacity>
                  )}
                />
                {filteredExpenses.length === 0 && expense !== "" && (
                  <TouchableOpacity
                    className="p-2 mt-3 bg-blue-500 rounded-md"
                    onPress={createExpense}
                  >
                    <Text className="text-center text-white">
                      Create Expense: {expense}
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            )}
          </View>

          {/* Description TextInput */}
          <TextInput
            className="p-1 my-3 text-base bg-[#ffffff] border pl-2 pr-2 border-gray-700 rounded-lg"
            placeholder="Enter description"
            placeholderTextColor="#999"
            onChangeText={setDescription}
            value={description}
          />
        </View>

        <View className="items-center mt-5">
          <TouchableOpacity
            className={`px-20 py-4 rounded-md ${
              showPayButton ? "bg-black " : "bg-[#918f8f] "
            }`}
            onPress={() => payAmount()}
            disabled={!showPayButton}
          >
            <Text className="text-lg font-bold text-white">{`Pay`}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SendToUser;
