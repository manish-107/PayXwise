import { Stack } from "expo-router";

const detailsLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="payPage" options={{ headerShown: false }} />
      <Stack.Screen name="expanse" options={{ headerShown: false }} />
      <Stack.Screen
        name="account"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default detailsLayout;
