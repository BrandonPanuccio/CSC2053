import React, { useState } from 'react';
import { Button, TextInput, StyleSheet, Text, View } from 'react-native';

export default function AddCars({ navigation }) {
  //store what's entered in the TextInput in these state variables
    const [car, setCar] = useState("");
    const [definition, setDefinition] = useState("");

    return (
       <View style={styles.container}>
          <TextInput
            style={{height: 40,
            borderColor: 'gray',
            borderWidth: 1}}
            placeholder="Enter Car"
            /* when input is entered update the state variable, car */
            onChangeText={(newText)=>{
              setCar(newText);
            }}
         
          />
          <TextInput
            style={{height: 40,
            borderColor: 'gray',
            borderWidth: 1}}
            placeholder="Enter Definition"
            /* when input is entered update the state variable, definition */
            onChangeText={(newText)=>{
              setDefinition(newText);
            }}
        
          />
          <Button title="Add Cars" onPress={()=>{
            navigation.navigate("MyCars", {newCar: car, newDefinition: definition})
          }}/>
       </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50,
      paddingBottom: 50,
    },
    itemName: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    itemDesc: {
      padding: 10,
      fontSize: 10,
      height: 44,
    },
    border: {
      borderWidth: 4,
      borderColor: "blue",
    },
});