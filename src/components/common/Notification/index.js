import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

export const Notification = ({ visible, message, image }) => {
  if (!visible) return null;

  return (
    <View style={styles.notification}>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};
