import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../appContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reg, setReg] = useState(false);
  const router = useRouter();
  const { login, register } = useAuth();

  const handleAuth = async () => {
    try {
      if (reg) {
        await register(username, email, password);
        alert('Registration successful!');
      } else {
        await login(email, password);
        alert('Login successful!');
      }
      router.replace('/index');
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unexpected error occurred.');
      }
    }
  };
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://i.imgur.com/J7VFTIj.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{reg ? 'Create Account' : 'Welcome Back!'}</Text>
      <Text style={styles.subtitle}>
        {reg ? 'Join us and explore delicious meals!' : 'Log in to continue ordering.'}
      </Text>
      {reg && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#a0a8c0"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#a0a8c0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#a0a8c0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
        <Text style={styles.authButtonText}>{reg ? 'Register' : 'Log In'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.switchLink} onPress={() => setReg(!reg)}>
        <Text style={styles.switchLinkText}>
          {reg ? 'Already have an account? Log In' : 'Don’t have an account? Register'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12172b',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e0e6f8',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a8c0',
    marginBottom: 30,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1b243b',
    color: '#e0e6f8',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderColor: '#2a3b5c',
    borderWidth: 1,
  },
  authButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#3b5bdb',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  authButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  switchLink: {
    marginTop: 20,
  },
  switchLinkText: {
    color: '#5fa8ff',
    fontSize: 14,
    fontWeight: '500',
  },
});
