import {StatusBar} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Scr/Screen/HomeScreen';
import LikeScreen from '../Scr/Screen/LikeScreen';
import PlayerScreen from '../Scr/Screen/PlayerScreen';

export default function StackNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <Stack.Navigator initialRouteName="Home">
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
}
