// app/(tabs)/[restaurantId].tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { restaurants } from '../../data/restaurants';
import { menuItems } from '../../data/menuItems';
import { MenuItem } from '../../models/MenuItem';

export default function RestaurantMenu() {
  const { restaurantId } = useLocalSearchParams();  // Retrieve the dynamic parameter
  
  // Convert restaurantId to a number for comparison
  const numericRestaurantId = Number(restaurantId);

  // Find the restaurant details by ID
  const restaurant = restaurants.find(r => r.id === numericRestaurantId);

  // Filter menu items that belong to this restaurant
  const restaurantMenuItems: MenuItem[] = menuItems.filter(
    item => item.restaurantId === numericRestaurantId
  );

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
            <Text style={styles.itemPrice}>{item.price}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#bbb',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#bbb',
    marginBottom: 10,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomColor: '#444',
    borderBottomWidth: 1,
  },
  itemName: {
    color: '#fff',
    fontSize: 16,
  },
  itemPrice: {
    color: '#bbb',
    fontSize: 16,
  },
});
