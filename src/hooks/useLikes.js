import { useState, useCallback } from "react";

export const useLikes = () => {
  const [likedRestaurants, setLikedRestaurants] = useState({});

  const toggleLike = useCallback((restaurantId) => {
    setLikedRestaurants((prev) => ({
      ...prev,
      [restaurantId]: !prev[restaurantId],
    }));
  }, []);

  return {
    likedRestaurants,
    toggleLike,
  };
};
