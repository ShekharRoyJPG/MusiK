import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {colors} from '../Scr/Constants/colors';
import {fontSize, iconSizes, spacing} from '../Scr/Constants/dimensions';
import {fontFamilies} from '../Scr/Constants/fonts';
import {
  GotoNextButton,
  GotoPreviousButton,
  PlayPauseButton,
} from './PlayerControls';
import {useSharedValue, withSpring} from 'react-native-reanimated';
import {Slider} from 'react-native-awesome-slider';
import MovingText from './MovingText';
import {useNavigation} from '@react-navigation/native';
import TrackPlayer, {
  useProgress,
  State,
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';

const FloatingPlayer = ({song}) => {
  const navigation = useNavigation();
  const {position, duration} = useProgress(250);
  const progressPercentage = duration > 0 ? (position / duration) * 100 : 0;
  const isSliding = useSharedValue(false);
  const progress = useSharedValue(progressPercentage);
  const min = useSharedValue(0);
  const max = useSharedValue(100);
  const [isPlaying, setIsPlaying] = React.useState(false); // State to track if the song is playing

  // Listen for playback state changes
  useTrackPlayerEvents(
    [Event.PlaybackState, Event.PlaybackTrackChanged],
    async event => {
      if (event.type === Event.PlaybackState) {
        if (event.state === State.Playing) {
          setIsPlaying(true); // Set to true if playing
        } else if (event.state === State.Paused) {
          setIsPlaying(false); // Set to false if paused
        }
      }
      // When the track changes, ensure the FloatingPlayer is visible if there's a song
      if (event.type === Event.PlaybackTrackChanged) {
        const currentTrack = await TrackPlayer.getCurrentTrack();
        if (currentTrack !== null) {
          setIsPlaying(true); // Assume playing state, adjust if needed
        }
      }
    },
  );
  // Update progress value smoothly when position changes
  React.useEffect(() => {
    if (!isSliding.value) {
      progress.value = withSpring(progressPercentage);
    }
  }, [position, duration, isSliding.value, progress, progressPercentage]);

  // Don't render if no song is selected or if the song is not playing
  if (!song) {
    return null;
  }
  return (
    <View>
      <View style={{zIndex: 1}}>
        <Slider
          style={styles.container}
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          // thumbWidth={25}
          theme={{
            maximumTrackTintColor: colors.maxTrackTintColor,
            minimumTrackTintColor: colors.minTrackTintColor,
          }}
          renderBubble={() => null}
          // Handle the start of sliding
          onSlideStart={() => {
            isSliding.value = true;
          }}
          // Handle value changes while sliding
          onValueChange={async value => {
            const seekPosition = (value / 100) * duration;
            await TrackPlayer.seekTo(seekPosition);
          }}
          // Handle the completion of sliding
          onSlidingComplete={async value => {
            if (!isSliding.value) return;

            isSliding.value = false;
            const seekPosition = (value / 100) * duration;
            await TrackPlayer.seekTo(seekPosition);
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Player', {song})}
        style={styles.container}
        activeOpacity={0.85}>
        <Image source={{uri: song.artwork}} style={styles.coverImage} />
        <View style={styles.titleContainer}>
          {/* <Text style={styles.title}>Always Be</Text> */}
          <MovingText
            text={song.title}
            animationThreshold={15}
            style={styles.title}
          />
          <Text style={styles.artist}>{song.artist}</Text>
        </View>
        <View style={styles.playerControlContainer}>
          <GotoPreviousButton
            size={iconSizes.md}
            onTrackChange={track => (song = track)}
          />
          <PlayPauseButton size={iconSizes.md} />
          <GotoNextButton
            size={iconSizes.md}
            onTrackChange={track => (song = track)}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FloatingPlayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coverImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
  },
  titleContainer: {
    flex: 1,
    paddingHorizontal: spacing.sm,
    overflow: 'hidden',
    marginLeft: spacing.sm,
    marginRight: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: fontSize.lg,
    fontFamily: fontFamilies.medium,
  },
  artist: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
  },
  playerControlContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    gap: 30,
    // justifyContent: 'space-between',
    paddingRight: spacing.lg,
  },
});
