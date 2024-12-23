import React, { useState } from "react";
import { ScrollView, ImageBackground } from "react-native";
import { categories, restaurants } from "../../constants/data";
import Header from "../../components/Header/Header";
import CategoryList from "../../components/CategoryList/CategoryList";
import RestaurantList from "../../components/RestaurantList/RestaurantList";
import Notification from "../../components/Notification/Notification";
import AddressForm from "../../components/Forms/AddressForm";
import ReviewForm from "../../components/Forms/ReviewForm";
import styles from "./styles";

const HomeScreen = ({ navigation }) => {
  // ... your state declarations ...

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

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <ScrollView style={styles.container}>
        <Header
          deliveryAddress={deliveryAddress}
          onAddressPress={() => setShowAddressForm(true)}
          onCartPress={() => navigation.navigate("Cart")}
        />

        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <RestaurantList
          restaurants={getFilteredRestaurants(selectedCategory)}
          selectedCategory={selectedCategory}
          likedRestaurants={likedRestaurants}
          onRestaurantPress={(restaurant) =>
            navigation.navigate("RestaurantDetails", { restaurant })
          }
          onLikePress={handleLikePress}
          onReviewPress={(restaurant) => {
            setSelectedRestaurant(restaurant);
            setShowReviewModal(true);
          }}
        />

        <AddressForm
          visible={showAddressForm}
          onClose={() => setShowAddressForm(false)}
          onSave={handleSaveAddress}
        />

        <ReviewForm
          visible={showReviewModal}
          restaurant={selectedRestaurant}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedRestaurant(null);
          }}
          onSubmit={handleReviewSubmit}
        />
      </ScrollView>

      <Notification
        visible={notification.visible}
        message={notification.message}
        image={notification.image}
      />
    </ImageBackground>
  );
};

export default HomeScreen;
