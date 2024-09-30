import { View, Text } from "react-native";
import QRCodeView from "react-native-qrcode-svg";
import { useLocalSearchParams } from "expo-router";

const QRCode = () => {
  const { qrValue } = useLocalSearchParams();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <QRCodeView
        value={qrValue}
        size={300}
        color="black"
        backgroundColor="white"
      />
    </View>
  );
};

export default QRCode;
