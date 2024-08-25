import {TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../Scr/Constants/colors';
import {iconSizes} from '../Scr/Constants/dimensions';
import TrackPlayer from 'react-native-track-player';
import React from 'react';
export const GotoPreviousButton = ({size = iconSizes.xl}) => {
  const backwards = async () => {
    await TrackPlayer.skipToPrevious();
  };

  return (
    <TouchableOpacity onPress={backwards} activeOpacity={0.85}>
      <FontAwesome6
        name={'backward-step'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const PlayPauseButton = ({size = iconSizes.xl}) => {
  const [playmode, setPlaymode] = React.useState(false);

  const togglePlayPause = async () => {
    if (playmode) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setPlaymode(!playmode); // Update state after the async action
  };

  return (
    <TouchableOpacity onPress={togglePlayPause} activeOpacity={0.85}>
      <FontAwesome6
        name={playmode ? 'pause' : 'play'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const GotoNextButton = ({size = iconSizes.xl}) => {
  const forwards = async () => {
    await TrackPlayer.skipToNext();
  };
  return (
    <TouchableOpacity onPress={forwards} activeOpacity={0.85}>
      <FontAwesome6
        name={'forward-step'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};
