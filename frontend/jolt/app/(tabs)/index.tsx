// app/(tabs)/index.tsx
import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { restaurants } from '../../data/restaurants';

export default function RestaurantList() {
  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            {/* Navigate to dynamic route with pathname and params */}
            <Link href={{ pathname: "/(tabs)/[restaurantId]", params: { restaurantId: item.id } }}>


              <Text style={styles.itemText}>{item.name}</Text>
            </Link>
          </TouchableOpacity>
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
  item: {
    padding: 15,
    backgroundColor: '#3a3f47',
    marginVertical: 5,
    borderRadius: 5,
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
  },
});
