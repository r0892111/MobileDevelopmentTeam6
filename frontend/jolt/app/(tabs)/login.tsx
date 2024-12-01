import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
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
      <Text style={styles.title}>
        {reg ? 'Register for a new account' : 'Login to your account to order'}
      </Text>
      {reg === true && (
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#b0b0b0"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#b0b0b0"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#b0b0b0"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.switchbtn} onPress={() => setReg(!reg)}>
          <Text style={styles.buttonText}>
            {reg ? 'Switch to Login' : 'Switch to Register'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logregbtn} onPress={handleAuth}>
          <Text style={styles.buttonText}>
            {reg ? 'Register' : 'Log In'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#3a3f47',
    color: '#fff',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 15,
  },
  logregbtn: {
    flex: 1,
    backgroundColor: '#008000',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchbtn: {
    flex: 1,
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
