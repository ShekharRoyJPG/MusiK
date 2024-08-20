import {StatusBar} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../Scr/Screen/HomeScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import LikeScreen from '../Scr/Screen/LikeScreen';

export default function AppNavigation() {
  const Stack = createNativeStackNavigator();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <StatusBar translucent={true} backgroundColor={'transparent'} />
        <Stack.Navigator initialRouteName="Like">
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
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
