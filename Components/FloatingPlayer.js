import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../Scr/Constants/colors';
import {fontSize, iconSizes, spacing} from '../Scr/Constants/dimensions';
import {fontFamilies} from '../Scr/Constants/fonts';
import {
  GotoNextButton,
  GotoPreviousButton,
  PlayPauseButton,
} from './PlayerControls';
import {useSharedValue} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';
import MovingText from './MovingText';

const ImageUrl =
  'https://linkstorage.linkfire.com/medialinks/images/9ff1e498-61dd-4a27-9854-79b3342f4bca/artwork-440x440.jpg';
const FloatingPlayer = () => {
  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  return (
    <View>
      <View style={{zIndex: 1}}>
        <Slider
          style={styles.container}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          theme={{
            maximumTrackTintColor: colors.maxTrackTintColor,
            minimumTrackTintColor: colors.minTrackTintColor,
          }}
          renderBubble={() => <View />}
        />
      </View>
      <TouchableOpacity style={styles.container} activeOpacity={0.85}>
        <Image source={{uri: ImageUrl}} style={styles.coverImage} />
        <View style={styles.titleContainer}>
          {/* <Text style={styles.title}>Always Be</Text> */}
          <MovingText
            text="Always Be"
            animationThreshold={15}
            style={styles.title}
          />
          <Text style={styles.artist}>Netrum</Text>
        </View>
        <View style={styles.playerControlContainer}>
          <GotoPreviousButton size={iconSizes.md} />
          <PlayPauseButton size={iconSizes.md} />
          <GotoNextButton size={iconSizes.md} />
        </View>
      </TouchableOpacity>
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
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    overflow: 'hidden',
    marginLeft: spacing.sm,
    marginRight: spacing.lg,
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
    gap: 20,
    paddingRight: spacing.lg,
  },
});
