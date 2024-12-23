import React from "react";
import { View, ScrollView, Text, TouchableOpacity, Image } from "react-native";
import { useCart } from "../../context/CartContext";
import styles from "./styles";

const Cart = ({ navigation }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.shopButtonText}>Browse Restaurants</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.restaurantName}>{item.restaurantName}</Text>
              <Text style={styles.itemPrice}>${item.price}</Text>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={() =>
                    updateQuantity(item.id, Math.max(0, item.quantity - 1))
                  }
                  style={styles.quantityButton}
                >
                  <Text>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                  style={styles.quantityButton}
                >
                  <Text>+</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => removeFromCart(item.id)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;
