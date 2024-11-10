import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { AppContext } from '../context/AppContext';

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [context, setContext] = React.useContext(AppContext);

  const toggle = () => {
    if (state.index !== state.routes.findIndex(route => route.name === 'index')) {
      navigation.navigate('index');
    }
    setContext((prev) => ({ ...prev, isActive: true }));
  };

  const saveHabit = () => {
    if (context.inputValue) {
      setContext((prev) => ({ 
        ...prev, 
        habitsArr: [context.inputValue, ...prev.habitsArr],
        inputValue: '',
        isActive: false
      }));
    }
  };

  const cancelAddHabit = () => {
    setContext((prev) => ({ ...prev, inputValue: '', isActive: false }));
  };

  return (
    <View style={styles.container}>
      {context.isActive ? (
        <View style={styles.floatingNavBar}>
          <TouchableOpacity style={styles.button} onPress={saveHabit}>
            <Feather name="check" size={24} color="#84BEE6" />
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button} onPress={cancelAddHabit}>
            <Feather name="x" size={24} color="#84BEE6" />
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.floatingNavBar}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={index}
                onPress={onPress}
                style={styles.tabButton}
              >
                <Text style={[styles.tabButtonText, isFocused && styles.tabButtonTextFocused]}>
                  {typeof label === 'string' ? label : label({ focused: isFocused, color: '', position: 'below-icon', children: '' })}
                </Text>
              </TouchableOpacity>
            );
          })}
          <TouchableOpacity style={styles.addButton} onPress={toggle}>
            <Feather name="plus" size={24} color="#84BEE6" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
  },
  floatingNavBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18191AE6',
    borderRadius: 30,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
  },
  separator: {
    width: 2,
    height: 24,
    backgroundColor: '#3D3F42',
    borderRadius: 5,
    marginHorizontal: 16,
  },
  tabButton: {
    paddingHorizontal: 16,
  },
  tabButtonText: {
    color: '#696A6C',
    fontSize: 16,
  },
  tabButtonTextFocused: {
    color: '#84BEE6',
  },
  addButton: {
    marginLeft: 16,
  },
});
