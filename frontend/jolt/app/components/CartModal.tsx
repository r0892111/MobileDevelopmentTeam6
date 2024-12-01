import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Dish } from "../types/Dish";

interface CartItem {
  dish: Dish;
  quantity: number;
}

interface CartModalProps {
  cartItems: CartItem[];
  totalPrice: number;
  onUpdateQuantity: (dishId: number, newQuantity: number) => void;
  onRemoveItem: (dishId: number) => void;
  onClose: () => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({
  cartItems,
  totalPrice,
  onUpdateQuantity,
  onRemoveItem,
  onClose,
  onCheckout,
}) => {
  return (
    <Modal transparent={true} animationType="slide" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Your Cart</Text>
          <ScrollView contentContainerStyle={styles.cartContainer}>
            {cartItems.map((item) => (
              <View key={item.dish.id} style={styles.cartItem}>
                <Image
                  source={{ uri: item.dish.imageUrl }}
                  style={styles.dishImage}
                />
                <View style={styles.itemDetails}>
                  <Text style={styles.dishName}>{item.dish.name}</Text>
                  <Text style={styles.dishPrice}>
                    ${item.dish.price.toFixed(2)}
                  </Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity
                      onPress={() =>
                        onUpdateQuantity(
                          item.dish.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      <Ionicons
                        name="remove-circle-outline"
                        size={24}
                        color="#5fa8ff"
                      />
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity
                      onPress={() =>
                        onUpdateQuantity(item.dish.id, item.quantity + 1)
                      }
                    >
                      <Ionicons
                        name="add-circle-outline"
                        size={24}
                        color="#5fa8ff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => onRemoveItem(item.dish.id)}>
                  <Ionicons name="trash-outline" size={24} color="#ff6b6b" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.footer}>
            <Text style={styles.total}>Total: ${totalPrice.toFixed(2)}</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={onCheckout}>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#1b243b",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e0e6f8",
    marginBottom: 10,
    textAlign: "center",
  },
  cartContainer: {
    paddingBottom: 10,
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#252d44",
    borderRadius: 10,
    padding: 10,
  },
  dishImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  dishName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e0e6f8",
  },
  dishPrice: {
    fontSize: 14,
    color: "#5fa8ff",
    marginVertical: 5,
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantity: {
    fontSize: 16,
    color: "#e0e6f8",
    marginHorizontal: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    borderTopColor: "#444",
    borderTopWidth: 1,
    paddingTop: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e0e6f8",
  },
  checkoutButton: {
    backgroundColor: "#5fa8ff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#444",
    borderRadius: 16,
    padding: 5,
  },
});

export default CartModal;
