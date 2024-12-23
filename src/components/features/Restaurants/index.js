import React from "react";
import { View, Text } from "react-native";
import { RestaurantCard } from "./components/RestaurantCard";
import styles from "./styles";

export const Restaurants = ({
  data,
  likedRestaurants,
  onLikePress,
  onRestaurantPress,
  selectedCategory,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {selectedCategory
            ? `${selectedCategory} Restaurants`
            : "All Restaurants"}
        </Text>
      </View>
      {data.length === 0 ? (
        <Text style={styles.noResults}>No restaurants found</Text>
      ) : (
        data.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            isLiked={likedRestaurants[restaurant.id]}
            onPress={() => onRestaurantPress(restaurant)}
            onLikePress={onLikePress}
          />
        ))
      )}
    </View>
  );
};
