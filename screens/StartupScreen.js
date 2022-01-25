import React, { useEffect } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import * as authActions from "../store/actions/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../constants/Colors";
const StartupScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem("userData");
      if (!userData) {
        dispatch(authActions.authenticate(null, null, null));
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expirationDate } = transformedData;
      const expiration = new Date(expirationDate);

      if (expiration <= new Date() || !token || !userId) {
        dispatch(authActions.authenticate(null, null, null));
        return;
      }

      const expirationTime = expiration.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };
    setTimeout(() => {
      tryLogin();
    }, 4000);
  }, [dispatch]);
  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
