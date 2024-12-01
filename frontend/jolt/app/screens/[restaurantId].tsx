import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Text,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import RestaurantInfo from "../components/RestaurantInfo";
import DishList from "../components/DishList";
import DishModal from "../components/DishModal";
import CartBar from "../components/CartBar";
import CartModal from "../components/CartModal";
import BackButton from "../components/BackButton";
import { Restaurant } from "@/models/Restaurant";
import { Dish } from "@/models/Dish";

const RestaurantScreen: React.FC = () => {
  const { restaurantId } = useLocalSearchParams<{ restaurantId: string }>();
  const numericRestaurantId = Number(restaurantId);

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<{ dish: Dish; quantity: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [dishQuantity, setDishQuantity] = useState<number>(1);
  const [isCartModalVisible, setCartModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await fetch(
          `https://dao4gdmtoorfh8se.thomasott.fr/restaurants?includeDishes=true`
        );
        const data = await response.json();

        const restaurants = data.data || [];
        const foundRestaurant = restaurants.find(
          (r: Restaurant) => r.id === numericRestaurantId
        );

        if (foundRestaurant) {
          setRestaurant(foundRestaurant);
        } else {
          setError("Restaurant not found.");
        }
      } catch (err) {
        console.error("Error fetching restaurant:", err);
        setError("Failed to load restaurant details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [numericRestaurantId]);

  const handleDishSelect = (dish: Dish) => {
    setSelectedDish(dish);
    setDishQuantity(1);
  };

  const handleAddToCart = (dish: Dish, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.dish.id === dish.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.dish.id === dish.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { dish, quantity }];
      }
    });
    setSelectedDish(null);
  };

  const handleUpdateQuantity = (dishId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (dishId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.dish.id !== dishId));
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.dish.price * item.quantity,
    0
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#5fa8ff" />
        <Text style={styles.loaderText}>Loading restaurant...</Text>
      </View>
    );
  }

  if (error || !restaurant) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error || "Restaurant not found."}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton />
      <ScrollView>
        <RestaurantInfo
          restaurant={restaurant}
          onViewMap={() => console.log("Open map modal")}
        />
        <DishList dishes={restaurant.dishes} onDishSelect={handleDishSelect} />
      </ScrollView>
      <DishModal
        dish={selectedDish}
        quantity={dishQuantity}
        onClose={() => setSelectedDish(null)}
        onAddToCart={handleAddToCart}
        onQuantityChange={(newQuantity) => setDishQuantity(newQuantity)}
      />
      {cart.length > 0 && (
        <CartBar
          itemCount={cart.reduce((total, item) => total + item.quantity, 0)}
          totalPrice={totalPrice}
          onPress={() => setCartModalVisible(true)}
        />
      )}
      {isCartModalVisible && (
        <CartModal
          cartItems={cart}
          totalPrice={totalPrice}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveFromCart}
          onClose={() => setCartModalVisible(false)}
          onCheckout={() => console.log("Checkout")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12172b",
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
  errorText: {
    color: "#ff6b6b",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default RestaurantScreen;
