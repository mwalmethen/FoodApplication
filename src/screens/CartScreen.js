import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useCart } from "../context/CartContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_MARGIN = SCREEN_WIDTH > 600 ? 20 : 12;
const CARD_WIDTH = SCREEN_WIDTH - CARD_MARGIN * 2;
const IMAGE_SIZE = SCREEN_WIDTH > 600 ? 100 : 80;

export default function CartScreen() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={[styles.emptyText, { fontSize: 50, marginBottom: 20 }]}>
          🛒
        </Text>
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text
          style={[
            styles.emptyText,
            { marginTop: 10, fontSize: SCREEN_WIDTH > 600 ? 18 : 14 },
          ]}
        >
          Add items from restaurants to start your order
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
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
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: CARD_MARGIN * 2,
    backgroundColor: "#fff",
  },
  emptyText: {
    fontSize: SCREEN_WIDTH > 600 ? 24 : 18,
    color: "#666",
    textAlign: "center",
    fontWeight: "500",
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: CARD_MARGIN,
    borderRadius: 16,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    width: CARD_WIDTH,
    alignSelf: "center",
  },
  itemImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 12,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: SCREEN_WIDTH > 600 ? 20 : 16,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 4,
  },
  restaurantName: {
    fontSize: SCREEN_WIDTH > 600 ? 16 : 14,
    color: "#666",
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: SCREEN_WIDTH > 600 ? 20 : 16,
    fontWeight: "700",
    color: "#2E8B57",
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    backgroundColor: "#f8f9fa",
    padding: 8,
    borderRadius: 12,
  },
  quantityButton: {
    backgroundColor: "#fff",
    padding: SCREEN_WIDTH > 600 ? 12 : 8,
    borderRadius: 8,
    marginRight: 10,
    minWidth: SCREEN_WIDTH > 600 ? 44 : 36,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e1e1",
  },
  quantityButtonText: {
    fontSize: SCREEN_WIDTH > 600 ? 20 : 16,
    fontWeight: "600",
    color: "#1a1a1a",
  },
  quantity: {
    fontSize: SCREEN_WIDTH > 600 ? 20 : 16,
    fontWeight: "600",
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#ff4444",
    padding: SCREEN_WIDTH > 600 ? 12 : 8,
    borderRadius: 8,
    marginLeft: "auto",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  removeButtonText: {
    color: "#fff",
    fontSize: SCREEN_WIDTH > 600 ? 16 : 14,
    fontWeight: "600",
  },
  totalContainer: {
    padding: SCREEN_WIDTH > 600 ? 30 : 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  totalText: {
    fontSize: SCREEN_WIDTH > 600 ? 26 : 20,
    fontWeight: "700",
    marginBottom: 20,
    color: "#1a1a1a",
  },
  checkoutButton: {
    backgroundColor: "#2E8B57",
    padding: SCREEN_WIDTH > 600 ? 20 : 15,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: SCREEN_WIDTH > 600 ? 20 : 16,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
