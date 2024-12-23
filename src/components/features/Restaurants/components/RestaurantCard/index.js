import React from "react";
import { TouchableOpacity, View, Text, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../../../constants/colors";
import styles from "./styles";

export const RestaurantCard = ({
  restaurant,
  isLiked,
  onPress,
  onLikePress,
}) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{restaurant.name}</Text>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => onLikePress(restaurant.id)}
          >
            <MaterialIcons
              name={isLiked ? "favorite" : "favorite-border"}
              size={24}
              color={isLiked ? COLORS.error : COLORS.textLight}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.details}>
          ⭐ {restaurant.rating} • {restaurant.deliveryTime} min •{" "}
          {restaurant.priceRange}
        </Text>
        <Text style={styles.cuisine}>{restaurant.cuisine}</Text>
      </View>
    </TouchableOpacity>
  );
};
