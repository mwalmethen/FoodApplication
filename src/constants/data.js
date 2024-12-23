export const categories = [
  {
    id: "all",
    name: "All",
    icon: "🍽️",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500",
  },
  // ... other categories
];

export const restaurants = [
  {
    id: 1,
    name: "Burger House",
    rating: 4.5,
    deliveryTime: "20-30",
    priceRange: "$$",
    cuisine: "American",
    categories: ["Burgers"],
    image: "https://images.unsplash.com/photo-1606131731446-5568d87113aa?w=500",
  },
  // ... other restaurants
];

export const menuData = {
  "Burger House": [
    {
      id: "bh1",
      name: "Classic Cheeseburger",
      description: "Beef patty, cheddar cheese, lettuce, tomato, special sauce",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500",
    },
    // ... other menu items
  ],
  // ... other restaurant menus
};
