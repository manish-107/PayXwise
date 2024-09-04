import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Entypo from "@expo/vector-icons/Entypo";
import { Link, useRouter } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import DashboardPeople from "../../components/DashBoardPeople.jsx";
import LastFiveTransaction from "../../components/LastFiveTransaction.jsx";

const Dashboard = () => {
  const router = useRouter();
  return (
    <SafeAreaView>
      {/* Wrap content inside ScrollView */}
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View className="bg-[#D5EB4D] rounded-3xl h-fit ml-3 mr-3 flex">
          <View className="flex flex-col pt-10 pb-4 pl-6">
            <Text className="text-xl font-bold">Welcome</Text>
            <Text className="text-2xl font-extrabold">Manish</Text>
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
              <Text className="text-xl font-bold text-white">$ 100000</Text>
              <Entypo
                name="eye"
                style={{ paddingLeft: 20 }}
                size={20}
                color="white"
              />
            </View>
          </View>
        </View>

        {/* choose your option content starts */}
        {/* <Text className="pt-4 pl-6 text-xl font-bold">Choose your option!</Text> */}
        <View className="flex flex-row justify-between mx-10">
          <TouchableOpacity
            style={{
              width: 64,
              height: 64,
              padding: 8,
              marginTop: 16,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() => router.push("/Scan")}
          >
            <MaterialIcons name="qr-code-scanner" size={36} color="black" />
            <Text style={{ fontSize: 12, color: "black" }}>Scan</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 64,
              height: 64,
              padding: 8,
              marginTop: 16,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() => router.push("/account")}
          >
            <MaterialIcons name="account-balance" size={36} color="black" />
            <Text style={{ fontSize: 12, color: "black", textAlign: "center" }}>
              Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 64,
              height: 64,
              padding: 8,
              marginTop: 16,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() => router.push("/payPage")}
          >
            <FontAwesome5 name="users" size={36} color="black" />
            <Text style={{ fontSize: 12, color: "black", textAlign: "center" }}>
              Pay
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              width: 64,
              height: 64,
              padding: 8,
              marginTop: 16,
              backgroundColor: "white",
              borderRadius: 10,
              alignItems: "center",
            }}
            onPress={() => router.push("/Scan")}
          >
            <MaterialIcons name="qr-code-scanner" size={36} color="black" />
            <Text style={{ fontSize: 12, color: "black", textAlign: "center" }}>
              Scan
            </Text>
          </TouchableOpacity>
        </View>

        {/* choose your option content ends */}
        <DashboardPeople />
        <LastFiveTransaction />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;
