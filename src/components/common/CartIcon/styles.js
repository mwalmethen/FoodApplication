import { StyleSheet, Platform } from "react-native";
import { COLORS } from "../../../constants/colors";

export default StyleSheet.create({
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
});
