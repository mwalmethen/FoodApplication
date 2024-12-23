import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";

export default StyleSheet.create({
  container: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  noResults: {
    color: COLORS.textLight,
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
});
