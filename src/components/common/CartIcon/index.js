import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/colors";
import styles from "./styles";

const CartIcon = ({ navigation }) => (
  <TouchableOpacity
    style={styles.headerCartButton}
    onPress={() => navigation.navigate("Cart")}
  >
    <View style={styles.cartIconContainer}>
      <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
    </View>
  </TouchableOpacity>
);

export default CartIcon;
