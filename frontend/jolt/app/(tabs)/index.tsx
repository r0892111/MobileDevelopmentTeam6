import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';

interface Restaurant {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  cost: number;
}

export default function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('https://dao4gdmtoorfh8se.thomasott.fr/restaurants');
        const data = await response.json();

        // Access the "data" field from the response
        const fetchedRestaurants: Restaurant[] = data.data;  // Now correctly accessing the array of restaurants

        setRestaurants(fetchedRestaurants);
      } catch (err) {
        console.error("Error fetching data: ", err);
        setError('Failed to load restaurants');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

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
      <FlatList
        data={restaurants}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.item}>
            <Link
              href={{
                pathname: "/(tabs)/[restaurantId]",
                params: { restaurantId: item.id },
              }}
              style={styles.link}
            >
              <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <View style={styles.itemTextContainer}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                </View>
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
  errorText: {
    color: '#ff0000',
    fontSize: 18,
    textAlign: 'center',
  },
});
