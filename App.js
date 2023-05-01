import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartupScreen from './startupScreen';
import Calendar from './Calender';
import MyCars from './MyCars';
import AddCars from './AddCars';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Car Cat'>
        <Stack.Screen name="Car Cat" component={StartupScreen} />
        <Stack.Screen name="Calendar" component={Calendar} />
        <Stack.Screen name="My Cars" component={MyCars} />
        <Stack.Screen name="Add Car" component={AddCars} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
