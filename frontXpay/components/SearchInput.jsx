import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { router, usePathname } from "expo-router";

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");

  const handleSearch = () => {
    if (query === "") {
      Alert.alert("Missing Query", "Please input something to search");
      return;
    }

    if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}`);
    }
  };

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        height: 56,
        paddingHorizontal: 16,
        margin: 16,
        borderRadius: 30,
        backgroundColor: "#E5E7EB", // Light background for input
        borderWidth: 2,
        borderColor: "#D1D5DB", // Soft border color
        shadowColor: "#000", // Shadow for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
      }}
    >
      <TextInput
        style={{
          flex: 1,
          fontSize: 16,
          color: "#000",
          fontFamily: "Roboto",
        }}
        value={query}
        placeholder="search and pay friends"
        placeholderTextColor="#6B7280" // Lighter placeholder color
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <TouchableOpacity
        style={{
          paddingHorizontal: 12,
          paddingVertical: 10,
          marginLeft: 10,
        }}
        onPress={handleSearch}
      >
        <MaterialCommunityIcons
          name="account-search-outline"
          size={28}
          color="#1F2937" // Darker icon color
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
