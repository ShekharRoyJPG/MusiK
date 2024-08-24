import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors} from '../Scr/Constants/colors';
import {fontFamilies} from '../Scr/Constants/fonts';
import {fontSize, spacing} from '../Scr/Constants/dimensions';
import TrackPlayer from 'react-native-track-player';

const SongCard = ({item, containerStyle, imageStyle, handlePlay}) => {
  return (
    <TouchableOpacity
      onPress={() => handlePlay(item)}
      style={[styles.container, containerStyle]}>
      <Image
        source={{uri: item.artwork}}
        style={[styles.coverPage, imageStyle]}
      />
      <Text style={styles.songTitle} numberOfLines={1}>
        {item.title}
      </Text>
      <Text style={styles.artist}>{item.artist}</Text>
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
