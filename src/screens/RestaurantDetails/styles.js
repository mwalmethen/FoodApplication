import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerImage: {
    width: "100%",
    height: Platform.OS === "ios" ? 300 : 250,
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: -20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  restaurantInfo: {
    fontSize: 16,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  menuSection: {
    marginTop: 20,
  },
  menuTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 15,
  },
  menuItem: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  menuItemImage: {
    width: "100%",
    height: 180,
    resizeMode: "cover",
  },
  menuItemContent: {
    padding: 15,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.text,
    marginBottom: 8,
  },
  menuItemDescription: {
    fontSize: 14,
    color: COLORS.textLight,
    marginBottom: 12,
    lineHeight: 20,
  },
  menuItemPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  reviewButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 10,
  },
  reviewButtonText: {
    color: COLORS.primary,
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "600",
  },
});
