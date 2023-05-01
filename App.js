import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartupScreen from './startupScreen';
import Calendar from './Calender';
import MyCars from './MyCars';
import AddCars from './MyCars';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Car Cat" component={StartupScreen} />
        <Stack.Screen name="Upcoming Appointments" component={Calendar} />
        <Stack.Screen name="My Cars" component={MyCars} />
        <Stack.Screen name="Add Cars" component={AddCars} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
