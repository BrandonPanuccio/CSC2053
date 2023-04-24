import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
    
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1522708323590-79a0c3bdb7b3' }}
      style={styles.background}
      blurRadius={5}
    >


    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={toggleMenu}>
          <Ionicons name="person-circle-outline" size={50} color="#000000" />
        </Pressable>
      </View>
      <Text style={styles.logo}>Car Cat</Text>
      {menuVisible && (
        <View style={styles.menu}>
          <Pressable onPress={() => navigateToScreen('My Cars')}>
            <Text style={styles.menuItem}>My Cars</Text>
          </Pressable>
          <Pressable onPress={() => navigateToScreen('Add Cars')}>
            <Text style={styles.menuItem}>Add Cars</Text>
          </Pressable>
          <Pressable onPress={() => navigateToScreen('Calender')}>
            <Text style={styles.menuItem}>Calender</Text>
          </Pressable>
        </View>
      )}
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
      },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff'
  },
  header: {
    position: 'absolute',
    top: 40,
    right: 20,
    marginTop: 10
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'pink'
  },
  menu: {
    position: 'absolute',
    top: 70,
    right: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1
  },
  menuItem: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    zIndex: 1
  }
});

export default StartupScreen;
