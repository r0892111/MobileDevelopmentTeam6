// app/index.tsx
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';

// Importing the mock data and model
import { restaurants } from '../../data/mockRestaurants';
import { Restaurant } from '../../models/restaurants';

// Importing the RestaurantCard component
import RestaurantCard from '../../components/restaurantCard';

const Index: React.FC = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <RestaurantCard restaurant={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
  },
});

export default Index;
