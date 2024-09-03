import {StatusBar} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Scr/Screen/HomeScreen';
import LikeScreen from '../Scr/Screen/LikeScreen';
import PlayerScreen from '../Scr/Screen/PlayerScreen';
import WelcomeScreen from '../Scr/Screen/WelcomeScreen';
import useAuth from '../hook/useAuth';
import RegistrationScreen from '../Scr/Screen/RegistrationScreen';

export default function StackNavigation() {
  const Stack = createNativeStackNavigator();
  const {user} = useAuth();
  if (user) {
    return (
      <>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Like"
            component={LikeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Player"
            component={PlayerScreen}
          />
        </Stack.Navigator>
      </>
    );
  } else {
    return (
      <>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Stack.Navigator initialRouteName="WelcomeScreen">
          <Stack.Screen
            options={{headerShown: false}}
            name="Welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Registration"
            component={RegistrationScreen}
          />
        </Stack.Navigator>
      </>
    );
  }
}
