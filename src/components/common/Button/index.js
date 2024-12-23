import React from "react";
import { TouchableOpacity, Text } from "react-native";
import styles from "./styles";

const Button = ({
  onPress,
  children,
  variant = "primary",
  size = "medium",
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, styles[variant], styles[size], style]}
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
