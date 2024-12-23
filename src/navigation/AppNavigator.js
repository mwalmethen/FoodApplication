import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import { COLORS } from "../constants/colors";
import Home from "../screens/Home";
import RestaurantDetails from "../screens/RestaurantDetails";
import Cart from "../screens/Cart";
import CartIcon from "../components/common/CartIcon";

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: COLORS.primary,
    elevation: 0,
    shadowOpacity: 0,
    height: Platform.OS === "ios" ? 110 : 65,
  },
  headerTintColor: COLORS.white,
  headerTitleStyle: {
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 0.5,
  },
  headerShadowVisible: false,
  headerTitleAlign: "center",
  headerLeftContainerStyle: {
    paddingLeft: 15,
  },
  headerRightContainerStyle: {
    paddingRight: 15,
  },
  contentStyle: {
    paddingTop: Platform.OS === "ios" ? 0 : 10,
  },
};

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RestaurantDetails"
        component={RestaurantDetails}
        options={({ navigation }) => ({
          title: "Restaurant",
          headerRight: () => <CartIcon navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ title: "Your Cart" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
