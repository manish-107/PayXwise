import React, { useEffect, useState } from "react";
import { Text, View, ActivityIndicator } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios"; // Make sure axios is imported

const Account = () => {
  const [accountDetails, setAccountDetails] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator

  const fetchAccDetails = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");
      if (token) {
        const response = await axios.get(
          `${BASEURL}/api/v1/transaction/accountDetails`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAccountDetails(response.data); // Set fetched data to state
        setLoading(false); // Stop loading once data is fetched
      }
    } catch (error) {
      console.log(error);
      setLoading(false); // Stop loading in case of an error
    }
  };

  useEffect(() => {
    fetchAccDetails();
  }, []);

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#F5D547" />
      </SafeAreaView>
    );
  }

  // Destructure the fetched data
  const { userDetails, accountDetails: accDetails } = accountDetails || {};
  const userFullName = userDetails?.fullName || "User";
  const userEmail = userDetails?.email || "user@example.com";
  const userPhone = userDetails?.phoneNumber || "N/A";
  const accountNumber = accDetails?.[0]?.acc_no || "XXXX XXXX XXXX";
  const bankName = accDetails?.[0]?.bankName || "Unknown Bank";
  const availableBalance = accDetails?.[0]?.balance || "0.00";

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#121212", paddingHorizontal: 16 }}
    >
      {/* Header Section */}
      <Text
        style={{
          paddingBottom: 16,
          fontSize: 24,
          fontWeight: "bold",
          color: "#F5D547", // Warm yellow for emphasis
        }}
      >
        Account Details
      </Text>

      {/* User Info Section */}
      <View
        className="flex flex-row items-center p-4"
        style={{ marginBottom: 16 }}
      >
        <Entypo name="user" size={38} color="white" />
        <View style={{ marginLeft: 12 }}>
          <Text style={{ color: "#E0E0E0", fontSize: 18, fontWeight: "600" }}>
            {userFullName}
          </Text>
          <Text style={{ color: "#A3A3A3", fontSize: 14 }}>{userEmail}</Text>
        </View>
      </View>

      {/* Account Details Section */}
      <View
        style={{
          backgroundColor: "#1E1E1E", // Dark gray for card
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        {/* Account Number */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ color: "#A3A3A3", fontSize: 14 }}>Account Number</Text>
          <Text style={{ color: "#E0E0E0", fontSize: 18, fontWeight: "600" }}>
            {accountNumber}
          </Text>
        </View>

        {/* Available Balance */}
        <View>
          <Text style={{ color: "#A3A3A3", fontSize: 14 }}>
            Available Balance
          </Text>
          <Text style={{ color: "#4CAF50", fontSize: 22, fontWeight: "700" }}>
            ₹{availableBalance}
          </Text>
        </View>
      </View>

      {/* Bank Card Section */}
      <View
        className="flex flex-row items-center p-4"
        style={{
          backgroundColor: "#2E7D32", // Dark green for bank card
          borderRadius: 12,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <FontAwesome name="bank" size={24} color="white" />
        <Text
          style={{
            color: "#fff", // White text for contrast
            fontSize: 18,
            fontWeight: "600",
            paddingLeft: 10,
          }}
        >
          {bankName}
        </Text>
      </View>

      {/* Personal Details Section */}
      <View
        className="flex flex-row justify-between"
        style={{
          padding: 5,
          marginTop: 15,
          marginBottom: 16,
          borderRadius: 12,
        }}
      >
        <View
          className="bg-[#1E1E1E] p-5 flex-1 mr-2"
          style={{
            borderRadius: 12,
            backgroundColor: "#1E1E1E",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <Text style={{ color: "#A3A3A3", fontSize: 14 }}>Phone Number</Text>
          <Text style={{ color: "#E0E0E0", fontSize: 18, fontWeight: "600" }}>
            {userPhone}
          </Text>
        </View>

        <View
          className="bg-[#1E1E1E] p-5 flex-1 ml-2"
          style={{
            borderRadius: 12,
            backgroundColor: "#1E1E1E",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <Text style={{ color: "#A3A3A3", fontSize: 14 }}>Gender</Text>
          <Text style={{ color: "#4CAF50", fontSize: 22, fontWeight: "700" }}>
            Male
          </Text>
        </View>
      </View>

      {/* Note Section */}
      <View
        className="flex flex-row items-center p-4"
        style={{
          backgroundColor: "#f0f4c3", // Softer green-yellow tone
          borderRadius: 12,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <SimpleLineIcons name="note" size={24} color="black" />
        <Text
          style={{
            color: "#333", // Darker gray for better readability
            fontSize: 18,
            fontWeight: "600",
            paddingLeft: 10,
          }}
        >
          Please avoid sharing sensitive information.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Account;
