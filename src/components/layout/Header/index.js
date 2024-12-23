import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/colors";
import styles from "./styles";

export const Header = ({ onSearch, searchValue, onCartPress }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Food Delivery</Text>
      <TouchableOpacity style={styles.cartButton} onPress={onCartPress}>
        <Ionicons name="cart-outline" size={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};
