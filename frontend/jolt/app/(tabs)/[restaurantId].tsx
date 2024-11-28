import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { restaurants } from '../../data/restaurants';
import { MenuItemsData } from '../../data/menuItems';
import { MenuItem } from '../../models/MenuItem';
import { CartItem } from '../../models/CartItem';

export default function RestaurantMenu() {
  const { restaurantId } = useLocalSearchParams(); // Retrieve the dynamic parameter

  // Convert restaurantId to a number for comparison
  const numericRestaurantId = Number(restaurantId);

  // Find the restaurant details by ID
  const restaurant = restaurants.find(r => r.id === numericRestaurantId);

  // Filter menu items that belong to this restaurant
  const restaurantMenuItems: MenuItem[] = MenuItemsData.filter(
    item => item.restaurantId === numericRestaurantId
  );

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);

      if (existingItem) {
        // Update quantity if the item already exists
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      // Add new item to the cart
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const totalPrice = cart.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );

  const removeFromCart = (itemId: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === itemId);

      if (!existingItem) {
        return prevCart;
      }

      if (existingItem.quantity === 1) {
        // Remove the item if the quantity is 1
        return prevCart.filter(cartItem => cartItem.id !== itemId);
      }

      // Update quantity if the item already exists
      return prevCart.map(cartItem =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    });
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout:', cart);
  };

  if (!restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Restaurant not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.description}>{restaurant.description}</Text>
      <Text style={styles.subtitle}>Menu</Text>
      <FlatList
        data={restaurantMenuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            <Button title="Add to cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
      <View style={styles.cart}>
        <Text style={styles.cartTitle}>Cart</Text>
        <View style={styles.cartContent}>
          <FlatList
            data={cart}
            keyExtractor={(cartItem) => cartItem.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItemContainer}>
                <Text style={styles.cartItem}>
                  {item.name} - {item.quantity} x ${item.price.toFixed(2)} ={' '}
                  ${(item.quantity * item.price).toFixed(2)}
                </Text>
                <View style={styles.removebtn}>
                  <Button
                    color="red"
                    title="Remove"
                    onPress={() => removeFromCart(item.id)}
                  />
                </View>
              </View>
            )}
          />
        </View>
        <Text style={styles.cartTotal}>Total: ${totalPrice.toFixed(2)}</Text>

        {totalPrice > 0 && (
          <View>
            <Button title="Checkout" onPress={handleCheckout} />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cartContent: {
    maxHeight: 200, // Limit cart height
    overflow: 'hidden', // Clip content beyond the box
  },
  removebtn: {
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#1e1e2e',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#ffb74d',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#cfd8dc',
    marginBottom: 20,
    lineHeight: 22,
  },
  subtitle: {
    fontSize: 20,
    color: '#ffb74d',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingBottom: 5,
  },
  menuItem: {
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
  },
  itemName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    color: '#90caf9',
    fontSize: 16,
    marginVertical: 5,
  },
  cart: {
    marginTop: 20,
    paddingTop: 10,
    borderTopColor: '#444',
    borderTopWidth: 1,
  },
  cartTitle: {
    color: '#ffb74d',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    color: '#fff',
    fontSize: 16,
  },
  cartTotal: {
    color: '#ffb74d',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
});
