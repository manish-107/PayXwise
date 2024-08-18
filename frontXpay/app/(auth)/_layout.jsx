import { Stack, Tabs } from "expo-router";

const authLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="signin" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
      <Stack.Screen
        name="signupnext"
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#000000", // Background color of the header
          },
          headerTintColor: "#fcf955", // Color of the header text and icons
          headerTitleStyle: {
            fontWeight: "bold", // Style the header title text
            fontSize: 24,
          },
          headerTitle: "Sign In", // Custom header title
        }}
      />
    </Stack>
  );
};

export default authLayout;
