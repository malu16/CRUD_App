import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './app/screen/ListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="List">
      <Stack.Screen name="List" component={ListScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

