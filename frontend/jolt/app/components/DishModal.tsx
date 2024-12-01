import React from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Dish } from '../types/Dish';

interface DishModalProps {
  dish: Dish | null;
  quantity: number;
  onClose: () => void;
  onAddToCart: (dish: Dish, quantity: number) => void;
  onQuantityChange: (newQuantity: number) => void;
}

const DishModal: React.FC<DishModalProps> = ({
  dish,
  quantity,
  onClose,
  onAddToCart,
  onQuantityChange,
}) => {
  if (!dish) return null;

  return (
    <Modal transparent={true} animationType="slide" visible={!!dish}>
      <View style={styles.container}>
        <View style={styles.content}>
          <ScrollView>
            {dish.imageUrl && (
              <Image source={{ uri: dish.imageUrl }} style={styles.image} />
            )}
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.price}>${dish.price.toFixed(2)}</Text>
            <Text style={styles.description}>{dish.description}</Text>

            <View style={styles.quantityContainer}>
              <TouchableOpacity onPress={() => onQuantityChange(Math.max(1, quantity - 1))}>
                <Ionicons name="remove-circle-outline" size={32} color="#5fa8ff" />
              </TouchableOpacity>
              <Text style={styles.quantity}>{quantity}</Text>
              <TouchableOpacity onPress={() => onQuantityChange(quantity + 1)}>
                <Ionicons name="add-circle-outline" size={32} color="#5fa8ff" />
              </TouchableOpacity>
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => onAddToCart(dish, quantity)}
          >
            <Text style={styles.addButtonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#1b243b',
    borderRadius: 12,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e0e6f8',
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    color: '#5fa8ff',
    marginBottom: 10,
  },
  description: {
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
  quantity: {
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
});

export default DishModal;
