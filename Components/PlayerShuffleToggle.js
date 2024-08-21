import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '../Scr/Constants/colors';
import {iconSizes} from '../Scr/Constants/dimensions';

const PlayerShuffleToggle = () => {
  return (
    <TouchableOpacity>
    <MaterialCommunityIcons
      name={'shuffle'}
      size={iconSizes.lg}
      color={colors.iconSecondary}
    />
  </TouchableOpacity>
  )
}

export default PlayerShuffleToggle;

const styles = StyleSheet.create({})