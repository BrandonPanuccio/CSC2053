import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Calendar from './Calender';

const StartupScreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const navigateToScreen = (screenName) => {
    setMenuVisible(false);
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userIcon}>
          <Pressable onPress={toggleMenu}>
            <Ionicons name="person-circle-outline" size={50} color="#000000" />
          </Pressable>
        </View>
        <View style={styles.calendarIcon}>
          <Pressable onPress={() => navigation.navigate('Calendar')}>
            <Ionicons name="calendar-outline" size={50} color="#000000" />
          </Pressable>
        </View>
      </View>
      {menuVisible && (
        <View style={styles.menu}>
          <Pressable onPress={() => navigateToScreen('My Cars')}>
            <Text style={styles.menuItem}>My Cars</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'column',
    position: 'absolute',
    top: 40,
    right: 20,
    marginTop: 10,
  },
  userIcon: {
    marginTop: 10,
  },
  calendarIcon: {
    marginTop: 0,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'pink',
  },
  menu: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1,
  },
  menuItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1,
  },
});

export default StartupScreen;
