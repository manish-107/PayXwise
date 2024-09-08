import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";

const expanse = () => {
  return (
    <SafeAreaView>
      <View>
        <FontAwesome5 name="user-alt" size={24} color="black" />
        <Text>To Manish</Text>
        <Text>+91 8765654587</Text>
        <View>
          <FontAwesome name="rupee" size={24} color="black" />
          <Text>260</Text>
        </View>
        <View>
          <Ionicons
            name="checkmark-done-circle-sharp"
            size={24}
            color="black"
          />
          <Text>Completed</Text>
        </View>
        <Text>7 sept 2024 6:04 pm</Text>
      </View>
      <View>
        <View>
          <FontAwesome name="bank" size={24} color="black" />
          <Text>Union bank of india</Text>
        </View>
        <View>
          <Text>Upi transcation ID</Text>
          <Text>8787876576523</Text>
        </View>
        <View>
          <Text>To: Anish</Text>
          <Text>anish@gmail.com</Text>
        </View>
        <View>
          <Text>From :manish</Text>
          <Text>manish@gmail.com</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default expanse;
