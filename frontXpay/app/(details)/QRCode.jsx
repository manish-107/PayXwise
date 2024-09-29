import { View } from 'react-native-reanimated/lib/typescript/Animated';
import QRCodeView from 'react-native-qrcode-svg';

const QRCode = ({ qrValue }) => {
    return (
        <View>
            <QRCodeView
                value={qrValue}
                size={200}
                color='black'
                backgroundColor='white'></QRCodeView>
        </View>
    );
};

export default QRCode;
