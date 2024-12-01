import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { withAuth } from '../withAuth';
import { Ionicons } from '@expo/vector-icons';

interface Restaurant {
  id: number;
  name: string;
  address: string;
  cost: number;
  description: string;
  rating: number;
  imageUrl: string;
  dishes: Dish[];
}

interface Dish {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

interface CartItem {
  dish: Dish;
  quantity: number;
}

function RestaurantMenu() {
  const { restaurantId } = useLocalSearchParams();
  const numericRestaurantId = Number(restaurantId);

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [dishQuantity, setDishQuantity] = useState<number>(1);
  const [isCartModalVisible, setCartModalVisible] = useState(false);
  const [isMapModalVisible, setMapModalVisible] = useState(false);

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
          setError('Restaurant not found.');
        }
      } catch (err) {
        console.error('Error fetching restaurant:', err);
        setError('Failed to load restaurant details.');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, [numericRestaurantId]);

  const addToCart = (dish: Dish, quantity: number) => {
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
    setDishQuantity(1);
  };

  const updateCartItemQuantity = (dishId: number, quantity: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.dish.id === dishId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (dishId: number) => {
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
        <Text style={styles.loaderText}>Chargement du restaurant...</Text>
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
      {/* Restaurant Info */}
      <ScrollView>
        <Image source={{ uri: restaurant?.imageUrl }} style={styles.headerImage} />
        <View style={styles.restaurantInfo}>
          <Text style={styles.restaurantName}>{restaurant?.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{restaurant?.rating}</Text>
            <Text style={styles.costText}>
              {' • '}{'$'.repeat(restaurant?.cost || 1)}
            </Text>
          </View>
          <Text style={styles.restaurantDescription}>{restaurant?.description}</Text>
          <TouchableOpacity
            style={styles.addressContainer}
            onPress={() => setMapModalVisible(true)}
          >
            <Ionicons name="location-outline" size={16} color="#5fa8ff" />
            <Text style={styles.addressText}>{restaurant?.address}</Text>
          </TouchableOpacity>
        </View>

        {/* Dishes List */}
        <View style={styles.dishesContainer}>
          {restaurant?.dishes.map((dish) => (
            <TouchableOpacity
              key={dish.id}
              style={styles.dishCard}
              onPress={() => {
                setSelectedDish(dish);
                setDishQuantity(1);
              }}
            >
              <View style={styles.dishInfo}>
                <Text style={styles.dishName}>{dish.name}</Text>
                <Text style={styles.dishPrice}>${dish.price.toFixed(2)}</Text>
                <Text style={styles.dishDescription} numberOfLines={2}>
                  {dish.description}
                </Text>
              </View>
              {dish.imageUrl && (
                <Image source={{ uri: dish.imageUrl }} style={styles.dishImage} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Dish Modal */}
      {selectedDish && (
        <Modal transparent={true} animationType="slide" visible={!!selectedDish}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <ScrollView>
                {selectedDish.imageUrl && (
                  <Image
                    source={{ uri: selectedDish.imageUrl }}
                    style={styles.modalImage}
                  />
                )}
                <Text style={styles.modalDishName}>{selectedDish.name}</Text>
                <Text style={styles.modalDishPrice}>
                  ${selectedDish.price.toFixed(2)}
                </Text>
                <Text style={styles.modalDishDescription}>
                  {selectedDish.description}
                </Text>

                {/* Quantity Selector */}
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      setDishQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                  >
                    <Ionicons name="remove-circle-outline" size={32} color="#5fa8ff" />
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{dishQuantity}</Text>
                  <TouchableOpacity
                    onPress={() => setDishQuantity((prev) => prev + 1)}
                  >
                    <Ionicons name="add-circle-outline" size={32} color="#5fa8ff" />
                  </TouchableOpacity>
                </View>
              </ScrollView>

              {/* Modal Buttons */}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  addToCart(selectedDish, dishQuantity);
                  setSelectedDish(null);
                }}
              >
                <Text style={styles.addButtonText}>Ajouter au panier</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedDish(null)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Cart Bar */}
      {cart.length > 0 && (
        <TouchableOpacity style={styles.cartBar} onPress={() => setCartModalVisible(true)}>
          <Text style={styles.cartText}>
            Voir le panier ({cart.length} items) - ${totalPrice.toFixed(2)}
          </Text>
        </TouchableOpacity>
      )}

      {/* Cart Modal */}
      {isCartModalVisible && (
        <Modal transparent={true} animationType="slide" visible={isCartModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.cartModalContent}>
              <ScrollView>
                {cart.map((item) => (
                  <View key={item.dish.id} style={styles.cartItem}>
                    {item.dish.imageUrl && (
                      <Image
                        source={{ uri: item.dish.imageUrl }}
                        style={styles.cartItemImage}
                      />
                    )}
                    <View style={styles.cartItemInfo}>
                      <Text style={styles.cartItemName}>{item.dish.name}</Text>
                      <Text style={styles.cartItemPrice}>
                        ${item.dish.price.toFixed(2)} x {item.quantity}
                      </Text>
                    </View>
                    {/* Quantity Selector */}
                    <View style={styles.cartQuantityContainer}>
                      <TouchableOpacity
                        onPress={() =>
                          updateCartItemQuantity(
                            item.dish.id,
                            item.quantity > 1 ? item.quantity - 1 : 1
                          )
                        }
                      >
                        <Ionicons
                          name="remove-circle-outline"
                          size={24}
                          color="#5fa8ff"
                        />
                      </TouchableOpacity>
                      <Text style={styles.cartQuantityText}>{item.quantity}</Text>
                      <TouchableOpacity
                        onPress={() =>
                          updateCartItemQuantity(item.dish.id, item.quantity + 1)
                        }
                      >
                        <Ionicons name="add-circle-outline" size={24} color="#5fa8ff" />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(item.dish.id)}>
                      <Ionicons name="trash-bin" size={24} color="#ff6b6b" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>

              {/* Cart Footer */}
              <View style={styles.cartFooter}>
                <Text style={styles.cartTotal}>
                  Total: ${totalPrice.toFixed(2)}
                </Text>
                <TouchableOpacity style={styles.checkoutButton}>
                  <Text style={styles.checkoutButtonText}>Passer la commande</Text>
                </TouchableOpacity>
              </View>

              {/* Close Cart Modal */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setCartModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Map Modal */}
      {isMapModalVisible && (
        <Modal transparent={true} animationType="slide" visible={isMapModalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.mapModalContent}>
              {/* Placeholder for Map */}
              <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>Carte du restaurant</Text>
              </View>

              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setMapModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12172b',
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: '#12172b',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderText: {
    marginTop: 10,
    color: '#a0a8c0',
    fontSize: 16,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  headerImage: {
    width: '100%',
    height: 200,
  },
  restaurantInfo: {
    padding: 15,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e0e6f8',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  ratingText: {
    color: '#e0e6f8',
    fontSize: 16,
    marginLeft: 5,
  },
  costText: {
    color: '#a0a8c0',
    fontSize: 16,
    marginLeft: 5,
  },
  restaurantDescription: {
    fontSize: 14,
    color: '#a0a8c0',
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressText: {
    color: '#5fa8ff',
    fontSize: 14,
    marginLeft: 5,
  },
  dishesContainer: {
    paddingHorizontal: 15,
  },
  dishCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1b243b',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  dishInfo: {
    flex: 1,
    marginRight: 10,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e0e6f8',
    marginBottom: 5,
  },
  dishPrice: {
    fontSize: 16,
    color: '#5fa8ff',
    marginBottom: 5,
  },
  dishDescription: {
    fontSize: 14,
    color: '#a0a8c0',
  },
  dishImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1b243b',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  modalDishName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e0e6f8',
    marginBottom: 10,
  },
  modalDishPrice: {
    fontSize: 20,
    color: '#5fa8ff',
    marginBottom: 10,
  },
  modalDishDescription: {
    fontSize: 16,
    color: '#a0a8c0',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  quantityText: {
    fontSize: 20,
    color: '#e0e6f8',
    marginHorizontal: 15,
  },
  addButton: {
    backgroundColor: '#3b5bdb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#444',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cartBar: {
    backgroundColor: '#3b5bdb',
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  cartText: {
    color: '#fff',
    fontSize: 16,
  },
  cartModalContent: {
    backgroundColor: '#1b243b',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  cartItemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  cartItemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    color: '#e0e6f8',
    marginBottom: 5,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#a0a8c0',
  },
  cartQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  cartQuantityText: {
    fontSize: 16,
    color: '#e0e6f8',
    marginHorizontal: 8,
  },
  cartFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  cartTotal: {
    fontSize: 18,
    color: '#e0e6f8',
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#5fa8ff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  mapModalContent: {
    backgroundColor: '#1b243b',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    alignItems: 'center',
  },
  mapPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#444',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mapPlaceholderText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default withAuth(RestaurantMenu);
