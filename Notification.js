import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default function MaintenanceScreen() {
  const [lastMaintenanceDate, setLastMaintenanceDate] = useState(null);
  const [milesPerWeek, setMilesPerWeek] = useState(null);
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState(null);

  const calculateNextMaintenanceDate = () => {
    // Calculate the next expected maintenance date based on the user input
    const milesPerYear = milesPerWeek * 52;
    const nextMaintenanceMileage = parseInt(lastMaintenanceDate) + 5000; // Assuming 5,000 miles between inspections
    const weeksUntilNextMaintenance = Math.ceil(nextMaintenanceMileage / milesPerYear * 52);
    const nextMaintenanceDate = new Date();
    nextMaintenanceDate.setDate(nextMaintenanceDate.getDate() + weeksUntilNextMaintenance * 7);
    setNextMaintenanceDate(nextMaintenanceDate.toDateString());

    // Schedule a daily push notification to remind the user of the next expected maintenance date
    scheduleDailyNotification(nextMaintenanceDate);
  };

  const scheduleDailyNotification = async (notificationDate) => {
    // Request permission to send push notifications (if not already granted)
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push notification permission');
      return;
    }

    // Schedule the daily push notification
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'Maintenance Reminder',
        body: `Your next maintenance is due on ${notificationDate.toDateString()}`,
        data: { data: 'goes here' },
      },
      trigger: { hour: 9, minute: 0, repeats: true }, // Send the notification every day at 9am
    });
  };

  return (
    <View>
      <Text>Enter your last maintenance date (in miles):</Text>
      <TextInput
        value={lastMaintenanceDate}
        onChangeText={setLastMaintenanceDate}
        keyboardType="numeric"
        placeholder="Last maintenance date"
        style={{ borderWidth: 1, borderColor: 'black', padding: 10, marginBottom: 10 }}
      />
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
    </View>
  );
}
