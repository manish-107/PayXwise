import { View } from 'react-native';
import QRCodeView from 'react-native-qrcode-svg';
import { useLocalSearchParams } from 'expo-router';

const QRCode = () => {
    const { qrValue } = useLocalSearchParams();
    return (
        <View className="flex-1 justify-center items-center">
            <QRCodeView
                value={qrValue}
                size={300}
                color='black'
                backgroundColor='white'></QRCodeView>
        </View>
    );
};



export default QRCode;
