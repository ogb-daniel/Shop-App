import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Button, Platform, StatusBar, View } from "react-native";
import Colors from "../constants/Colors";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import CartScreen from "../screens/shop/CartScreen";
import OrderScreen from "../screens/shop/OrderScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import * as authActions from "../store/actions/auth";
import EditProductScreen from "../screens/user/EditProductsScreen";
import AuthScreen from "../screens/user/AuthScreen";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StartupScreen from "../screens/StartupScreen";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
  headerTitleStyle: {
    fontFamily: "yanone-kaffee-bold",
    fontSize: 26,
  },
  headerBackTitleStyle: {
    fontFamily: "yanone-kaffee-regular",
  },
};

const ProductsStack = createStackNavigator();
// const AuthStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const Drawer = createDrawerNavigator();
const UserProductsStack = createStackNavigator();
const Stack = createStackNavigator();
const ProductsNavigator = () => {
  return (
    <ProductsStack.Navigator screenOptions={defaultNavOptions}>
      <ProductsStack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={{
          headerTitle: "All Products",
        }}
      />
      <ProductsStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
      />
      <ProductsStack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerTitle: "Your Cart",
        }}
      />
    </ProductsStack.Navigator>
  );
};

// const AuthNavigator = () => {
//   return (
//     <AuthStack.Navigator screenOptions={defaultNavOptions}>
//       <AuthStack.Screen
//         name="Auth"
//         component={AuthScreen}
//         options={{ headerTitle: "Authenticate" }}
//       />
//     </AuthStack.Navigator>
//   );
// };

const OrdersNavigator = () => {
  return (
    <OrdersStack.Navigator screenOptions={defaultNavOptions}>
      <OrdersStack.Screen
        name="Orders"
        component={OrderScreen}
        options={{
          headerTitle: "Your Orders",
        }}
      />
    </OrdersStack.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <UserProductsStack.Navigator screenOptions={defaultNavOptions}>
      <UserProductsStack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={{
          headerTitle: "Your Products",
        }}
      />
      <UserProductsStack.Screen
        name="EditProduct"
        component={EditProductScreen}
        initialParams={{
          prodcutId: "",
        }}
      />
    </UserProductsStack.Navigator>
  );
};
const ShopNavigator = () => {

  const dispatch = useDispatch();
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary,
        labelStyle: {
          fontFamily: "yanone-kaffee-bold",
          fontSize: 23,
        },
      }}
      drawerContent={(props) => (
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Logout"
            activeTintColor={Colors.primary}
            labelStyle={{
              fontFamily: "yanone-kaffee-bold",
              fontSize: 23,
            }}
            onPress={() => {
              dispatch(authActions.logout())
            }}
            icon={({ focused, color, size }) => (
              <Ionicons
                name={focused ? "log-out" : "log-out-outline"}
                color={color}
                size={25}
              />
            )}
          />
        </DrawerContentScrollView>
      )}
      screenOptions={({ route }) => ({
        drawerIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Products") {
            iconName = focused ? "ios-cart" : "ios-cart-outline";
          } else if (route.name === "Orders") {
            iconName = focused ? "ios-list" : "ios-list-outline";
          } else if (route.name === "Admin") {
            iconName = focused ? "ios-create" : "ios-create-outline";
          }
          return <Ionicons name={iconName} color={color} size={25} />;
        },
      })}
    >
      <Drawer.Screen name="Products" component={ProductsNavigator} />
      <Drawer.Screen name="Orders" component={OrdersNavigator} />
      <Drawer.Screen name="Admin" component={AdminNavigator} />
    </Drawer.Navigator>
  );
};

export default MainNavigator = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const isLoading = useSelector((state) => !!state.auth.isLoading);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={Colors.primary} />
      <Stack.Navigator screenOptions={defaultNavOptions}>
        {isLoading ? (
          <Stack.Screen
            name="Startup"
            component={StartupScreen}
            options={{ headerShown: false }}
          />
        ) : isAuth ? (
          <Stack.Screen
            name="Shop"
            component={ShopNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Auth"
            component={AuthScreen}
            options={{ headerTitle: "Authenticate" }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
