import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import Feather from "@expo/vector-icons/Feather";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage
import BASEURL from "../Var.js"; // Assuming this contains your backend URL

const PeopleCard = ({ user }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        gap: 15,
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#f5f7fa",
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
      }}
      onPress={() => router.push(`/payTo/${user.user_id}`)}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#4285F4",
          borderRadius: 25,
          width: 50,
          height: 50,
        }}
      >
        <Feather name="user" size={24} color="white" />
      </View>

      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#333" }}>
          {user.fullName}
        </Text>
        <Text style={{ color: "#555" }}>{user.phoneNumber}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SearchSender = () => {
  const { query } = useLocalSearchParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch users based on the search query
  const fetchUsers = async () => {
    setLoading(true); // Show loading spinner
    try {
      const token = await AsyncStorage.getItem("jwtToken"); // Get the token from AsyncStorage

      if (!token) {
        throw new Error("Unauthorized. Token not found.");
      }

      const response = await axios.get(
        `${BASEURL}/api/v1/transaction/search/${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        }
      );

      setUsers(response.data.user); // Assuming the response contains an array of users
    } catch (error) {
      console.error("Error fetching users:", error);
      setUsers([]); // Clear users in case of error
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Call fetchUsers on component mount or query change
  useEffect(() => {
    if (query) {
      fetchUsers();
    }
  }, [query]);

  return (
    <SafeAreaView style={{ backgroundColor: "#e0e3eb", flex: 1 }}>
      <SearchInput initialQuery={query} />

      <Text className="text-xl font-semibold ml-7">Make transaction</Text>

      {/* Show loading spinner when loading */}
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={{ marginTop: 10 }}>Loading...</Text>
        </View>
      ) : (
        <>
          {/* Show message if no users are found */}
          {users.length === 0 ? (
            <Text style={{ textAlign: "center", marginTop: 20 }}>
              No users found for "{query}"
            </Text>
          ) : (
            <FlatList
              data={users}
              keyExtractor={(item) => item.user_id.toString()}
              renderItem={({ item }) => <PeopleCard user={item} />}
              contentContainerStyle={{ padding: 20 }}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};

export default SearchSender;
