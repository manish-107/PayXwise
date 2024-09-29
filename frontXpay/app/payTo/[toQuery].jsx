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
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BASEURL from "../Var.js";

const SendToUser = () => {
  const { toQuery } = useLocalSearchParams();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [expense, setExpense] = useState("");
  const [selectedExpenseId, setSelectedExpenseId] = useState("");
  const [expenseList, setExpenseList] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState(expenseList);
  const [isTyping, setIsTyping] = useState(false);
  const [showPayButton, setShowPayButton] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [userAccount, setUserAccount] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [toAccID, settoaccid] = useState("");

  // Function to fetch expense categories
  const fetchExpanses = async (token) => {
    try {
      const expanses = await axios.get(
        `${BASEURL}/api/v1/expanse/getExpanseCategorys`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const categories = expanses?.data?.ExpanseCategory || [];
      setExpenseList(categories);
      setFilteredExpenses(categories);
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
    }
  };

  // Fetch user details and account details
  const fetchUserDetails = async (userId) => {
    try {
      setLoading(true); // Start loading when fetching user details
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        Alert.alert("Error", "Unauthorized. Token not found.");
        return;
      }

      // Fetch user details
      const response = await axios.get(
        `${BASEURL}/api/v1/transaction/userSearch/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Fetch account details
      const getAccountRes = await axios.get(
        `${BASEURL}/api/v1/transaction/accountDetails`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const account = getAccountRes?.data?.accountDetails?.[0];
      if (!account) {
        Alert.alert("Error", "No account details found for this user.");
      } else {
        setUserAccount(account);
      }
      settoaccid(response.data.user.accounts[0].acc_no);
      setUserDetails(response.data.user);

      fetchExpanses(token);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
      Alert.alert("Error", "Failed to fetch user details.");
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  useEffect(() => {
    if (toQuery) {
      console.log(toQuery)
      fetchUserDetails(toQuery);
    }
  }, [toQuery]);

  // Handle expense input change
  const handleExpenseChange = (text) => {
    setExpense(text);
    setIsTyping(true);

    if (text === "") {
      setFilteredExpenses(expenseList);
      setIsTyping(false);
    } else {
      const lowercasedText = text.toLowerCase();
      setFilteredExpenses(
        expenseList.filter((item) =>
          item.expcat_name.toLowerCase().includes(lowercasedText)
        )
      );
    }
  };

  // Function to create a new expense category
  const createExpense = async () => {
    if (expense && !expenseList.some((item) => item.expcat_name === expense)) {
      try {
        const token = await AsyncStorage.getItem("jwtToken");
        if (!token) {
          Alert.alert("Error", "Unauthorized. Token not found.");
          return;
        }

        const response = await axios.post(
          `${BASEURL}/api/v1/expanse/addExpanseCategory`,
          {
            categoryName: expense,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data.message === "expanseCategory created") {
          fetchExpanses(token);
          setIsTyping(false);
          Alert.alert("Success", "Expense category created.");
        } else {
          Alert.alert("Error", response.data.message);
        }
      } catch (error) {
        console.error("Failed to create expense category:", error);
        Alert.alert("Error", "Failed to create expense category.");
      }
    }
  };

  // Function to handle payment
  const payAmount = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        Alert.alert("Error", "Unauthorized. Token not found.");
        return;
      }

      if (!userAccount) {
        Alert.alert("Error", "No account found for this user.");
        return;
      }

      setLoading(true); // Start loading

      const fromAccNo = userAccount.acc_no;
      console.log(toAccID, amount, selectedExpenseId, description, fromAccNo);
      const payRes = await axios.post(
        `${BASEURL}/api/v1/transaction/sentMoney`,
        {
          fromAccNo,
          toAccNo: toAccID,
          amount: parseInt(amount),
          expcat_no: parseInt(selectedExpenseId),
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (payRes) {
        const { data } = payRes; // Assuming payRes is the response object
        const transactionId = data.data.addTransactionDetails.trans_id;
        setTimeout(() => {
          setLoading(false); // Stop loading after the delay
          router.push({
            pathname: "payTo/PayDetails",
            params: {
              transactionId: transactionId,
            },
          });
        }, 2000); // Delay of 2 seconds before redirect
      } else {
        setLoading(false); // Stop loading if payment fails
        Alert.alert("Error", "Payment failed.");
      }
    } catch (error) {
      setLoading(false); // Stop loading on error
      console.error("Failed to send payment:", error);
      Alert.alert("Error", "Failed to process payment.");
    }
  };

  useEffect(() => {
    if (amount?.length > 0 && description?.length >= 3 && expense && toQuery) {
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
        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={{ marginTop: 10 }}>Loading...</Text>
          </View>
        ) : (
          <View className="items-center">
            <Text className="text-lg font-bold text-gray-900">
              Paying: {userDetails.fullName || "User"}
            </Text>
            <Text className="text-lg font-extrabold text-green-500">
              Bank Name: {userAccount?.bankName || "Unknown"}
            </Text>
            <Text className="pt-3 text-lg font-bold">{`To: ${toQuery}`}</Text>

            <TextInput
              className="w-4/5 my-3 text-5xl font-semibold text-center text-gray-900"
              placeholder="₹0.00"
              placeholderTextColor="#7b7b7b"
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />

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
                    keyExtractor={(item) => item.expcat_no.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        className="p-2 my-1 bg-gray-200 rounded-md"
                        onPress={() => {
                          setExpense(item.expcat_name);
                          setSelectedExpenseId(item.expcat_no);
                          setIsTyping(false);
                        }}
                      >
                        <Text className="text-lg">{item.expcat_name}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    className="p-2 my-1 bg-blue-500 rounded-md"
                    onPress={createExpense}
                  >
                    <Text className="text-lg text-white">
                      Create new expense
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <TextInput
              className="w-4/5 p-2 my-3 border border-gray-300 rounded-md"
              placeholder="Description"
              placeholderTextColor="#999"
              value={description}
              onChangeText={(text) => setDescription(text)}
            />

            {showPayButton && (
              <TouchableOpacity
                className="w-4/5 p-3 my-3 bg-blue-500 rounded-md"
                onPress={payAmount}
              >
                <Text className="text-lg text-center text-white">Pay Now</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SendToUser;
