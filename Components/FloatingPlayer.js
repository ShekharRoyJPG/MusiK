import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../Scr/Constants/colors';
import {fontSize, iconSizes, spacing} from '../Scr/Constants/dimensions';
import {fontFamilies} from '../Scr/Constants/fonts';
import {
  GotoNextButton,
  GotoPreviousButton,
  PlayPauseButton,
} from './PlayerControls';

const FloatingPlayer = () => {
  const ImageUrl =
    'https://linkstorage.linkfire.com/medialinks/images/9ff1e498-61dd-4a27-9854-79b3342f4bca/artwork-440x440.jpg';
  return (
    <View style={styles.container}>
      <Image source={{uri: ImageUrl}} style={styles.coverImage} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Always Be</Text>
        <Text style={styles.artist}>Netrum</Text>
      </View>
      <View style={styles.playerControlContainer}>
        <GotoPreviousButton size={iconSizes.md} />
        <PlayPauseButton size={iconSizes.md} />
        <GotoNextButton size={iconSizes.md} />
      </View>
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverImage: {
    width: 70,
    height: 70,
    // resizeMode: 'cover',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
  },
  artist: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
  playerControlContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: 10,
    paddingRight: spacing.lg,
  },
});
