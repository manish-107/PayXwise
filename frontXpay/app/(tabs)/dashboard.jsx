import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DashboardPeople from "../../components/DashBoardPeople.jsx";
import LastFiveTransaction from "../../components/LastFiveTransaction.jsx";
import SearchInput from "../../components/SearchInput.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import axios from "axios";
import BASEURL from "../Var.js";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const onLogout = async () => {
    try {
      // Clear the token from AsyncStorage
      await AsyncStorage.removeItem("jwtToken");

      // Optionally navigate to the login screen
      router.push("(auth)/signin");
    } catch (error) {
      console.error("Failed to log out:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const fetchTransactionHistory = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      // console.log(token);
      if (!token) {
        Alert.alert("Error", "Unauthorized. Token not found.");
        // router.push("(auth)/login");
        return;
      }

      const response = await axios.get(
        `${BASEURL}/api/v1/transaction/transactionHistory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Assuming response contains userData, accountDetails, and transactions
      const { userData, accountDetails, transactions } = response.data;

      // Update state with user and transaction info
      setUsername(userData?.fullName || "User");
      setAmount(accountDetails?.[0]?.balance || 0);
      setTransactions(transactions);
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch transaction history.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  // If loading, display a large, centered ActivityIndicator
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f8f8",
        }}
      >
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ marginTop: 10, fontSize: 18 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8f8f8" }}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="bg-[#D5EB4D] rounded-3xl h-fit mx-3 flex">
          <SearchInput />
          <View className="flex flex-col pt-2 pb-4 pl-6">
            <Text className="text-xl font-bold">Welcome</Text>
            <Text className="text-2xl font-extrabold">{username}</Text>
          </View>
          <View
            className="p-5 mx-5 mb-5 text-white bg-black rounded-2xl"
            style={{
              display: "flex",
              flexDirection: "row",
              shadowColor: "#000",
              justifyContent: "space-between",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 10,
            }}
          >
            <View>
              <Text className="text-xl font-semibold text-white">Amount</Text>
              <View className="flex flex-row items-center pt-3">
                <Text className="text-xl font-bold text-white">$ {amount}</Text>
              </View>
            </View>
            {/* Logout Button */}
            <TouchableOpacity onPress={onLogout}>
              <MaterialCommunityIcons name="logout" size={24} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="flex flex-row justify-between mx-10">
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => router.push("/Scan")}
          >
            <MaterialIcons name="qr-code-scanner" size={36} color="black" />
            <Text style={buttonTextStyle}>Scan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => router.push("/account")}
          >
            <MaterialIcons name="account-balance" size={36} color="black" />
            <Text style={buttonTextStyle}>Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => router.push(`/search/${query}`)}
          >
            <FontAwesome5 name="users" size={36} color="black" />
            <Text style={buttonTextStyle}>Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => router.push("/Scan")}
          >
            <MaterialIcons name="qr-code-scanner" size={36} color="black" />
            <Text style={buttonTextStyle}>Scan</Text>
          </TouchableOpacity>
        </View>

        <DashboardPeople />
        <LastFiveTransaction transactions={transactions} />
      </ScrollView>
    </SafeAreaView>
  );
};

// Button styles
const buttonStyle = {
  width: 64,
  height: 64,
  padding: 8,
  marginTop: 16,
  backgroundColor: "white",
  borderRadius: 10,
  alignItems: "center",
};

const buttonTextStyle = {
  fontSize: 12,
  color: "black",
  textAlign: "center",
};

export default Dashboard;
