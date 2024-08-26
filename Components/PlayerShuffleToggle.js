import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../Scr/Constants/colors';
import {iconSizes} from '../Scr/Constants/dimensions';
import TrackPlayer from 'react-native-track-player';

const PlayerShuffleToggle = () => {
  // Implement shuffle functionality here
  const shuffleSongs = async () => {
    let queue = await TrackPlayer.getQueue();

    // Properly shuffle the queue using Fisher-Yates algorithm
    for (let i = queue.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [queue[i], queue[j]] = [queue[j], queue[i]];
    }
    // console.log('queue: ', queue);
    await TrackPlayer.reset();
    await TrackPlayer.add(queue);
    await TrackPlayer.play();
  };

  return (
    <TouchableOpacity onPress={shuffleSongs}>
      <MaterialCommunityIcons
        name={'shuffle'}
        size={iconSizes.lg}
        color={colors.iconSecondary}
      />
    </TouchableOpacity>
  );
};

export default PlayerShuffleToggle;

const styles = StyleSheet.create({});
