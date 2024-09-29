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
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter, useFocusEffect } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DashboardPeople from "../../components/DashBoardPeople.jsx";
import LastFiveTransaction from "../../components/LastFiveTransaction.jsx";
import SearchInput from "../../components/SearchInput.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Foundation from "@expo/vector-icons/Foundation";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import axios from "axios";
import BASEURL from "../Var.js";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const onLogout = async () => {
    try {
      await AsyncStorage.removeItem("jwtToken");
      router.push("(auth)/signin");
    } catch (error) {
      console.error("Failed to log out:", error);
      Alert.alert("Error", "Failed to log out. Please try again.");
    }
  };

  const fetchTransactionHistory = async () => {
    setLoading(true); // Start loading again before fetching
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (!token) {
        Alert.alert("Error", "Unauthorized. Token not found.");
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

      const { userData, accountDetails, transactions = [] } = response.data;
      console.log(userData)
      setUsername(userData?.fullName || "User");
      setUserId(userData?.user_id);
      setAmount(accountDetails?.[0]?.balance || 0);
      setTransactions(transactions);
      setLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to fetch transaction history.");
      setLoading(false);
    }
  };

  // Fetch transaction history on component mount
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
            onPress={() => router.push(`/(tabs)/expanse`)}
          >
            <Foundation name="graph-bar" size={36} color="black" />
            <Text style={buttonTextStyle}>Expanse</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => router.push({ pathname: "/QRCode", params: { qrValue: userId } })}
          >
            <AntDesign name="qrcode" size={36} color="black" />
            <Text style={buttonTextStyle}>QR code</Text>
          </TouchableOpacity>
        </View>

        {/* Refresh Button */}

        <DashboardPeople />
        <TouchableOpacity
          style={{
            backgroundColor: "#D5EB4D",
            padding: 10,
            borderRadius: 8,
            marginBottom: 0,
            alignSelf: "center",
            marginTop: 10,
          }}
          onPress={fetchTransactionHistory} // Fetch transactions on button press
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Refresh Transactions
          </Text>
        </TouchableOpacity>
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
