import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import styles from "./styles";

const RestaurantCard = ({
  restaurant,
  onPress,
  isLiked,
  onLikePress,
  onReviewPress,
}) => {
  return (
    <TouchableOpacity style={styles.restaurantCard} onPress={onPress}>
      <Image
        source={{ uri: restaurant.image }}
        style={styles.restaurantImage}
      />
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
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
        <Text style={styles.restaurantDetails}>
          ⭐ {restaurant.rating} • {restaurant.deliveryTime} min •{" "}
          {restaurant.priceRange}
        </Text>
        <Text style={styles.cuisineType}>{restaurant.cuisine}</Text>
        <TouchableOpacity
          style={styles.reviewButton}
          onPress={() => onReviewPress(restaurant)}
        >
          <Ionicons name="star-outline" size={16} color={COLORS.primary} />
          <Text style={styles.reviewButtonText}>Write a Review</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
