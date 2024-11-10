import React, { useState } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../../supabase';
import { Input } from '@rneui/themed';
import { router } from 'expo-router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);

  const validateUsername = (username: string) => {
    const minLength = 4;
    const hasNoUppercase = username === username.toLowerCase();
    const hasNoSpaces = !/\s/.test(username);
    return username.length >= minLength && hasNoUppercase && hasNoSpaces;
  };

  async function signUpWithEmail() {
    if (!validateUsername(displayName)) {
      Alert.alert(
        'Invalid username', 
        'Username must be at least 4 characters long, contain no capital letters, and have no spaces.'
      );
      return;
    }

    setLoading(true);
    
    const { data: { user }, error: signupError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          displayName,
        },
      },
    });

    if (signupError) {
      Alert.alert('Error', signupError.message);
      setLoading(false);
      return;
    }

    Alert.alert('Success', 'Please check your inbox for email verification!');
    router.push('/auth/sign-in');
    setLoading(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.mt20}>
        <Input
          onChangeText={setDisplayName}
          value={displayName}
          placeholder="Username"
          autoCapitalize="none"
          style={styles.input}
          inputContainerStyle={{ borderBottomWidth: 0, padding: 0 }}
        />
      </View>
      <Input
        onChangeText={setEmail}
        value={email}
        placeholder="email@address.com"
        autoCapitalize="none"
        style={styles.input}
        inputContainerStyle={{ borderBottomWidth: 0, width: '100%', margin: 0, padding: 0 }}
      />
      <Input
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        placeholder="Password"
        autoCapitalize="none"
        style={styles.input}
        inputContainerStyle={{ borderBottomWidth: 0, width: '100%' }}
      />
      <View style={styles.mv10}>
        <TouchableOpacity 
          style={styles.button} 
          disabled={loading} 
          onPress={signUpWithEmail}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Loading...' : 'Sign Up'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>Been here before? </Text>
        <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
          <Text style={styles.linkText}>Sign in here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    padding: 12,
    flex: 1,
    backgroundColor: '#27292D',
  },
  input: {
    color: 'white',
    fontSize: 16,
    padding: 16,
    backgroundColor: '#383A3E',
    marginBottom: 10,
    borderRadius: 8,
    height: 56,
    width: '100%', 
  },
  mv10: {
    marginVertical: 10
  },
  button: {
    backgroundColor: '#84BEE6',
    height: 56,
    justifyContent: 'center',
    alignSelf: 'center', 
    width: '100%', 
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mt20: {
    marginTop: 20,
  },
  promptContainer: {
    flexDirection: 'row',  
    alignItems: 'center',  
    justifyContent: 'center',
    marginTop: 20,
  },
  promptText: {
    color: 'white',
  },
  linkText: {
    color: '#84BEE6',
  },
});


