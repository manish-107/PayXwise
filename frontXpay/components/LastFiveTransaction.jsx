import React from "react";
import { View, Text } from "react-native";

const LastFiveTransaction = ({ transactions }) => {
  return (
    <View className="bg-[#D5EB4D] h-fit m-2 rounded-lg">
      <Text className="pt-5 pl-10 text-xl font-bold text-black">
        Transactions
      </Text>
      <View className="flex flex-col justify-between p-3">
        {transactions.length > 0 ? (
          transactions.map((transaction) => {
            return (
              <View
                key={transaction.trans_id}
                className="p-3 mb-5 ml-3 mr-3 bg-white shadow-lg rounded-2xl"
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
                  Transaction ID: {transaction.trans_id}
                </Text>

                <View className="flex flex-row items-center justify-between">
                  <Text className="text-xl font-bold text-white">
                    ₹ {transaction.amount}
                  </Text>
                  <Text className="text-sm font-medium text-gray-400">
                    {new Date(transaction.trans_date).toLocaleDateString()}
                  </Text>
                </View>

                <Text className="text-sm text-gray-400">
                  Status: {transaction.status}
                </Text>
              </View>
            );
          })
        ) : (
          <Text className="text-lg text-black">No transactions available</Text>
        )}
      </View>
    </View>
  );
};

export default LastFiveTransaction;
