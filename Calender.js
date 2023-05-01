import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, Button, TextInput, View, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import storage from "@react-native-async-storage/async-storage";

//1. import the library
//2. get permission
//3. do push notifications on button click
//4. schedule push notifications

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export default function App() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState(null);
  const [milesPerWeek, setMilesPerWeek] = useState(null);
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState(null);

  const calculateNextMaintenanceDate = () => {
    // Calculate the next expected maintenance date based on the user input
    const milesPerYear = milesPerWeek * 52;
    const nextMaintenanceMileage = 5000; // Assuming 5,000 miles between inspections
    const weeksUntilNextMaintenance = Math.ceil(nextMaintenanceMileage / milesPerYear * 52);
    const nextMaintenanceDate = new Date();
    nextMaintenanceDate.setDate(nextMaintenanceDate.getDate() + weeksUntilNextMaintenance * 7);
    setNextMaintenanceDate(nextMaintenanceDate.toDateString());

    
  };

  useEffect(() => {
    const getPermission = async () => {
      if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Enable push notifications to use the app!');
            await storage.setItem('expopushtoken', "");
            return;
          }
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          await storage.setItem('expopushtoken', token);
      } else {
        alert('Must use physical device for Push Notifications');
      }

        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
    }

    getPermission();

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {});

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const onClick = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Car Cat",
        body: 'You have a maintenance coming up!',
        data: { data: "data goes here" }
      },
      trigger: {
        seconds: 3
      }
    });
  }

  return (
    <ImageBackground source = {{
      uri: 'https://bergen.edu/wp-content/uploads/Academic-Calendar-header.jpg',
    }} style={styles.backgroundImage}>
    <View style={styles.container}>
      <TouchableOpacity onPress={onClick}>
        <Text style={{backgroundColor: 'red', padding: 10, color: 'white'}}>Click me to schedule a notification!</Text>
      </TouchableOpacity>
     
      <Text>Enter your miles per week:</Text>
      <TextInput
        value={milesPerWeek}
        onChangeText={setMilesPerWeek}
        keyboardType="numeric"
        placeholder="Miles per week"
        style={{ borderWidth: 1, borderColor: 'black', padding: 10, marginBottom: 10 }}
      />
      <Button title="Calculate Next Maintenance Date" onPress={calculateNextMaintenanceDate} />
      {nextMaintenanceDate && (
        <Text style={{ marginTop: 10 }}>Next Maintenance Date: {nextMaintenanceDate}</Text>
      )}
    

      <StatusBar style="auto" />
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
