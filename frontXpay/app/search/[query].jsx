import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";

const searchSender = () => {
  const { query } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <SearchInput initialQuery={query} />
      <Text>{query}</Text>
    </SafeAreaView>
  );
};

export default searchSender;
