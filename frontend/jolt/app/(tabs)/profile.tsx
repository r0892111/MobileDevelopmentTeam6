import React from 'react'; 
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useAuth } from '../appContext';

export default function ProfileScreen() {
    const { username, logout } = useAuth();

    // (need to alter to come to api or context)
    const orders = [
        { id: 1, item: 'Pizza Margherita', status: 'Delivered' },
        { id: 2, item: 'Burger & Fries', status: 'In Progress' },
        { id: 3, item: 'Spaghetti Carbonara', status: 'Delivered' }
    ];

    const handleLogout = () => {
        logout();
        Alert.alert("Logged out", "You have been disconnected.");
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Name */}
            <Text style={styles.username}>Hello, {username}!</Text>

            {/* Orders*/}
            <View style={styles.ordersSection}>
                <Text style={styles.ordersTitle}>Your Orders:</Text>
                {orders.length === 0 ? (
                    <Text style={styles.noOrdersText}>You don't have any orders yet.</Text>
                ) : (
                    orders.map(order => (
                        <View key={order.id} style={styles.orderItem}>
                            <Text style={styles.orderText}>{order.item}</Text>
                            <Text style={[styles.orderStatus, order.status === 'Delivered' ? styles.delivered : styles.inProgress]}>
                                {order.status}
                            </Text>
                        </View>
                    ))
                )}
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e2a47',  
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    username: {
        color: '#FFFFFF',
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 30,
        textAlign: 'center',
    },
    ordersSection: {
        width: '100%',
        backgroundColor: '#2b3a53',  
        padding: 15,
        borderRadius: 10,
        marginBottom: 30,
    },
    ordersTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 10,
    },
    orderItem: {
        backgroundColor: '#3b4b73',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
    },
    orderText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
    },
    orderStatus: {
        marginTop: 5,
        fontSize: 14,
        fontWeight: '400',
    },
    delivered: {
        color: '#32CD32',  
    },
    inProgress: {
        color: '#FFD700',  
    },
    noOrdersText: {
        color: '#A9A9A9',
        fontSize: 16,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#FF6347',  
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
});
