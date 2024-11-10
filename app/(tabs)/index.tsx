import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AppContext } from '../../context/AppContext'

export default function HabitsPage() {
const [context, setContext] = React.useContext(AppContext)

  useEffect(() => {
    loadHabits()
  }, [])

  useEffect(() => {
    saveHabits()
  }, [context.habitsArr])

  const loadHabits = async () => {
    try {
      const savedHabits = await AsyncStorage.getItem('habits')
      if (savedHabits !== null) {
        setContext((prev) => ({ ...prev, habitsArr: JSON.parse(savedHabits) }))
      }
    } catch (error) {
      console.error("Error loading habits from AsyncStorage", error)
    }
  }

  const saveHabits = async () => {
    try {
      await AsyncStorage.setItem('habits', JSON.stringify(context.habitsArr))
    } catch (error) {
      console.error("Error saving habits to AsyncStorage", error)
    }
  }

  const handleChange = (text: string) => {
    setContext((prev) => ({ ...prev, inputValue: text }))
  }


  const deleteItem = (index: number) => {
    setContext((prev) => ({ ...prev, habitsArr: prev.habitsArr.filter((_, i) => i !== index) }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
        <View>
          {context.isActive && (
            <TextInput
            style={styles.habitItem}
            placeholder="What habit do you want to track?"
            placeholderTextColor="#888"
            value={context.inputValue}
            onChangeText={handleChange}
            />
          )}
          {context.habitsArr.map((habit, index) => (
            <TouchableOpacity style={styles.habitItem} key={index} onLongPress={() => deleteItem(index)}>
              <Text style={styles.habitText}>{habit}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#27292D',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 120, 
  },
  habitItem: {
    color: 'white',
    fontSize: 16,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
    backgroundColor: '#383A3E',
    marginBottom: 10,
    borderRadius: 8,
  },
  habitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  separator: {
    width: 2,
    height: 24,
    backgroundColor: '#3D3F42',
    borderRadius: 5,
    marginHorizontal: 16,
  },
  navBarContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
    marginBottom: 16,
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
  },
})
