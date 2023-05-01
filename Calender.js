import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState, useRef} from 'react';
import { StyleSheet, Text, Button, TextInput, View, ImageBackground, TouchableOpacity } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import storage from "@react-native-async-storage/async-storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
});

export default function Calendar() {
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
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
        seconds: 5
        
      }
      
    });
  }

  return (
    
    <View style={styles.container}>
      
      <TextInput
        value={milesPerWeek}
        onChangeText={setMilesPerWeek}
        keyboardType="numeric"
        placeholder="HOW MANY MILES DO YOU DRIVE PER WEEK?"
        style={{ borderWidth: 1, borderColor: 'black', padding: 10, marginBottom: 10 }}
      />
      <Button title="Calculate Next Maintenance Date" onPress={calculateNextMaintenanceDate} />
      {nextMaintenanceDate && (
        <Text style={{ marginTop: 20, marginBottom:20}}>Next Maintenance Date: {nextMaintenanceDate}</Text>
      )}

<TouchableOpacity onPress={onClick}>
        <Text style={{backgroundColor: 'black', padding: 20, marginBottom:100, color: 'white'}}>Click me to schedule a notification!</Text>
      </TouchableOpacity>
    

      <StatusBar style="auto" />
    </View>
    
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

