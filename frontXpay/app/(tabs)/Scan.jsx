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

export default function Home() {
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
      await Camera.requestCameraPermissionsAsync();
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
      {/* <Text style={style.title}>Scan to pay</Text> */}
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            router.push(`/payTo/${data}`);
          }
        }}
      />
      <Overlay />
    </SafeAreaView>
  );
}

// const style = StyleSheet.create({
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         color: 'white',
//         position: 'absolute',
//     },
// });
