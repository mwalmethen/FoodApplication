import React from "react";
import { View, ScrollView } from "react-native";
import { CategoryItem } from "./components/CategoryItem";
import { categories } from "../../../constants/data";
import styles from "./styles";

export const Categories = ({ selectedCategory, onSelectCategory }) => {
  return (
    <View style={styles.categories}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <CategoryItem
            key={category.id}
            category={category}
            isSelected={selectedCategory === category.name}
            onPress={() => onSelectCategory(category.name)}
          />
        ))}
      </ScrollView>
    </View>
  );
};
