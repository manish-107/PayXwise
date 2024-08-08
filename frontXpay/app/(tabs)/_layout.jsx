import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import iconone from "../../assets/icon.png";

const TabIcon = ({ icon, color, name }) => {
  return (
    <View style={{ alignItems: "center" }}>
      {/* <Image
        source={icon}
        resizeMode="contain"
        style={{ width: 24, height: 24, tintColor: color }} // Adjusted styles
      /> */}
      <Text style={{ color }}>{name}</Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={iconone} name="Home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={iconone} name="Profile" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={iconone} name="Settings" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <TabIcon icon={iconone} name="Notifications" color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
