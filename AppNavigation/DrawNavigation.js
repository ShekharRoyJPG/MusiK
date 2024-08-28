import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigation from './StackNavigation';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './CustomDrawerContent';
import {useSetupPlayer} from '../hook/useSetupTrackPlayer';
import {useLikeSongs} from '../Scr/store/likeStore';
export default function DrawNavigation() {
  const {loadLikedSongs} = useLikeSongs();
  const handlePlayerLoaded = () => {
    console.log('TrackPlayer is ready!');
    loadLikedSongs(); // Load initial songs like data when player is ready.
  };

  useSetupPlayer({onLoad: handlePlayerLoaded});
  const Drawer = createDrawerNavigator();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Drawer.Navigator
          screenOptions={{
            headerShown: false,
            drawerType: 'slide',
            swipeEdgeWidth: 0,
          }}
          drawerContent={props => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="Stack" component={StackNavigation} />
        </Drawer.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
