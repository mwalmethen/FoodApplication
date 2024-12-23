import React, { useState } from "react";
import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import { useCart } from "../../context/CartContext";
import { useNotification } from "../../hooks/useNotification";
import { Notification } from "../../components/common/Notification";
import { menuData } from "../../constants/data";
import styles from "./styles";

const RestaurantDetails = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const { addToCart } = useCart();
  const { notification, showNotification } = useNotification();
  const [showReviewModal, setShowReviewModal] = useState(false);

  const menuItems = menuData[restaurant.name] || [];

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      restaurantName: restaurant.name,
    });
    showNotification(`${item.name} added to cart!`, item.image);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{ uri: restaurant.image }} style={styles.headerImage} />
        <View style={styles.content}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <Text style={styles.restaurantInfo}>
            ⭐ {restaurant.rating} • {restaurant.deliveryTime} min •{" "}
            {restaurant.priceRange}
          </Text>

          <View style={styles.menuSection}>
            <Text style={styles.menuTitle}>Menu</Text>
            {menuItems.map((item) => (
              <View key={item.id} style={styles.menuItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.menuItemImage}
                />
                <View style={styles.menuItemContent}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDescription}>
                    {item.description}
                  </Text>
                  <Text style={styles.menuItemPrice}>${item.price}</Text>
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => handleAddToCart(item)}
                  >
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <Notification {...notification} />
    </View>
  );
};

export default RestaurantDetails;
