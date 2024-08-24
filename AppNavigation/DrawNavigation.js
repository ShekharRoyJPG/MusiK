import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import TrackPlayer from 'react-native-track-player';
export default function DrawNavigation() {
  useEffect(() => {
    setupPlayer();
  }, []);
  const setupPlayer = async () => {
    await TrackPlayer.setupPlayer();
  };
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
