import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Dish } from '../types/Dish';

interface DishListProps {
  dishes: Dish[];
  onDishSelect: (dish: Dish) => void;
}

const DishList: React.FC<DishListProps> = ({ dishes, onDishSelect }) => {
  return (
    <View style={styles.container}>
      {dishes.map((dish) => (
        <TouchableOpacity
          key={dish.id}
          style={styles.card}
          onPress={() => onDishSelect(dish)}
        >
          <View style={styles.info}>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.price}>${dish.price.toFixed(2)}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {dish.description}
            </Text>
          </View>
          {dish.imageUrl && (
            <Image source={{ uri: dish.imageUrl }} style={styles.image} />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1b243b',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  info: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e0e6f8',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    color: '#5fa8ff',
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#a0a8c0',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});

export default DishList;
