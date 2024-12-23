import React from "react";
import { View, Text } from "react-native";
import RestaurantCard from "./RestaurantCard";
import styles from "./styles";

const RestaurantList = ({
  restaurants,
  selectedCategory,
  likedRestaurants,
  onRestaurantPress,
  onLikePress,
  onReviewPress,
}) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          {selectedCategory
            ? `${selectedCategory} Restaurants`
            : "Popular Restaurants"}
        </Text>
        {restaurants.length === 0 && (
          <Text style={styles.noResults}>
            No restaurants found in this category
          </Text>
        )}
      </View>
      {restaurants.map((restaurant) => (
        <RestaurantCard
          key={restaurant.id}
          restaurant={restaurant}
          isLiked={likedRestaurants[restaurant.id]}
          onPress={() => onRestaurantPress(restaurant)}
          onLikePress={onLikePress}
          onReviewPress={onReviewPress}
        />
      ))}
    </View>
  );
};

export default RestaurantList;
