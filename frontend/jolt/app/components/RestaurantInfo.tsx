import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Restaurant } from '@/models/Restaurant';

interface RestaurantInfoProps {
  restaurant: Restaurant;
  onViewMap: () => void;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ restaurant, onViewMap }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: restaurant.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <View style={styles.details}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.rating}>{restaurant.rating}</Text>
          <Text style={styles.cost}>{' • '}{'$'.repeat(restaurant.cost)}</Text>
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
        <TouchableOpacity style={styles.address} onPress={onViewMap}>
          <Ionicons name="location-outline" size={16} color="#5fa8ff" />
          <Text style={styles.addressText}>{restaurant.address}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 200,
  },
  info: {
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e0e6f8',
    marginBottom: 5,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  rating: {
    color: '#e0e6f8',
    fontSize: 16,
    marginLeft: 5,
  },
  cost: {
    color: '#a0a8c0',
    fontSize: 16,
    marginLeft: 5,
  },
  description: {
    fontSize: 14,
    color: '#a0a8c0',
    marginBottom: 10,
  },
  address: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: '#5fa8ff',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default RestaurantInfo;
