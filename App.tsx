import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListScreen from './app/screen/ListScreen';
import { UserProvider } from './app/context/UserContext';
import UserDetailScreen from './app/screen/UserDetailScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="List">
          <Stack.Screen name="List" component={ListScreen} options={{ headerShown: false }}/>
           <Stack.Screen name="UserDetail" component={UserDetailScreen} options={{ title: 'User Detail' }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

