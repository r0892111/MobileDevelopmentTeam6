import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useAuth } from '../appContext';

export default function ProfileScreen() {
    const { username, logout } = useAuth();

    const handleLogout = () => {
        logout();
        Alert.alert("Logged out", "You have been disconnected.");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.username}>Hello {username}</Text>
            <View style={[styles.buttonContainer, { marginTop: 15 }]}>
                <Button
                    title="Disconnect"
                    onPress={handleLogout}
                    color="#FF6347"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#12172b",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      },
    text: {
        color: '#FFFFFF',
        fontSize: 28,
        paddingHorizontal: 8,
        fontWeight: 'bold',
    },
    username: {
        color: '#FFFFFF',
        fontSize: 20,
        marginTop: 10,
        marginBottom: 20,
    },
    buttonContainer: {
        marginTop: 20,
        width: '100%',
        borderRadius: 5,
    },
});
