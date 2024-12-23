import React from "react";
import { View, StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "../../../context/CartContext";
import AppNavigator from "../../../navigation/AppNavigator";
import styles from "./styles";

const AppLayout = () => {
  return (
    <View style={styles.container}>
      <CartProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </CartProvider>
    </View>
  );
};

export default AppLayout;
