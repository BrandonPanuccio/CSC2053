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
    <ImageBackground source = {{
      uri: 'https://media.istockphoto.com/id/1365407803/photo/rear-of-car-driving-on-highway-in-the-forest-with-mountain-on-gloomy.jpg?b=1&s=170667a&w=0&k=20&c=ticnKGaDsmBnTu9_dXunGd1hRi1OOIcUdnAflJhKVHg=',
    }} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.userIcon}>
            <Pressable onPress={toggleMenu}>
              <Ionicons name="person-circle-outline" size={50} color="black" />
            </Pressable>
          </View>
          <View style={styles.calendarIcon}>
            <Pressable onPress={() => navigation.navigate('Calendar')}>
              <Ionicons name="calendar-outline" size={50} color="black" />
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    backgroundColor: 'black',
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
