import React from "react";
import { View } from "react-native";
import styles from "./styles";

export const Container = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};
