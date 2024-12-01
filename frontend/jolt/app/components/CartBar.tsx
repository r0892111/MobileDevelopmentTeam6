import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface CartBarProps {
  itemCount: number;
  totalPrice: number;
  onPress: () => void;
}

const CartBar: React.FC<CartBarProps> = ({
  itemCount,
  totalPrice,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>
        View Cart ({itemCount} items) - ${totalPrice.toFixed(2)}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3b5bdb",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CartBar;
