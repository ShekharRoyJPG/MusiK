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
      <View style={styles.songDetails}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {item.title}
        </Text>
      <Text style={styles.artist}>{item.artist}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SongCard;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: 160,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'white',
    // borderWidth: 2,
  },
  coverPage: {
    width: 130,
    height: 130,
    borderRadius: 10,
  },
  songTitle: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
    textAlign: 'center',
    fontSize: fontSize.md,
    paddingVertical: spacing.sm,
  },
  artist: {
    color: colors.textSecondary,
    textAlign: 'center',
    fontSize: fontSize.sm,
    fontFamily: fontFamilies.regular,
  },
  songDetails: {
    flexDirection: 'column',
  },
});
