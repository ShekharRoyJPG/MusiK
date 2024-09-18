import {useEffect, useRef} from 'react';
import TrackPlayer, {
  Capability,
  RatingType,
  RepeatMode,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';

const setupPlayer = async () => {
  try {
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 10, // Cache size in MB
    });

    await TrackPlayer.updateOptions({
      ratingType: RatingType.Heart,

      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        // Capability.Stop,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        // Capability.Stop,
      ],
    });

    await TrackPlayer.setVolume(0.5);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  } catch (error) {
    console.error('Error setting up TrackPlayer:', error);
  }
};

export const useSetupPlayer = ({onLoad}) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current) {
      setupPlayer()
        .then(() => {
          isInitialized.current = true;
          if (onLoad) onLoad(); // Execute onLoad callback if provided
        })
        .catch(error => {
          isInitialized.current = false;
          console.error('Error setting up player:', error);
        });
    }
  }, [onLoad]);
};
