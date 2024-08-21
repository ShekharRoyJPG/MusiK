import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../Scr/Constants/colors';
import {fontFamilies} from '../Scr/Constants/fonts';
import {fontSize, spacing} from '../Scr/Constants/dimensions';
import {Slider} from 'react-native-awesome-slider';
import {useSharedValue} from 'react-native-reanimated';

const PlayerProgressBar = () => {
  const progress = useSharedValue(30);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  return (
    <View>
      <View style={styles.timerow}>
        <Text style={styles.timeText}>00:50</Text>
        <Text style={styles.timeText}>{'-'}04:26</Text>
      </View>
      <Slider
        style={styles.sliderContainer}
        containerStyle={{
          height: 7,
          borderRadius: spacing.sm,
        }}
        theme={{
          maximumTrackTintColor: colors.maxTrackTintColor,
          minimumTrackTintColor: colors.minTrackTintColor,
        }}
        progress={progress}
        minimumValue={min}
        maximumValue={max}
        thumbWidth={18}
        renderBubble={() => null}
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
