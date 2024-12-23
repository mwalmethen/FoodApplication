import React from "react";
import { ScrollView } from "react-native";
import { Container } from "../../components/layout/Container";
import { Header } from "../../components/layout/Header";
import { Categories } from "../../components/features/Categories";
import { Restaurants } from "../../components/features/Restaurants";
import { Notification } from "../../components/common/Notification";
import { useRestaurants } from "./hooks/useRestaurants";
import { useNotification } from "../../hooks/useNotification";
import { useLikes } from "../../hooks/useLikes";
import styles from "./styles";

const Home = ({ navigation }) => {
  const {
    restaurants,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useRestaurants();

  const { notification, showNotification } = useNotification();
  const { likedRestaurants, toggleLike } = useLikes();

  const handleRestaurantPress = (restaurant) => {
    navigation.navigate("RestaurantDetails", { restaurant });
  };

  const handleCartPress = () => {
    navigation.navigate("Cart");
  };

  return (
    <Container>
      <ScrollView style={styles.container}>
        <Header
          onSearch={setSearchQuery}
          searchValue={searchQuery}
          onCartPress={handleCartPress}
        />

        <Categories
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        <Restaurants
          data={restaurants}
          likedRestaurants={likedRestaurants}
          onLikePress={toggleLike}
          onRestaurantPress={handleRestaurantPress}
          selectedCategory={selectedCategory}
        />
      </ScrollView>

      <Notification {...notification} />
    </Container>
  );
};

export default Home;
