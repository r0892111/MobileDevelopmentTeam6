import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { MenuItem } from '../../models/MenuItem';
import { CartItem } from '../../models/CartItem';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  cost: number;
  description: string;
  rating: number;
  imageUrl: string;
  dishes: Dish[]; // Assuming dishes is an array of another type
}

interface Dish {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function RestaurantMenu() {
  const { restaurantId } = useLocalSearchParams(); // Retrieve the dynamic parameter
  const numericRestaurantId = Number(restaurantId); // Convert restaurantId to a number for comparison

  // State for menu items, loading, and error
  const [restaurantMenuItems, setRestaurantMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const fetchRestaurantMenu = async (restaurantId: number) => {
      try {
        const url = `https://dao4gdmtoorfh8se.thomasott.fr/restaurants?includeDishes=true`;
    
        const response = await fetch(url);
        const data = await response.json();
    
        // Now access data.data to get the array of restaurants
        const restaurants = data.data || [];

        // Find the restaurant by id
        const restaurant = restaurants.find((r: Restaurant) => r.id === restaurantId);
        if (restaurant) {
          const menuItems: MenuItem[] = restaurant.dishes.map((dish: Dish) => ({
            ...dish,
            restaurantId: restaurant.id,
          }));
          setRestaurantMenuItems(menuItems);
        } else {
          setError('Restaurant not found.');
        }
      } catch (err) {
        console.error('Error fetching restaurant menu:', err);
        setError('Failed to load menu items.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRestaurantMenu(numericRestaurantId);
  }, [numericRestaurantId]);

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const totalPrice = cart.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0
  );

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);

      if (!existingItem) return prevCart;

      if (existingItem.quantity === 1) {
        return prevCart.filter((cartItem) => cartItem.id !== itemId);
      }

      return prevCart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    });
  };

  const handleCheckout = () => {
    console.log('Proceeding to checkout:', cart);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restaurant Menu</Text>
      <FlatList
        data={restaurantMenuItems}  // Display dishes for the selected restaurant
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
        <FlatList
          data={cart}
          keyExtractor={(cartItem) => cartItem.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.cartItemContainer}>
              <Text style={styles.cartItem}>
                {item.name} - {item.quantity} x ${item.price.toFixed(2)} ={' '}
                ${(item.quantity * item.price).toFixed(2)}
              </Text>
              <Button
                color="red"
                title="Remove"
                onPress={() => removeFromCart(item.id)}
              />
            </View>
          )}
        />
        <Text style={styles.cartTotal}>Total: ${totalPrice.toFixed(2)}</Text>

        {totalPrice > 0 && (
          <Button title="Checkout" onPress={handleCheckout} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  cartItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#333',
    borderRadius: 5,
    padding: 10,
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
  errorText: {
    color: '#ff0000',
    fontSize: 18,
    textAlign: 'center',
  },
});
