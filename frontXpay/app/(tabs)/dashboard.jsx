import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { Link } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DashboardPeople from "../../components/DashBoardPeople.jsx";
import LastFiveTransaction from "../../components/LastFiveTransaction.jsx";

const Dashboard = () => {
  return (
    <SafeAreaView>
      {/* Wrap content inside ScrollView */}
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View className="bg-[#D5EB4D] rounded-3xl h-fit ml-3 mr-3 flex">
          <View className="flex flex-col pt-10 pb-4 pl-6">
            <Text className="text-xl font-bold">Welcome</Text>
            <Text className="text-2xl font-extrabold">Manish</Text>
          </View>
          <View className="p-5 mb-5 ml-5 mr-5 text-white bg-black rounded-2xl ">
            <Text className="text-xl font-semibold text-white">Amount</Text>

            <View className="flex flex-row pt-3 pr-10">
              <Text className="text-xl font-bold text-white ">$ 100000</Text>
              <Entypo
                name="eye"
                style={{ paddingTop: 5, paddingLeft: 20 }}
                size={20}
                color="white"
              />
            </View>
          </View>
        </View>

        {/* choose your option content starts */}
        <Text className="pt-4 pl-6 text-xl font-bold">Choose your option!</Text>
        <View className="flex flex-row justify-between ml-4 mr-4">
          <Link
            className="w-20 h-20 p-3 pl-2 mt-4 text-center bg-black rounded-xl"
            href="/scan"
          >
            <Pressable>
              <MaterialIcons name="qr-code-scanner" size={36} color="white" />
              <Text className="text-white">Scan</Text>
            </Pressable>
          </Link>
          <Link
            className="w-20 h-20 p-3 pl-2 mt-4 text-center bg-black rounded-xl"
            href="/scan"
          >
            <Pressable className="">
              <MaterialIcons
                name="account-balance"
                style={{ paddingLeft: 4 }}
                size={36}
                color="white"
              />
              <Text className="text-white">Account</Text>
            </Pressable>
          </Link>
          <Link
            className="w-20 h-20 p-3 pt-4 mt-4 text-center bg-black rounded-xl"
            href="/scan"
          >
            <Pressable>
              <FontAwesome5 name="users" size={30} color="white" />
              <Text className="text-center text-white">Pay</Text>
            </Pressable>
          </Link>
          <Link
            className="w-20 h-20 p-3 pl-2 mt-4 text-center bg-black rounded-xl"
            href="/scan"
          >
            <Pressable>
              <MaterialIcons name="qr-code-scanner" size={36} color="white" />
              <Text className="text-white">Scan</Text>
            </Pressable>
          </Link>
        </View>
        {/* choose your option content ends */}
        <DashboardPeople />
        <LastFiveTransaction />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
