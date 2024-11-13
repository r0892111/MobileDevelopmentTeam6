// components/RestaurantCard.tsx
import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { Restaurant } from '../models/Restaurant';

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={styles.description}>{restaurant.description}</Text>
        <Text style={styles.rating}>Rating: {restaurant.rating}</Text>
        <Text style={styles.priceLevel}>{restaurant.priceLevel}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#333',
    margin: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
  },
  info: {
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    color: '#bbb',
  },
  rating: {
    color: '#ffd700',
  },
  priceLevel: {
    color: '#fff',
  },
});

export default RestaurantCard;
