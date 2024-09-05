import { Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const Account = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#121212", paddingHorizontal: 16 }}
    >
      {/* Header Section */}
      <Text
        style={{
          paddingBottom: 16,
          fontSize: 24,
          fontWeight: "bold",
          color: "#F5D547", // Warm yellow for emphasis
        }}
      >
        Account Details
      </Text>

      {/* User Info Section */}
      <View
        className="flex flex-row items-center p-4"
        style={{ marginBottom: 16 }}
      >
        <Entypo name="user" size={38} color="white" />
        <View style={{ marginLeft: 12 }}>
          <Text style={{ color: "#E0E0E0", fontSize: 18, fontWeight: "600" }}>
            Manish
          </Text>
          <Text style={{ color: "#A3A3A3", fontSize: 14 }}>
            MAnish@gmail.com
          </Text>
        </View>
      </View>

      {/* Account Details Section */}
      <View
        style={{
          backgroundColor: "#1E1E1E", // Dark gray for card
          borderRadius: 12,
          padding: 20,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        {/* Account Number */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ color: "#A3A3A3", fontSize: 14 }}>Account Number</Text>
          <Text style={{ color: "#E0E0E0", fontSize: 18, fontWeight: "600" }}>
            XXXX XXXX 47674
          </Text>
        </View>

        {/* Available Balance */}
        <View>
          <Text style={{ color: "#A3A3A3", fontSize: 14 }}>
            Available Balance
          </Text>
          <Text style={{ color: "#4CAF50", fontSize: 22, fontWeight: "700" }}>
            $87,098.00 Cr
          </Text>
        </View>
      </View>

      {/* Bank Card Section */}
      <View
        className="flex flex-row items-center p-4"
        style={{
          backgroundColor: "#2E7D32", // Dark green for bank card
          borderRadius: 12,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <FontAwesome name="bank" size={24} color="white" />
        <Text
          style={{
            color: "#fff", // White text for contrast
            fontSize: 18,
            fontWeight: "600",
            paddingLeft: 10,
          }}
        >
          Children Bank of Joseph
        </Text>
      </View>

      {/* Personal Details Section */}
      <View
        className="flex flex-row justify-between"
        style={{
          padding: 5,
          marginTop: 15,
          marginBottom: 16,
          borderRadius: 12,
        }}
      >
        <View
          className="bg-[#1E1E1E] p-5 flex-1 mr-2"
          style={{
            borderRadius: 12,
            backgroundColor: "#1E1E1E",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <Text style={{ color: "#A3A3A3", fontSize: 14 }}>Phone Number</Text>
          <Text style={{ color: "#E0E0E0", fontSize: 18, fontWeight: "600" }}>
            9878677656
          </Text>
        </View>

        <View
          className="bg-[#1E1E1E] p-5 flex-1 ml-2"
          style={{
            borderRadius: 12,
            backgroundColor: "#1E1E1E",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.8,
            shadowRadius: 3,
            elevation: 5,
          }}
        >
          <Text style={{ color: "#A3A3A3", fontSize: 14 }}>Gender</Text>
          <Text style={{ color: "#4CAF50", fontSize: 22, fontWeight: "700" }}>
            Male
          </Text>
        </View>
      </View>

      {/* Note Section */}
      <View
        className="flex flex-row items-center p-4"
        style={{
          backgroundColor: "#f0f4c3", // Softer green-yellow tone
          borderRadius: 12,
          marginBottom: 16,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          elevation: 5,
        }}
      >
        <SimpleLineIcons name="note" size={24} color="black" />
        <Text
          style={{
            color: "#333", // Darker gray for better readability
            fontSize: 18,
            fontWeight: "600",
            paddingLeft: 10,
          }}
        >
          Please avoid sharing sensitive information.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Account;
