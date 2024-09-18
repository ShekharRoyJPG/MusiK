import { useEffect, useRef } from 'react';
import TrackPlayer, {
  Capability,
  RatingType,
  RepeatMode,
  AppKilledPlaybackBehavior,
  State,
} from 'react-native-track-player';

// Setup TrackPlayer with necessary options and capabilities
const setupPlayer = async () => {
  try {
    // Setup player with options like cache size
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 10, // Cache size in MB
    });

    // Update options for playback and capabilities
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
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
      ],
    });

    // Set default volume and repeat mode
    await TrackPlayer.setVolume(0.5);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
  } catch (error) {
    console.error('Error setting up TrackPlayer:', error);
  }
};

// Custom hook to initialize the player only if it's not already initialized
export const useSetupPlayer = ({ onLoad }) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    let isMounted = true; // To prevent state updates if the component is unmounted

    const initializePlayer = async () => {
      try {
        const playerState = await TrackPlayer.getState();

        // Check if the player is uninitialized (State.None) or stopped, then initialize
        if (playerState === State.None && isMounted) {
          await setupPlayer();
          isInitialized.current = true;
          if (onLoad) onLoad(); // Trigger onLoad callback if provided
        } else if (isMounted) {
          isInitialized.current = true; // Player is already initialized
          if (onLoad) onLoad();
        }
      } catch (error) {
        if (isMounted) {
          isInitialized.current = false;
          console.error('Error setting up player:', error);
        }
      }
    };

    // Initialize player if it hasn't been already
    if (!isInitialized.current) {
      initializePlayer();
    }

    // Cleanup function to stop pending promises if the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [onLoad]);
};
