import {Notifications} from 'expo-notifications';
import React, {useState, useEffect} from 'react';
import {View, TextInput, Text} from 'react-native';

const [milesPerWeek, setMilesPerWeek] = useState(0);
<TextInput
  placeholder="Enter miles per week"
  keyboardType="numeric"
  value={milesPerWeek.toString()}
  onChangeText={(value) => setMilesPerWeek(parseInt(value))}
/>
const [timeSinceLastMaintenance, setTimeSinceLastMaintenance] = useState(0);
<TextInput
  placeholder="Enter Time Since Last Maintenance"
  keyboardType="numeric"
  value={timeSinceLastMaintenance.toString()}
  onChangeText={(value) => setTimeSinceLastMaintenance(parseInt(value))}
/>

const maintenanceInterval = 3000; // example value in miles

const lastMaintenanceDate = new Date(); // example value
const timeSinceLastMaintenanceInMs = timeSinceLastMaintenance * 24 * 60 * 60 * 1000;
const milesSinceLastMaintenance = milesPerWeek * timeSinceLastMaintenance / 7;
const milesToNextMaintenance = maintenanceInterval - milesSinceLastMaintenance;

const daysToNextMaintenance = Math.floor(milesToNextMaintenance / milesPerWeek * 7);
const nextMaintenanceDate = new Date(lastMaintenanceDate.getTime() + daysToNextMaintenance * 24 * 60 * 60 * 1000);
const notificationDate = new Date(nextMaintenanceDate.getTime() - 7 * 24 * 60 * 60 * 1000);
Notifications.scheduleNotificationAsync({
  content: {
    title: 'Maintenance Reminder',
    body: `Your car is due for maintenance in one week (${nextMaintenanceDate.toLocaleDateString()}).`,
  },
  trigger: {
    date: notificationDate,
  },
});