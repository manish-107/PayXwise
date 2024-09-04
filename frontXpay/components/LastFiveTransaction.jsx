import React from "react";
import { View, Text } from "react-native";

const LastTransaction = [
  {
    id: 1,
    amount: "10000",
    name: "Manish",
    datetime: "Sep 01, 2024",
  },
  {
    id: 2,
    amount: "20000",
    name: "Anish",
    datetime: "Sep 02, 2024",
  },
  {
    id: 3,
    amount: "30000",
    name: "Akhil",
    datetime: "Sep 03, 2024",
  },
];

const LastFiveTransaction = () => {
  return (
    <View className="bg-[#D5EB4D] h-fit m-5 rounded-lg">
      <Text className="pt-3 pl-6 text-xl font-bold text-black">
        Last 5 transactions
      </Text>
      <View className="flex flex-col justify-between p-3">
        {LastTransaction.map((transaction) => {
          return (
            <View
              key={transaction.id}
              className="p-5 mb-5 ml-5 mr-5 bg-white shadow-lg rounded-2xl"
              style={{
                backgroundColor: "#1F1F1F", // Dark background
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 4,
                elevation: 5, // Android shadow effect
              }}
            >
              <Text className="text-lg font-semibold text-[#D5EB4D]">
                {transaction.name}
              </Text>

              <View className="flex flex-row items-center justify-between">
                <Text className="text-xl font-bold text-white">
                  $ {transaction.amount}
                </Text>
                <Text className="text-sm font-medium text-gray-400">
                  {transaction.datetime}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default LastFiveTransaction;
