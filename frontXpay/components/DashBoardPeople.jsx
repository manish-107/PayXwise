import React from "react";
import { View, Text, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";

const recentPeople = [
  { id: 1, name: "Manish", color: "black" },
  { id: 2, name: "Anish", color: "black" },
  { id: 3, name: "Akhil", color: "black" },
  { id: 4, name: "Ravi", color: "black" },
  { id: 5, name: "Sita", color: "black" },
  { id: 6, name: "Gita", color: "black" },
  { id: 7, name: "Aarti", color: "black" },
  { id: 8, name: "Raj", color: "black" },
];

const DashboardPeople = () => {
  return (
    <View className="bg-[#9a96963b] h-fit m-5 rounded-lg p-4">
      <Text className="pl-3 mb-4 text-xl font-bold text-black">People</Text>
      <View className="flex flex-row flex-wrap justify-between">
        {recentPeople.map((person) => (
          <Link
            key={person.id}
            className="items-center justify-center w-20 h-20 mb-4"
            href="/scan"
          >
            <Pressable
              style={{
                backgroundColor: person.color,
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 70,
                borderRadius: 40,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
                elevation: 3, // Android shadow effect
              }}
            >
              <Entypo name="user" size={32} color="white" />
              <Text className="mt-1 text-xs text-center text-white">
                {person.name}
              </Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
};

export default DashboardPeople;
