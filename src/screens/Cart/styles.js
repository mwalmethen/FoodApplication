import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.white,
  },
  emptyText: {
    fontSize: 18,
    color: COLORS.textLight,
    marginBottom: 20,
  },
  shopButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  shopButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "600",
  },
  cartItem: {
    backgroundColor: COLORS.white,
    flexDirection: "row",
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 15,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.text,
  },
  restaurantName: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginTop: 4,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: COLORS.background,
    padding: 8,
    borderRadius: 6,
    marginRight: 10,
    minWidth: 35,
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: COLORS.error,
    padding: 8,
    borderRadius: 6,
    marginLeft: "auto",
  },
  removeButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "500",
  },
  footer: {
    backgroundColor: COLORS.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: COLORS.text,
  },
  checkoutButton: {
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  checkoutButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
