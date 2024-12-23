import React from "react";
import { TouchableOpacity, Text, Image, View, StyleSheet } from "react-native";
import { COLORS } from "../../../../constants/colors";

export const CategoryItem = ({ category, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.categoryItem, isSelected && styles.selectedCategory]}
      onPress={onPress}
    >
      <Image source={{ uri: category.image }} style={styles.categoryImage} />
      <View style={styles.categoryContent}>
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <Text
          style={[
            styles.categoryName,
            isSelected && styles.selectedCategoryText,
          ]}
        >
          {category.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    marginRight: 15,
    width: 100,
    height: 130,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  categoryImage: {
    width: "100%",
    height: 80,
  },
  categoryContent: {
    alignItems: "center",
    padding: 8,
  },
  categoryIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  selectedCategory: {
    borderColor: COLORS.primary,
    borderWidth: 2,
  },
  selectedCategoryText: {
    color: COLORS.primary,
  },
});
