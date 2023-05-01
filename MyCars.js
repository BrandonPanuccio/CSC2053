import React, { useState } from 'react';
import { Button, TextInput, StyleSheet, Text, View, FlatList } from 'react-native';

export default function MyCars({ navigation }) {
  const [cars, setCars] = useState([]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.itemName}>{item.car}</Text>
        <Text style={styles.itemDesc}>{item.description}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text>No cars yet!</Text>}
      />
      <Button
        title="Add Car"
        onPress={() => {
          navigation.navigate('Add Car', { onAddCar: (newCar) => setCars([...cars, newCar]) });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingBottom: 50,
  },
  listItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemDesc: {
    fontSize: 14,
    color: '#444',
  },
});
