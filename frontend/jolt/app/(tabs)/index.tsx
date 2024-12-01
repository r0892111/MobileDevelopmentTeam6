import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { withAuth } from "../withAuth";

interface Restaurant {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  rating: number;
  cost: number;
}

function RestaurantList() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch(
          "https://dao4gdmtoorfh8se.thomasott.fr/restaurants"
        );
        const data = await response.json();
        const fetchedRestaurants: Restaurant[] = data.data;
        setRestaurants(fetchedRestaurants);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load restaurants");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5fa8ff" />
        <Text style={styles.loaderText}>Loading restaurants...</Text>
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
          <TouchableOpacity style={styles.card}>
            <Link
              href={{
                pathname: "/screens/[restaurantId]",
                params: { restaurantId: item.id },
              }}
              style={styles.link}
            >
              <Image
                source={{ uri: item.imageUrl }}
                style={styles.restaurantImage}
              />
              <View style={styles.cardContent}>
                <Text style={styles.restaurantName}>{item.name}</Text>
                <View style={styles.detailsRow}>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                  <Text style={styles.cost}>
                    {Array.from({ length: item.cost }, () => "$").join("")}
                  </Text>
                </View>
                <Text style={styles.description} numberOfLines={2}>
                  {item.description}
                </Text>
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
    backgroundColor: "#12172b",
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#12172b",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderText: {
    marginTop: 10,
    color: "#a0a8c0",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#1b243b",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
  },
  restaurantImage: {
    width: "100%",
    height: 150,
  },
  cardContent: {
    padding: 15,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e0e6f8",
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  rating: {
    color: "#ffd700",
    fontSize: 14,
    fontWeight: "600",
  },
  cost: {
    color: "#5fa8ff",
    fontSize: 14,
    fontWeight: "600",
  },
  description: {
    fontSize: 14,
    color: "#a0a8c0",
  },
  errorText: {
    color: "#ff6b6b",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default withAuth(RestaurantList);
