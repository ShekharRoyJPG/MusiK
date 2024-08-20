import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../Scr/Constants/colors';
import {fontFamilies} from '../Scr/Constants/fonts';
import {fontSize, spacing} from '../Scr/Constants/dimensions';

const SongCard = ({containerStyle, imageStyle}) => {
  const imageUrl =
    'https://linkstorage.linkfire.com/medialinks/images/2bd3689a-7679-4e8b-9f5a-b8b1b73f567d/artwork-440x440.jpg';
  return (
    <TouchableOpacity style={[styles.container, containerStyle]}>
      <Image source={{uri: imageUrl}} style={[styles.coverPage, imageStyle]} />
      <Text style={styles.songTitle} numberOfLines={1}>
        On & On (feat. Daniel Levi)
      </Text>
      <Text style={styles.artist}>Alan Walker</Text>
    </TouchableOpacity>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  container: {
    // height: 320,
    // width: 250,
  },
  coverPage: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  songTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
    fontSize: fontSize.lg,
    paddingVertical: spacing.sm,
  },
  artist: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: fontSize.md,
    fontFamily: fontFamilies.regular,
  },
});
