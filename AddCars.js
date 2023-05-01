import React, { useState } from 'react';
import { Button, TextInput, StyleSheet, Text, View } from 'react-native';

export default function AddCars({ navigation }) {
  //store what's entered in the TextInput in these state variables
    const [car, setCar] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");

    return (
       <View style={styles.container}>
          <TextInput
            style={{height: 40,
            borderColor: 'gray',
            borderWidth: 1}}
            placeholder="Enter Car"
            /* when input is entered update the state variable, word */
            onChangeText={(newText)=>{
              setCar(newText);
            }}
         
          />
          <TextInput
            style={{height: 40,
            borderColor: 'gray',
            borderWidth: 1}}
            placeholder="Enter Model"
            /* when input is entered update the state variable, definition */
            onChangeText={(newText)=>{
              setModel(newText);
            }}
        
          />

            <TextInput
            style={{height: 40,
            borderColor: 'gray',
            borderWidth: 1}}
            placeholder="Enter Year"
            /* when input is entered update the state variable, definition */
            onChangeText={(newText)=>{
              setYear(newText);
            }}
        
          />

          <Button title="Add Car" onPress={()=>{
            navigation.navigate("My Cars", {newCar: car, newModel: model, newYear: year})
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
  
