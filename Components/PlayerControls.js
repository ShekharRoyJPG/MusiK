import {TouchableOpacity} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {colors} from '../Scr/Constants/colors';
import {iconSizes} from '../Scr/Constants/dimensions';
import TrackPlayer, {
  State,
  useTrackPlayerEvents,
  Event,
} from 'react-native-track-player';
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
  const [isPlaying, setIsPlaying] = React.useState(false);

  // Check the initial state of the player when the component mounts
  React.useEffect(() => {
    const checkInitialPlayerState = async () => {
      const currentState = await TrackPlayer.getState();
      setIsPlaying(currentState === State.Playing);
    };

    checkInitialPlayerState(); // Set initial state based on TrackPlayer state
  }, []);

  // Set the icon state based on TrackPlayer events
  useTrackPlayerEvents([Event.PlaybackState], event => {
    if (event.state === State.Playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  });

  const togglePlayPause = async () => {
    const currentState = await TrackPlayer.getState();
    if (currentState === State.Playing) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
  };

  return (
    <TouchableOpacity onPress={togglePlayPause} activeOpacity={0.85}>
      <FontAwesome6
        name={isPlaying ? 'pause' : 'play'}
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
