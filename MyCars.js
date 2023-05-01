import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

export default function AddCars ({ route, navigation }) {
    //dataSource contains the data we want rendered as a list
    //the dataSource should contain a unique key for each item in the array
    const dataSource = [
        
    ];    
    
    // dataSource should be a state variable since we are updating the list
    const [listData, setListData] = useState(dataSource);      

    // state variables must be updated in response to an action like a click
    // or in the useEffect hook.
    useEffect(()=> {
      console.log(route.params);
      if (route.params) {
        if (route.params.newCar != '') {
         setListData(listData.concat({key:'001',
         car: route.params.newCar, definition: route.params.newDefinition}));
        }
      }
      // adding the second parameter, route.params makes useEffect only get called
      // if there is a value in route.params
    },[route.params]);    
    
    return (
        <View style={styles.container}>
            <FlatList
            data={listData}
            /* use the extraData property if the list changes */
            extraData={listData}
            renderItem={({item}) => 
                <View style={styles.border}>
                <Text style={styles.itemName}>{item.car}</Text>
                <Text style={styles.itemDesc}>{item.definition}</Text>
                </View>
            } />
            <Button title="Add Cars" onPress={()=> {
              navigation.navigate("Add Cars");
            }} />
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
      borderWidth: 1,
      borderColor: "gray",
    },
});
  
