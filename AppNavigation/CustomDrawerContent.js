import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {colors} from '../Scr/Constants/colors';
import {fontSize, iconSizes, spacing} from '../Scr/Constants/dimensions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import {fontFamilies} from '../Scr/Constants/fonts';
import {signOut} from 'firebase/auth';
import {auth} from '../Firebase/config';
import {useLikeSongs} from '../Scr/store/likeStore';
import TrackPlayer from 'react-native-track-player';

const CustomDrawerContent = props => {
  const isDarkMode = true;
  const {resetLikedSongs} = useLikeSongs();
  const handleSignOut = async () => {
    await signOut(auth);
    await TrackPlayer.stop();
    resetLikedSongs();
    props.navigation.closeDrawer();
  };
  return (
    <DrawerContentScrollView style={styles.container}>
      {/* <DrawerItemList {...props} /> */}
      <View style={styles.headerIconContainer}>
        <TouchableOpacity>
          <Octicons
            name={isDarkMode ? 'sun' : 'moon'}
            size={iconSizes.lg}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.closeDrawer()}>
          <AntDesign
            name="close"
            size={iconSizes.lg}
            color={colors.iconPrimary}
          />
        </TouchableOpacity>
      </View>
      {/* drawer items */}
      <View style={styles.drawerItemContainer}>
        <DrawerItem
          label={'Profile'}
          icon={() => (
            <FontAwesome
              name="user-circle"
              size={iconSizes.md}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
        />
        <DrawerItem
          label={'Liked Songs'}
          icon={() => (
            <AntDesign
              name="hearto"
              size={iconSizes.md}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('Like')}
        />
        <DrawerItem
          label={'Language'}
          icon={() => (
            <FontAwesome
              name="language"
              size={iconSizes.md}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('Like')}
        />
        <DrawerItem
          label={'Contact Us'}
          icon={() => (
            <FontAwesome
              name="envelope-o"
              size={iconSizes.md}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('Like')}
        />
        <DrawerItem
          label={'FAQs'}
          icon={() => (
            <FontAwesome
              name="question-circle-o"
              size={iconSizes.md}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('Like')}
        />
        <DrawerItem
          label={'Settings'}
          icon={() => (
            <FontAwesome
              name="cog"
              size={iconSizes.md}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
          onPress={() => props.navigation.navigate('Like')}
        />
        <DrawerItem
          label={'Sign Out'}
          icon={() => (
            <FontAwesome
              name="sign-out"
              size={iconSizes.md}
              color={colors.iconSecondary}
            />
          )}
          labelStyle={styles.labelStyle}
          style={styles.drawerItem}
          onPress={handleSignOut}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  headerIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  drawerItemContainer: {
    marginVertical: spacing.xl,
  },
  labelStyle: {
    fontSize: fontSize.md,
    color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
  },
  drawerItem: {
    marginVertical: spacing.sm,
  },
});
