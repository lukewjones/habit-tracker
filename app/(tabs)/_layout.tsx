import { Tabs } from 'expo-router';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import CustomTabBar from '../../components/CustomTabBar';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { JSX } from 'react';

export default function TabsLayout() {
  return (
    <>
      <TouchableOpacity 
        style={styles.floatingButton}
        onPress={() => router.push('/modal')}
      >
        <Text style={styles.buttonText}>Account</Text>
      </TouchableOpacity>

      <Tabs tabBar={(props: JSX.IntrinsicAttributes & BottomTabBarProps) => <CustomTabBar {...props} />}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="social"
          options={{
            title: 'Social',
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    top: 50,
    right: 15,
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  buttonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '500',
  },
}); 