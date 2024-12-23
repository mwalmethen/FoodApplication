import { StyleSheet } from "react-native";
import { COLORS } from "../../../../../constants/colors";

export default StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  content: {
    padding: 15,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    flex: 1,
  },
  likeButton: {
    padding: 5,
  },
  details: {
    color: COLORS.textLight,
    fontSize: 14,
    marginBottom: 8,
  },
  cuisine: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "500",
  },
});
