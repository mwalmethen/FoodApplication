import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
} from "react-native";
import { useCart } from "../context/CartContext";
import { COLORS } from "../constants/colors";

const menuData = {
  "Burger House": [
    {
      id: "bh1",
      name: "Classic Cheeseburger",
      description: "Beef patty, cheddar cheese, lettuce, tomato, special sauce",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    },
    {
      id: "bh2",
      name: "BBQ Bacon Burger",
      description: "Beef patty, bacon, BBQ sauce, onion rings, cheddar",
      price: 14.99,
      image:
        "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500",
    },
    {
      id: "bh3",
      name: "Chicken Burger",
      description: "Crispy chicken breast, lettuce, mayo, pickles",
      price: 11.99,
      image:
        "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=500",
    },
  ],
  "Pizza Palace": [
    {
      id: "pp1",
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, basil, olive oil",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500",
    },
    {
      id: "pp2",
      name: "Pepperoni Pizza",
      description: "Pepperoni, mozzarella, tomato sauce",
      price: 16.99,
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500",
    },
    {
      id: "pp3",
      name: "Hawaiian Pizza",
      description: "Ham, pineapple, mozzarella, tomato sauce",
      price: 17.99,
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
    },
  ],
  "Sushi Master": [
    {
      id: "sm1",
      name: "California Roll",
      description: "Crab, avocado, cucumber, tobiko",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
    },
    {
      id: "sm2",
      name: "Salmon Nigiri Set",
      description: "Fresh salmon over seasoned rice (5 pieces)",
      price: 16.99,
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500",
    },
    {
      id: "sm3",
      name: "Dragon Roll",
      description: "Eel, cucumber, avocado, unagi sauce",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=500",
    },
  ],
  "Taco Fiesta": [
    {
      id: "tf1",
      name: "Street Tacos",
      description: "Three corn tortillas with carne asada, onion, cilantro",
      price: 10.99,
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500",
    },
    {
      id: "tf2",
      name: "Burrito Supreme",
      description: "Large flour tortilla with beans, rice, meat, guacamole",
      price: 13.99,
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500",
    },
    {
      id: "tf3",
      name: "Quesadilla",
      description: "Grilled tortilla with cheese, chicken, vegetables",
      price: 11.99,
      image:
        "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=500",
    },
  ],
  "Sweet Treats": [
    {
      id: "st1",
      name: "Chocolate Cake",
      description: "Rich chocolate layer cake with chocolate ganache",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
      id: "st2",
      name: "Cheesecake",
      description: "Classic New York style cheesecake",
      price: 7.99,
      image:
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500",
    },
    {
      id: "st3",
      name: "Ice Cream Sundae",
      description: "Vanilla ice cream with hot fudge and nuts",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=500",
    },
  ],
  "Cake Factory": [
    {
      id: "cf1",
      name: "Red Velvet Cake",
      description: "Classic red velvet with cream cheese frosting",
      price: 9.99,
      image:
        "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=500",
    },
    {
      id: "cf2",
      name: "Tiramisu",
      description: "Italian coffee-flavored dessert",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500",
    },
    {
      id: "cf3",
      name: "Fruit Tart",
      description: "Fresh seasonal fruits on custard",
      price: 7.99,
      image:
        "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=500",
    },
  ],
  "Ice Cream Paradise": [
    {
      id: "ip1",
      name: "Banana Split",
      description: "Classic banana split with three ice cream flavors",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?w=500",
    },
    {
      id: "ip2",
      name: "Waffle Cone Special",
      description: "Three scoops in a homemade waffle cone",
      price: 6.99,
      image: "https://images.unsplash.com/photo-1549395156-e0c1fe6fc7a5?w=500",
    },
    {
      id: "ip3",
      name: "Ice Cream Cake",
      description: "Layers of ice cream and cake with fudge",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=500",
    },
  ],
};

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const { addToCart } = useCart();
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
    image: "",
  });

  const menuItems = menuData[restaurant.name] || [];

  const showNotification = (message, image) => {
    setNotification({ visible: true, message, image });
    setTimeout(() => {
      setNotification({ visible: false, message: "", image: "" });
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <View>
          <ImageBackground
            source={{ uri: restaurant.image }}
            style={styles.headerImage}
          >
            <View style={styles.overlay} />
            <View style={styles.headerContent}>
              <Text style={styles.restaurantName}>{restaurant.name}</Text>
              <Text style={styles.restaurantInfo}>
                ⭐ {restaurant.rating} • {restaurant.deliveryTime} min •{" "}
                {restaurant.priceRange}
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.menuTitle}>Menu</Text>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.menuItemImage}
              />
              <View style={styles.menuItemContent}>
                <View style={styles.menuItemInfo}>
                  <Text style={styles.menuItemName}>{item.name}</Text>
                  <Text style={styles.menuItemDescription}>
                    {item.description}
                  </Text>
                  <Text style={styles.menuItemPrice}>${item.price}</Text>
                </View>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    addToCart({
                      ...item,
                      restaurantName: restaurant.name,
                    });
                    showNotification(`${item.name} added to cart!`, item.image);
                  }}
                >
                  <Text style={styles.addButtonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {notification.visible && (
        <View style={styles.notification}>
          <Image
            source={{ uri: notification.image }}
            style={styles.notificationImage}
          />
          <Text style={styles.notificationText}>{notification.message}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  headerImage: {
    height: Platform.OS === "ios" ? 300 : 280,
    width: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    paddingBottom: 30,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  restaurantName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  restaurantInfo: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.9,
    flexDirection: "row",
    alignItems: "center",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  menuSection: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30,
    paddingTop: 35,
    paddingHorizontal: 20,
    paddingBottom: 20,
    minHeight: "100%",
  },
  menuTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.text,
    paddingLeft: 5,
  },
  menuItem: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 25,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  menuItemImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  menuItemContent: {
    padding: 20,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  menuItemDescription: {
    color: COLORS.textLight,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  menuItemPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 15,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  notification: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 15,
    zIndex: 1000,
    opacity: 0.98,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  notificationImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },
  notificationText: {
    color: "#fff",
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
