import { useState, useCallback, useMemo } from "react";
import { restaurants } from "../../../constants/data";

export const useRestaurants = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRestaurants = useMemo(() => {
    let filtered = restaurants;

    if (searchQuery) {
      filtered = filtered.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory && selectedCategory !== "All") {
      filtered = filtered.filter((restaurant) =>
        restaurant.categories.some(
          (cat) => cat.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  return {
    restaurants: filteredRestaurants,
    selectedCategory,
    setSelectedCategory: handleCategorySelect,
    searchQuery,
    setSearchQuery,
  };
};
