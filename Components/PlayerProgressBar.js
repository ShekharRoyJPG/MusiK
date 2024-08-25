import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue, withSpring} from 'react-native-reanimated';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import {colors} from '../Scr/Constants/colors';
import {fontFamilies} from '../Scr/Constants/fonts';
import {fontSize, spacing} from '../Scr/Constants/dimensions';

const PlayerProgressBar = ({currentSong}) => {
  const {position, duration} = useProgress();
  const progress = useSharedValue((position / duration) * 100 || 0);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  const isSliding = useSharedValue(false);

  React.useEffect(() => {
    if (!isSliding.value) {
      progress.value = withSpring((position / duration) * 100 || 0);
    }
  }, [position, duration, isSliding.value, progress]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleSliderValueChange = async value => {
    if (isSliding.value) {
      const seekPosition = (value / 100) * duration;
      await TrackPlayer.seekTo(seekPosition);
    }
  };

  const handleSlideStart = () => {
    isSliding.value = true;
  };

  const handleSlidingComplete = async value => {
    isSliding.value = false;
    const seekPosition = (value / 100) * duration;
    await TrackPlayer.seekTo(seekPosition);
  };

  return (
    <View>
      <View style={styles.timerow}>
        <Text style={styles.timeText}>{formatTime(position)}</Text>
        <Text style={styles.timeText}>-{formatTime(duration - position)}</Text>
      </View>
      <Slider
        style={styles.sliderContainer}
        containerStyle={{height: 7, borderRadius: spacing.sm}}
        theme={{
          maximumTrackTintColor: colors.maxTrackTintColor,
          minimumTrackTintColor: colors.minTrackTintColor,
        }}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        thumbWidth={18}
        renderBubble={() => null}
        onSlideStart={handleSlideStart}
        onValueChange={handleSliderValueChange}
        onSlidingComplete={handleSlidingComplete}
      />
    </View>
  );
};

export default PlayerProgressBar;

const styles = StyleSheet.create({
  sliderContainer: {
    marginVertical: spacing.xl,
  },
  timerow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  timeText: {
    color: colors.textPrimary,
    fontFamily: fontFamilies.regular,
    fontSize: fontSize.sm,
    opacity: 0.75,
  },
});
