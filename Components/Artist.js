import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {colors} from '../Scr/Constants/colors';
import {fontFamilies} from '../Scr/Constants/fonts';
import {fontSize, spacing} from '../Scr/Constants/dimensions';
import TrackPlayer from 'react-native-track-player';

const Artist = ({item}) => {
  return (
    <TouchableOpacity
      //   onPress={() => handlePlay(item)}
      style={[styles.container]}>
      <Image source={{uri: item.img}} style={[styles.coverPage]} />
      <Text style={styles.artistName} numberOfLines={1}>
        {item.name}
      </Text>
      {/* <Text style={styles.artist}>{item.artist}</Text> */}
    </TouchableOpacity>
  );
};

export default Artist;

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 80,
    alignItems: 'center',
  },
  coverPage: {
    width: 60,
    height: 60,
    borderRadius: Math.round(
      (Dimensions.get('window').height + Dimensions.get('window').width) / 2,
    ),
  },
  artistName: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.regular,
    textAlign: 'center',
    fontSize: fontSize.sm,
    paddingVertical: spacing.sm,
  },
});
