import {TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../Scr/Constants/colors';
import {iconSizes} from '../Scr/Constants/dimensions';
import TrackPlayer, {State} from 'react-native-track-player';
import React from 'react';
export const GotoPreviousButton = ({size = iconSizes.xl, onTrackChange}) => {
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const track = await TrackPlayer.getTrack(currentTrack);
    onTrackChange(track); // Update current song after skipping
  };

  return (
    <TouchableOpacity onPress={skipToPrevious} activeOpacity={0.85}>
      <FontAwesome6
        name={'backward-step'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};

export const PlayPauseButton = ({size = iconSizes.xl}) => {
  const [playmode, setPlaymode] = React.useState(null);
  const setIcon = async () => {
    const state = await TrackPlayer.getState();
    setPlaymode(state === State.Playing ? true : false);
  };
  React.useEffect(() => {
    setIcon();
  }, [playmode]);

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

export const GotoNextButton = ({size = iconSizes.xl, onTrackChange}) => {
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
    const currentTrack = await TrackPlayer.getCurrentTrack();
    const track = await TrackPlayer.getTrack(currentTrack);
    onTrackChange(track); // Update current song after skipping
  };

  return (
    <TouchableOpacity onPress={skipToNext} activeOpacity={0.85}>
      <FontAwesome6
        name={'forward-step'}
        size={size}
        color={colors.iconPrimary}
      />
    </TouchableOpacity>
  );
};
