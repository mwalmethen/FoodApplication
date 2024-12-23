import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
  },
  content: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  section: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginTop: 10,
    marginHorizontal: 15,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    color: COLORS.text,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  noResults: {
    color: COLORS.textLight,
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },
});
