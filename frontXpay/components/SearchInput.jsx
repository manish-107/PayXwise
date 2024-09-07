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
    <View className="flex flex-row items-center h-16 px-4 m-4 space-x-4 border-2 bg-black-100 rounded-2xl border-black-200 focus:border-secondary bg-slate-200">
      <TextInput
        className="text-base mt-0.5 text-black flex-1 font-pregular"
        value={query}
        placeholder="Search a video topic"
        placeholderTextColor="#000"
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      <TouchableOpacity
        style={{ padding: 15, paddingLeft: 30 }}
        onPress={handleSearch}
      >
        <MaterialCommunityIcons
          name="account-search-outline"
          size={24}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
