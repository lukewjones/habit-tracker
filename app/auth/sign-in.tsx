import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { supabase } from '../../supabase';
import { Input } from '@rneui/themed';
import { router } from 'expo-router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      Alert.alert(error.message);
      setLoading(false);
      return;
    }
    
    // Call function to sync displayName with profile.username
    await syncDisplayNameWithProfile(user);

    setLoading(false);
  }

  async function syncDisplayNameWithProfile(user: any) {
    if (user) {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError.message);
        return;
      }

      // If username is not set, update it with displayName
      if (data && !data.username && user.user_metadata.displayName) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ username: user.user_metadata.displayName })
          .eq('id', user.id);

        if (updateError) {
          Alert.alert('Error updating profile username:', updateError.message);
        }
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.mt20}>
        <Input
          onChangeText={setEmail}
          value={email}
          placeholder="email@address.com"
          autoCapitalize="none"
          style={styles.input}
          inputContainerStyle={{borderBottomWidth: 0}}
        />
      </View>
      <View>
        <Input
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.input}
          inputContainerStyle={{borderBottomWidth: 0}}
        />
      </View>
      <TouchableOpacity style={styles.button} disabled={loading} onPress={signInWithEmail}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Sign In'}</Text>
      </TouchableOpacity>
      <View style={styles.promptContainer}>
        <Text style={styles.promptText}>First time here? </Text>
        <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
          <Text style={styles.linkText}>Sign up here</Text>
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
    borderBottomWidth: 1,
    borderColor: '#84BEE6'
  },
});