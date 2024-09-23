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
import axios from "axios";
import BASEURL from "../Var.js";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchTransactionHistory = async () => {
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

      // Assuming response contains userData, accountDetails, and transactions
      const { userData, accountDetails, transactions } = response.data;

      // Update state with user and transaction info
      setUsername(userData?.fullName || "User"); // Ensure username is displayed
      setAmount(accountDetails?.[0]?.balance || 0); // Assuming first account has the balance
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
    <SafeAreaView>
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View className="bg-[#D5EB4D] rounded-3xl h-fit ml-3 mr-3 flex">
          <SearchInput />
          <View className="flex flex-col pt-2 pb-4 pl-6">
            <Text className="text-xl font-bold">Welcome</Text>
            {/* Display username */}
            <Text className="text-2xl font-extrabold">{username}</Text>
          </View>
          <View
            className="p-5 mx-5 mb-5 text-white bg-black b rounded-2xl"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 10,
              elevation: 10, // for Android
            }}
          >
            <Text className="text-xl font-semibold text-white">Amount</Text>

            <View className="flex flex-row items-center pt-3">
              <Text className="text-xl font-bold text-white">$ {amount}</Text>
              <Entypo
                name="eye"
                style={{ paddingLeft: 20 }}
                size={20}
                color="white"
              />
            </View>
          </View>
        </View>

        <View className="flex flex-row justify-between mx-10">
          {/* Your other touchable items */}
        </View>

        <DashboardPeople />

        {/* Pass transactions as props to LastFiveTransaction */}
        <LastFiveTransaction transactions={transactions} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
