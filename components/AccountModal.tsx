import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Button, Input } from '@rneui/themed';
import { Session } from '@supabase/supabase-js';
import Avatar from '../components/Avatar';
import { supabase } from '../supabase';

interface AccountModalProps {
  visible: boolean;
  onClose: () => void;
  session: Session | null;
  loading: boolean;
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
  onUpdateProfile: (params: { username: string; website: string; avatar_url: string }) => void;
}

const AccountModal: React.FC<AccountModalProps> = ({
  visible,
  onClose,
  session,
  loading,
  avatarUrl,
  setAvatarUrl,
  onUpdateProfile,
}) => {
  const [username, setUsername] = useState<string>('');
  const [website, setWebsite] = useState<string>('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (session?.user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('username, website, avatar_url')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
        } else if (data) {
          setUsername(data.username);
          setWebsite(data.website);
          setAvatarUrl(data.avatar_url);
        }
      }
    };

    fetchUserProfile();
  }, [session]);

  // Username validation function
  const validateUsername = (username: string) => {
    const minLength = 4;
    const hasNoUppercase = username === username.toLowerCase();
    const hasNoSpaces = !/\s/.test(username);
    return username.length >= minLength && hasNoUppercase && hasNoSpaces;
  };

  // Update the profile and display name
  const handleUpdateProfile = async () => {
    if (!validateUsername(username)) {
      Alert.alert(
        'Invalid username', 
        'Username must be at least 4 characters long, contain no capital letters, and have no spaces.'
      );
      return;
    }

    await onUpdateProfile({ username, website, avatar_url: avatarUrl });
    const { error } = await supabase.auth.updateUser({
      data: {
        displayName: username,
      },
    });

    if (error) {
      console.error('Error updating display name:', error);
    } else {
      Alert.alert('Success', 'Profile updated successfully');
      onClose(); // Close the modal after successful update
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Account Settings</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <View style={styles.avatarContainer}>
            <Avatar
              size={200}
              url={avatarUrl}
              onUpload={async (url: string) => {
                setAvatarUrl(url);
                onUpdateProfile({ username, website, avatar_url: url });
              }}
            />
          </View>

          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Input 
              label="Email" 
              value={session?.user?.email} 
              disabled 
              inputContainerStyle={styles.input}
            />
          </View>

          <View style={styles.verticallySpaced}>
            <Input 
              label="Username" 
              value={username} 
              onChangeText={setUsername}
              inputContainerStyle={styles.input}
              placeholder="Enter username"
            />
          </View>

          <View style={styles.verticallySpaced}>
            <Input 
              label="Website" 
              value={website} 
              onChangeText={setWebsite}
              inputContainerStyle={styles.input}
              placeholder="Enter website"
            />
          </View>

          <View style={[styles.verticallySpaced, styles.mt20]}>
            <Button
              title={loading ? 'Loading ...' : 'Update Profile'}
              onPress={handleUpdateProfile}
              disabled={loading}
              buttonStyle={styles.updateButton}
            />
          </View>

          <View style={styles.verticallySpaced}>
            <Button 
              title="Sign Out" 
              onPress={() => supabase.auth.signOut()} 
              buttonStyle={styles.signOutButton}
              type="outline"
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    backgroundColor: '#f8f8f8',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
  },
  mt20: {
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#e1e1e1',
  },
  updateButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
  },
  signOutButton: {
    borderRadius: 8,
    padding: 12,
    borderColor: '#ff4444',
    marginTop: 12,
  },
});

export default AccountModal;