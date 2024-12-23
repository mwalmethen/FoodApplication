import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";

export default StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.white,
  },
  cartButton: {
    padding: 8,
  },
});
