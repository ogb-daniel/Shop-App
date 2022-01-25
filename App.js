import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { combineReducers, createStore, applyMiddleware } from "redux";
import * as Font from "expo-font";
import { Provider } from "react-redux";
import { enableScreens } from "react-native-screens";
import productsReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import authReducer from "./store/reducers/auth";
import ShopNavigator from "./navigation/ShopNavigator";
import { useEffect } from "react";
import ordersReducer from "./store/reducers/order";
import ReduxThunk from "redux-thunk";

enableScreens(true);

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    "yanone-kaffee-bold": require("./assets/fonts/YanoneKaffeesatz-Bold.ttf"),
    "yanone-kaffee-light": require("./assets/fonts/YanoneKaffeesatz-Light.ttf"),
    "yanone-kaffee-medium": require("./assets/fonts/YanoneKaffeesatz-Medium.ttf"),
    "yanone-kaffee-regular": require("./assets/fonts/YanoneKaffeesatz-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const getFonts = async () => {
      await fetchFonts();
      setFontLoaded(true);
    };
    getFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
