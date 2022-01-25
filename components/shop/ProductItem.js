import React from "react";
import {
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
const ProductItem = ({ title, price, imageUrl, onSelect, children }) => {
  let TouchableComp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableComp = TouchableNativeFeedback;
  }
  return (
    <Card style={styles.product}>
      <TouchableComp onPress={onSelect} useForeground>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.leftContent}>
            {children[0]}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>${price.toFixed()}</Text>
            </View>
            {children[1]}
          </View>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: imageUrl }} />
          </View>
        </View>
      </TouchableComp>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 200,
    flexDirection: "row",
    margin: 20,
    overflow: "hidden",
  },
  touchable: {
    borderRadius: 10,
  },
  leftContent: {
    width: "40%",
    justifyContent: "center",
    alignItems: "flex-end",
    padding: 10,
  },
  imageContainer: {
    width: "60%",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontFamily: "yanone-kaffee-bold",
  },
  textContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  price: {
    fontSize: 19,
    color: "#888",
    fontFamily: "yanone-kaffee-regular",
  },
});

export default ProductItem;
