import React from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
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
            <Link
              href={{
                pathname: "/(tabs)/[restaurantId]",
                params: { restaurantId: item.id },
              }}
              style={styles.link}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                {/* Left Side: Name and Description */}
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
                {/* Right Side: Rating and Cost */}
                <View style={styles.infoContainer}>
                  <Text style={styles.itemRating}>Rating: {item.rating}</Text>
                  <Text style={styles.itemCost}>Cost: ${item.cost}</Text>
                </View>
              </View>
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
    padding: 15,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3a3f47',
    marginVertical: 8,
    borderRadius: 8,
    padding: 10,
  },
  link: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTextContainer: {
    flex: 1,
  },
  itemName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDescription: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 5,
  },
  infoContainer: {
    alignItems: 'flex-end',
  },
  itemRating: {
    color: '#ffd700',
    fontSize: 14,
    marginBottom: 5,
  },
  itemCost: {
    color: '#00ff00',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
