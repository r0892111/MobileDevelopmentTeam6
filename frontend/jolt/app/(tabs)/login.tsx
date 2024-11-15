import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [reg, setReg] = useState(false);

  const handleLogin = () => {
    if (reg) {
      console.log('Full Name:', fullName);
      console.log('Confirm Password:', confirmPassword);
    }
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const toggleRegistration = () => {
    setReg(!reg);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {reg ? 'Register for a new account!' : 'Login to your account to order!'}
      </Text>
      
      {reg && (
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          placeholderTextColor="#b0b0b0"
          value={fullName}
          onChangeText={setFullName}
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
      
      {reg && (
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#b0b0b0"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          autoCapitalize="none"
        />
      )}

      <View style={styles.buttonRow}>
      <TouchableOpacity style={styles.switchbtn} onPress={toggleRegistration}>
          <Text style={styles.buttonText}>{reg ? "Switch to Login" : "Switch to Register"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logregbtn} onPress={handleLogin}>
          <Text style={styles.buttonText}>{reg ? "Register" : "Log In"}</Text>
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
  },
  switchbtn:{
    flex: 1,
    backgroundColor: '#ff0000',
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
