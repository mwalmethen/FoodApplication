import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants/colors";

export default StyleSheet.create({
  notification: {
    position: "absolute",
    top: 90,
    left: 20,
    right: 20,
    backgroundColor: COLORS.primary,
    padding: 15,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    zIndex: 1000,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 2,
    borderColor: "#fff",
  },
  message: {
    color: "#fff",
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
});
