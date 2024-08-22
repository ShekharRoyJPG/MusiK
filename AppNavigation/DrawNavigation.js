import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
export default function DrawNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{headerShown: false, drawerType: 'slide'}}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Stack" component={StackNavigation} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
