import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const MovingText = ({text, animationThreshold, style}) => {
  const translateX = useSharedValue(0);
  const shouldAnimate = text.length >= animationThreshold;
  const textWidth = text.length * 3;

  React.useEffect(() => {
    if (!shouldAnimate) return;
    // we have to make animation
    translateX.value = withDelay(
      1000,
      withRepeat(
        withTiming(-textWidth, {
          duration: 5000,
          easing: Easing.linear,
        }),
        -1, //infinite loop
        true, //should reverse or not
      ),
    );
    return () => {
      cancelAnimationFrame(translateX);
      translateX.value = 0;
    };
  }, [translateX, textWidth, text, animationThreshold, shouldAnimate]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{translateX: translateX.value}],
  }));
  return (
    <Animated.Text
      numberOfLines={1}
      style={[
        animatedStyle,
        style,
        shouldAnimate && {width: 9999, paddingLeft: 16},
      ]}>
      {text}
    </Animated.Text>
  );
};

export default MovingText;

const styles = StyleSheet.create({});
