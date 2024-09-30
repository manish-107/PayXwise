import { Camera, CameraView } from "expo-camera";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import {
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";
import { useCallback, useEffect, useRef } from "react";
import { Overlay } from "../../components/Overlay.jsx";

export default function Scan() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      qrLock.current = false;
    }, [])
  );

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        alert("Camera permission is required!");
      }
    })();

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFill}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={({ data }) => {
          try {
            if (data && !qrLock.current) {
              qrLock.current = true;
              router.push(`/payTo/${data}`);
            }
          } catch (error) {
            console.error("Error while scanning barcode:", error);
            qrLock.current = false; // Reset the lock in case of error
          }
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}
