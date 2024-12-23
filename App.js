import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Dimensions,
  ImageBackground,
  Modal,
  TextInput,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CartScreen from "./src/screens/CartScreen";
import RestaurantDetailsScreen from "./src/screens/RestaurantDetailsScreen";
import { CartProvider } from "./src/context/CartContext";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_MARGIN = SCREEN_WIDTH > 600 ? 20 : 12;

// Add these color constants at the top of your file
const COLORS = {
  primary: "#6C63FF", // Modern purple
  secondary: "#4CAF50", // Fresh green
  background: "#F5F6FA", // Light grayish-blue
  white: "#FFFFFF",
  text: "#2D3436", // Dark slate
  textLight: "#636E72", // Medium gray
  accent: "#FFD93D", // Warm yellow
  error: "#FF6B6B", // Soft red
  success: "#4CAF50", // Green
};

// Add this after your imports
const backgroundImage = {
  uri: "https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
};

// Temporary solution if you don't have a logo file
const LOGO = {
  uri: "https://your-logo-url.com/logo.png",
};

// Add this new component for the address form
const AddressForm = ({ visible, onClose, onSave }) => {
  const [address, setAddress] = useState({
    street: "",
    city: "",
    zipCode: "",
    instructions: "",
  });

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Delivery Address</Text>

          <TextInput
            style={styles.input}
            placeholder="Street Address"
            value={address.street}
            onChangeText={(text) => setAddress({ ...address, street: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="City"
            value={address.city}
            onChangeText={(text) => setAddress({ ...address, city: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="ZIP Code"
            value={address.zipCode}
            onChangeText={(text) => setAddress({ ...address, zipCode: text })}
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Delivery Instructions"
            value={address.instructions}
            onChangeText={(text) =>
              setAddress({ ...address, instructions: text })
            }
            multiline
            numberOfLines={3}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={() => {
                onSave(address);
                onClose();
              }}
            >
              <Text style={styles.buttonText}>Save Address</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Add this new component for the review modal
const ReviewModal = ({ visible, onClose, onSubmit, restaurantName }) => {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Review {restaurantName}</Text>

          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Ionicons
                  name={rating >= star ? "star" : "star-outline"}
                  size={30}
                  color={COLORS.accent}
                  style={styles.starIcon}
                />
              </TouchableOpacity>
            ))}
          </View>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write your review here..."
            value={review}
            onChangeText={setReview}
            multiline
            numberOfLines={4}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.saveButton]}
              onPress={() => {
                onSubmit({ rating, review });
                onClose();
              }}
            >
              <Text style={styles.buttonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// Home Screen Component
function HomeScreen({ navigation }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notification, setNotification] = useState({
    visible: false,
    message: "",
  });
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState("Current Location");
  const [likedRestaurants, setLikedRestaurants] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const restaurants = [
    {
      id: 1,
      name: "Burger House",
      rating: 4.5,
      deliveryTime: "20-30",
      priceRange: "$$",
      cuisine: "American",
      categories: ["Burgers"],
      image:
        "https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=500",
    },
    {
      id: 2,
      name: "Pizza Palace",
      rating: 4.3,
      deliveryTime: "25-35",
      priceRange: "$$",
      cuisine: "Italian",
      categories: ["Pizza"],
      image:
        "https://images.unsplash.com/photo-1579751626657-72bc17010498?w=500",
    },
    {
      id: 3,
      name: "Sushi Master",
      rating: 4.8,
      deliveryTime: "30-40",
      priceRange: "$$$",
      cuisine: "Japanese",
      categories: ["Sushi", "Asian"],
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
    },
    {
      id: 4,
      name: "Taco Fiesta",
      rating: 4.4,
      deliveryTime: "15-25",
      priceRange: "$",
      cuisine: "Mexican",
      categories: ["Mexican"],
      image:
        "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500",
    },
    {
      id: 5,
      name: "Sweet Treats",
      rating: 4.6,
      deliveryTime: "20-30",
      priceRange: "$$",
      cuisine: "Desserts",
      categories: ["Desserts"],
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
    },
    {
      id: 6,
      name: "Dragon Wok",
      rating: 4.5,
      deliveryTime: "25-35",
      priceRange: "$$",
      cuisine: "Chinese",
      categories: ["Asian"],
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500",
    },
    {
      id: 7,
      name: "Mama's Pizzeria",
      rating: 4.7,
      deliveryTime: "20-35",
      priceRange: "$$",
      cuisine: "Italian",
      categories: ["Pizza"],
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    },
    {
      id: 8,
      name: "Burger Joint",
      rating: 4.2,
      deliveryTime: "15-25",
      priceRange: "$",
      cuisine: "American",
      categories: ["Burgers"],
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
    },
    {
      id: 9,
      name: "Thai Spice",
      rating: 4.6,
      deliveryTime: "30-45",
      priceRange: "$$",
      cuisine: "Thai",
      categories: ["Asian"],
      image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500",
    },
    {
      id: 10,
      name: "Cake Factory",
      rating: 4.8,
      deliveryTime: "25-35",
      priceRange: "$$$",
      cuisine: "Desserts",
      categories: ["Desserts"],
      image:
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    },
    {
      id: 11,
      name: "Tokyo Rolls",
      rating: 4.7,
      deliveryTime: "25-40",
      priceRange: "$$$",
      cuisine: "Japanese",
      categories: ["Sushi", "Asian"],
      image: "https://images.unsplash.com/photo-1553621042-f6e147245754?w=500",
    },
    {
      id: 12,
      name: "El Mariachi",
      rating: 4.5,
      deliveryTime: "20-35",
      priceRange: "$$",
      cuisine: "Mexican",
      categories: ["Mexican"],
      image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=500",
    },
    {
      id: 13,
      name: "Pho Delights",
      rating: 4.4,
      deliveryTime: "25-40",
      priceRange: "$$",
      cuisine: "Vietnamese",
      categories: ["Asian"],
      image:
        "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500",
    },
    {
      id: 14,
      name: "Ice Cream Paradise",
      rating: 4.9,
      deliveryTime: "15-25",
      priceRange: "$",
      cuisine: "Desserts",
      categories: ["Desserts"],
      image:
        "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=500",
    },
    {
      id: 15,
      name: "Napoli Pizza",
      rating: 4.6,
      deliveryTime: "20-35",
      priceRange: "$$",
      cuisine: "Italian",
      categories: ["Pizza"],
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500",
    },
  ];

  const categories = [
    {
      id: "all",
      name: "All",
      icon: "🍽️",
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
    },
    {
      id: "pizza",
      name: "Pizza",
      icon: "🍕",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500",
    },
    {
      id: "burgers",
      name: "Burgers",
      icon: "🍔",
      image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500",
    },
    {
      id: "sushi",
      name: "Sushi",
      icon: "🍱",
      image:
        "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500",
    },
    {
      id: "mexican",
      name: "Mexican",
      icon: "🌮",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
    },
    {
      id: "asian",
      name: "Asian",
      icon: "🥢",
      image:
        "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500",
    },
    {
      id: "desserts",
      name: "Desserts",
      icon: "🍰",
      image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
    },
  ];

  const getFilteredRestaurants = (category) => {
    if (!category || category === "All") {
      return restaurants;
    }
    return restaurants.filter((restaurant) =>
      restaurant.categories.some(
        (cat) => cat.toLowerCase() === category.toLowerCase()
      )
    );
  };

  const filteredRestaurants = getFilteredRestaurants(selectedCategory);

  const showNotification = (message) => {
    setNotification({ visible: true, message });
    setTimeout(() => {
      setNotification({ visible: false, message: "" });
    }, 2000); // Hide after 2 seconds
  };

  const handleLikePress = (restaurantId) => {
    setLikedRestaurants((prev) => ({
      ...prev,
      [restaurantId]: !prev[restaurantId],
    }));
  };

  const handleReviewSubmit = ({ rating, review }) => {
    if (selectedRestaurant) {
      console.log(`New review for ${selectedRestaurant.name}:`, {
        rating,
        review,
      });
      showNotification(`Thank you for reviewing ${selectedRestaurant.name}!`);
    }
  };

  // Update the renderRestaurantCard function
  const renderRestaurantCard = (restaurant) => (
    <TouchableOpacity
      key={restaurant.id}
      style={styles.restaurantCard}
      onPress={() => navigation.navigate("RestaurantDetails", { restaurant })}
    >
      <Image
        source={{ uri: restaurant.image }}
        style={styles.restaurantImage}
      />
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantHeader}>
          <Text style={styles.restaurantName}>{restaurant.name}</Text>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => handleLikePress(restaurant.id)}
          >
            <MaterialIcons
              name={
                likedRestaurants[restaurant.id] ? "favorite" : "favorite-border"
              }
              size={24}
              color={
                likedRestaurants[restaurant.id]
                  ? COLORS.error
                  : COLORS.textLight
              }
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
          onPress={() => {
            setSelectedRestaurant(restaurant);
            setShowReviewModal(true);
          }}
        >
          <Ionicons name="star-outline" size={16} color={COLORS.primary} />
          <Text style={styles.reviewButtonText}>Write a Review</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  // Add this function to handle address save
  const handleSaveAddress = (address) => {
    setDeliveryAddress(`${address.street}, ${address.city}`);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        {notification.visible && (
          <View style={styles.notification}>
            <Text style={styles.notificationText}>{notification.message}</Text>
          </View>
        )}
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>Food Delivery</Text>
              <TouchableOpacity
                style={styles.addressButton}
                onPress={() => setShowAddressForm(true)}
              >
                <Ionicons
                  name="location-outline"
                  size={20}
                  color={COLORS.white}
                />
                <Text style={styles.headerSubtitle}>{deliveryAddress}</Text>
                <Text style={styles.changeAddress}>Change</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.cartButton}
              onPress={() => navigation.navigate("Cart")}
            >
              <View style={styles.cartIconContainer}>
                <Ionicons
                  name="cart-outline"
                  size={24}
                  color={COLORS.primary}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Updated Categories with selection */}
        <View style={styles.categories}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryItem,
                  selectedCategory === category.name && styles.selectedCategory,
                ]}
                onPress={() => setSelectedCategory(category.name)}
              >
                <Image
                  source={{ uri: category.image }}
                  style={styles.categoryImage}
                />
                <View style={styles.categoryContent}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <Text
                    style={[
                      styles.categoryName,
                      selectedCategory === category.name &&
                        styles.selectedCategoryText,
                    ]}
                  >
                    {category.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Restaurants List with filtered results */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedCategory
                ? `${selectedCategory} Restaurants`
                : "Popular Restaurants"}
            </Text>
            {filteredRestaurants.length === 0 && (
              <Text style={styles.noResults}>
                No restaurants found in this category
              </Text>
            )}
          </View>
          {filteredRestaurants.map((restaurant) =>
            renderRestaurantCard(restaurant)
          )}
        </View>

        <AddressForm
          visible={showAddressForm}
          onClose={() => setShowAddressForm(false)}
          onSave={handleSaveAddress}
        />

        {/* Add the ReviewModal here, outside of the restaurant card */}
        <ReviewModal
          visible={showReviewModal}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedRestaurant(null);
          }}
          onSubmit={handleReviewSubmit}
          restaurantName={selectedRestaurant?.name || ""}
        />
      </ScrollView>
    </ImageBackground>
  );
}

// Add this function before the App component
const CartIcon = ({ navigation }) => (
  <TouchableOpacity
    style={styles.headerCartButton}
    onPress={() => navigation.navigate("Cart")}
  >
    <View style={styles.cartIconContainer}>
      <Ionicons name="cart-outline" size={24} color={COLORS.primary} />
    </View>
  </TouchableOpacity>
);

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: COLORS.primary,
                elevation: 0,
                shadowOpacity: 0,
                height: Platform.OS === "ios" ? 110 : 65,
              },
              headerTintColor: COLORS.white,
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 20,
                letterSpacing: 0.5,
              },
              headerShadowVisible: false,
              headerTitleAlign: "center",
              headerLeftContainerStyle: {
                paddingLeft: 15,
              },
              headerRightContainerStyle: {
                paddingRight: 15,
              },
              contentStyle: {
                paddingTop: Platform.OS === "ios" ? 0 : 10,
              },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RestaurantDetails"
              component={RestaurantDetailsScreen}
              options={({ navigation }) => ({
                title: "Restaurant",
                headerRight: () => <CartIcon navigation={navigation} />,
                headerStyle: {
                  backgroundColor: COLORS.primary,
                  elevation: 0,
                  shadowOpacity: 0,
                  height: Platform.OS === "ios" ? 110 : 65,
                },
              })}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{
                title: "Your Cart",
                headerStyle: {
                  backgroundColor: COLORS.primary,
                  elevation: 0,
                  shadowOpacity: 0,
                  height: Platform.OS === "ios" ? 110 : 65,
                },
              }}
            />
          </Stack.Navigator>
          <StatusBar style="auto" />
        </NavigationContainer>
      </CartProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === "ios" ? 50 : 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 8,
    paddingBottom: 15,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 20,
  },
  headerTitleContainer: {
    flex: 1,
    marginRight: 60,
  },
  headerTitle: {
    fontSize: SCREEN_WIDTH > 600 ? 32 : 28,
    fontWeight: "bold",
    color: COLORS.white,
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: SCREEN_WIDTH > 600 ? 18 : 14,
    color: COLORS.white,
    opacity: 0.9,
    letterSpacing: 0.5,
    flex: 1,
    marginRight: 10,
  },
  categories: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  categoryItem: {
    marginRight: 15,
    width: SCREEN_WIDTH > 600 ? 150 : 110,
    height: SCREEN_WIDTH > 600 ? 180 : 140,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: COLORS.white,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  categoryImage: {
    width: "100%",
    height: SCREEN_WIDTH > 600 ? 120 : 80,
  },
  categoryContent: {
    alignItems: "center",
    padding: 12,
    backgroundColor: COLORS.white,
  },
  categoryIcon: {
    fontSize: SCREEN_WIDTH > 600 ? 24 : 16,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: SCREEN_WIDTH > 600 ? 16 : 12,
    fontWeight: "600",
    textAlign: "center",
    color: "#1a1a1a",
  },
  section: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginTop: 15,
    marginHorizontal: 15,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: SCREEN_WIDTH > 600 ? 24 : 20,
    fontWeight: "700",
    marginBottom: 15,
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
  restaurantCard: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    transform: [{ scale: 0.98 }],
  },
  restaurantInfo: {
    padding: 15,
  },
  restaurantName: {
    fontSize: SCREEN_WIDTH > 600 ? 22 : 18,
    fontWeight: "700",
    color: COLORS.text,
    letterSpacing: 0.5,
  },
  restaurantDetails: {
    color: "#666",
    marginTop: 5,
    fontSize: SCREEN_WIDTH > 600 ? 16 : 14,
    flexDirection: "row",
    alignItems: "center",
  },
  cartButton: {
    position: "absolute",
    right: 20,
    top: 0,
    zIndex: 1,
  },
  cartIcon: {
    fontSize: SCREEN_WIDTH > 600 ? 24 : 20,
  },
  cuisineType: {
    color: "#4A90E2",
    fontSize: SCREEN_WIDTH > 600 ? 16 : 14,
    marginTop: 5,
    fontWeight: "500",
  },
  restaurantImage: {
    width: "100%",
    height: SCREEN_WIDTH > 600 ? 300 : 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  selectedCategory: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: COLORS.accent,
  },
  selectedCategoryText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  sectionHeader: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  noResults: {
    color: "#666",
    fontSize: SCREEN_WIDTH > 600 ? 16 : 14,
    marginTop: 5,
    fontStyle: "italic",
    textAlign: "center",
  },
  notification: {
    position: "absolute",
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 15,
    zIndex: 1000,
    opacity: 0.95,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  notificationText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  headerCartButton: {
    padding: 8,
    marginRight: 5,
    marginTop: Platform.OS === "ios" ? 0 : 5,
  },
  cartIconContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    marginTop: Platform.OS === "ios" ? 0 : -5,
  },
  headerCartIcon: {
    fontSize: SCREEN_WIDTH > 600 ? 24 : 20,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  addressButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 8,
    borderRadius: 10,
    marginTop: 10,
    maxWidth: SCREEN_WIDTH - 120,
  },
  changeAddress: {
    color: COLORS.accent,
    fontSize: 12,
    marginLeft: 5,
    fontWeight: "600",
    paddingLeft: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: COLORS.error,
  },
  saveButton: {
    backgroundColor: COLORS.success,
  },
  buttonText: {
    color: COLORS.white,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  restaurantHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  likeButton: {
    padding: 5,
  },
  reviewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 8,
    borderRadius: 8,
    marginTop: 10,
    alignSelf: "flex-start",
  },
  reviewButtonText: {
    color: COLORS.primary,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
  },
  cartIconContainer: {
    backgroundColor: COLORS.white,
    padding: 10,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  starIcon: {
    marginHorizontal: 5,
  },
});
