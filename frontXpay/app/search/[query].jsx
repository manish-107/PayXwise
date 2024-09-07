import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import Feather from "@expo/vector-icons/Feather";

// Sample data for users
const users = [
  { id: 1, name: "Manish", phone: "+91 8989898989" },
  { id: 2, name: "Ravi", phone: "+91 7878787878" },
  { id: 3, name: "Pooja", phone: "+91 6767676767" },
  { id: 4, name: "Anjali", phone: "+91 5656565656" },
  { id: 5, name: "Suresh", phone: "+91 4545454545" },
  { id: 6, name: "Suresh", phone: "+91 4545454545" },
  { id: 7, name: "Suresh", phone: "+91 4545454545" },
  { id: 8, name: "Suresh", phone: "+91 4545454545" },
  { id: 9, name: "Suresh", phone: "+91 4545454545" },
  { id: 10, name: "Suresh", phone: "+91 4545454545" },
];

const PeopleCard = ({ user }) => {
  let phone = user.phone;
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
      onPress={() => router.push(`/payTo/${user.phone}`)}
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
          {user.name}
        </Text>
        <Text style={{ color: "#555" }}>{user.phone}</Text>
      </View>
    </TouchableOpacity>
  );
};

const SearchSender = () => {
  const { query } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ backgroundColor: "#e0e3eb", flex: 1 }}>
      <SearchInput initialQuery={query} />
      <Text className="text-xl font-semibold ml-7">Make transaction</Text>
      {/* FlatList to render the users */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PeopleCard user={item} />}
        contentContainerStyle={{ padding: 20 }}
      />

      <Text style={{ color: "#555", textAlign: "center", marginTop: 10 }}>
        {query}
      </Text>
    </SafeAreaView>
  );
};

export default SearchSender;
