import { Camera, CameraView } from 'expo-camera';
import { Stack } from 'expo-router';
import {
    AppState,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
} from 'react-native';
import { useEffect, useRef } from 'react';
import { Overlay } from './Overlay';

export default function Home() {
    const qrLock = useRef(false);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        (async () => {
            await Camera.requestCameraPermissionsAsync();
        })();
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active'
                ) {
                    qrLock.current = false;
                }
                appState.current = nextAppState;
            }
        );

        return () => {
            subscription.remove();
        };
    }, []);

    return (
        <SafeAreaView style={StyleSheet.absoluteFill}>
            <Stack.Screen
                options={{
                    title: 'Overview',
                    headerShown: false,
                }}
            />
            {Platform.OS === 'android' ? <StatusBar hidden /> : null}
            {/* <Text style={style.title}>Scan to pay</Text> */}
            <CameraView
                style={StyleSheet.absoluteFill}
                facing='back'
                onBarcodeScanned={({ data }) => {
                    if (data && !qrLock.current) {
                        qrLock.current = true;
                        console.log(data);
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
