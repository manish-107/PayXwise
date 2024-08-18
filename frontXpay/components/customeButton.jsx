import { Text, TouchableOpacity } from "react-native";
import React from "react";

const CustomeButton = ({ text, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: "#CBCF00",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 24,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#000000", fontSize: 18, fontWeight: "bold" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomeButton;
