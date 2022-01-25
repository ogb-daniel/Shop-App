import React, { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";
import CartItem from "./CartItem";

const OrderItem = ({ amount, date, items }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>
          Total Price: ${amount.toFixed(2)}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide Details" : "Show Deatils"}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.detailItem}>
          {items.map((cartItem) => (
            <CartItem
              key={cartItem.productId}
              amount={cartItem.sum}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    padding: 10,
  },
  totalAmount: {
    fontFamily: "yanone-kaffee-bold",
    fontSize: 20,
  },
  date: {
    fontFamily: "yanone-kaffee-regular",
    fontSize: 20,
    color: "#888",
  },
  detailItem: {
    width: "100%",
  },
});

export default OrderItem;
