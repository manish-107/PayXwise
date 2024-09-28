import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Expanse = () => {
  const [expanseDetails, setExpanseDetails] = useState([]);

  const fetchUserExpanse = async () => {
    try {
      const token = await AsyncStorage.getItem("jwtToken");

      if (token) {
        const expanseCategoryuser = await axios.get(
          `${BASEURL}/api/v1/expanse/getExpanseCategoryofuser`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setExpanseDetails(expanseCategoryuser.data.categories);
        console.log(expanseCategoryuser.data.categories);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserExpanse();
  }, []);

  // Render each item in the list
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.categoryText}>{item.expanseName}</Text>
        <Text style={styles.amountText}>₹{item.totalAmount}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Expense Categories</Text>
      <FlatList
        data={expanseDetails}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2, // Adds a shadow on Android
    shadowColor: "#000", // Adds a shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  infoContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 18,
    fontWeight: "500",
  },
  amountText: {
    fontSize: 16,
    color: "green",
  },
});

export default Expanse;
