import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../Scr/Constants/colors';
import React from 'react';
import {iconSizes} from '../Scr/Constants/dimensions';
export const GotoPreviousButton = ({size = iconSizes.xl}) => {
  return (
    <TouchableOpacity>
      <FontAwesome6
        name={'backward-step'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const PlayPauseButton = ({size = iconSizes.xl}) => {
  return (
    <TouchableOpacity>
      <FontAwesome6
        name={true ? 'pause' : 'play'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const GotoNextButton = ({size = iconSizes.xl}) => {
    return (
      <TouchableOpacity>
        <FontAwesome6
          name={'forward-step'}
          size={size}
          color={colors.iconPrimary}
        />
      </TouchableOpacity>
    );
  };
