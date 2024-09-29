import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router"; // Import useRouter for navigation
import axios from "axios";
import BASEURL from "../app/Var.js"; // Ensure BASEURL is correctly set up

const DashboardPeople = () => {
  const [userList, setUserList] = useState([]);
  const router = useRouter(); // Initialize router

  // Fetch user list from the API
  const getAllPeople = async () => {
    try {
      const getUsers = await axios.get(`${BASEURL}/api/v1/users/getUser`); // Ensure the endpoint is correct
      setUserList(getUsers.data.users);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPeople(); // Fetch users when the component mounts
  }, []);

  return (
    <View className="bg-[#9a96963b] h-fit m-5 rounded-lg p-4">
      <Text className="pl-3 mb-4 text-xl font-bold text-black">People</Text>
      <View className="flex flex-row flex-wrap justify-between">
        {userList.map((user) => (
          <TouchableOpacity
            key={user.user_id} // Use user_id as the key
            onPress={() => {
              router.push(`/payTo/${user.user_id}`);
            }} // Use relative path to navigate
            className="items-center justify-center w-20 h-20 mb-4"
            style={{
              backgroundColor: "black", // Set background color
              borderRadius: 40, // Border radius
              shadowColor: "#000", // Shadow color
              shadowOffset: { width: 0, height: 2 }, // Shadow offset
              shadowOpacity: 0.3, // Shadow opacity
              shadowRadius: 4, // Shadow radius
              elevation: 3, // Android shadow effect
            }}
          >
            <Entypo name="user" size={32} color="white" />
            <Text className="mt-1 text-xs text-center text-white">
              {user.fullName} {/* Display user's full name */}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DashboardPeople;
