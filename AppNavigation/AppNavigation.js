import {StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Scr/Screen/HomeScreen';

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          options={{headerShown: false}}
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
