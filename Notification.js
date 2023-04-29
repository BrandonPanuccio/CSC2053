import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, {useState, useEffect} from 'react';
import {View, TextInput, Text} from 'react-native';
import { Button } from 'react-native';
Notifications.setNotificationHandler({
  handleNotification: async () => {
  return {
  shouldShowAlert: true
  }}
  });

<Button onPress={triggerNotifications} title="Trigger Local Notifications" color="#841584" 
accessibilityLabel="Trigger Local Notifications"/>
const triggerNotifications = async () => {
  await Notifications.scheduleNotificationAsync({
  content: {
  title: "You’ve got mail!" ,
  body: 'Here is the notification body',
  data: { data: 'goes here' },
  },
  trigger: { seconds: 2 },
  });
  }


  export default function App() {
    useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then((statusObj) => {
    if (statusObj.status !== 'granted') {
    return Permissions.askAsync(Permissions.NOTIFICATIONS)
    }
    return statusObj;
    }).then((statusObj) => {
    if (statusObj.status !== 'granted') {
    return;
    }
    })
    }, [])}
