import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {colors} from '../Constants/colors';
import {fontSize, iconSizes, spacing} from '../Constants/dimensions';
import {fontFamilies} from '../Constants/fonts';
import {useNavigation, useRoute} from '@react-navigation/native';
import TrackPlayer, {
  useTrackPlayerEvents,
  Event,
  useProgress,
} from 'react-native-track-player';
import PlayerRepeatToggle from '../../Components/PlayerRepeatToggle';
import PlayerShuffleToggle from '../../Components/PlayerShuffleToggle';
import PlayerProgressBar from '../../Components/PlayerProgressBar';
import {
  GotoNextButton,
  GotoPreviousButton,
  PlayPauseButton,
} from '../../Components/PlayerControls';
import {useLikeSongs} from '../store/likeStore';
import {isExist} from '../data/Check';

const PlayerScreen = () => {
  const {likedSongs, addToLiked, removeFromLiked, loadLikedSongs} =
    useLikeSongs();
  const navigation = useNavigation();
  const route = useRoute();
  const [currentSong, setCurrentSong] = useState(route.params?.song || null);
  const [isLiked, setIsLiked] = useState(false);
  const [isMute, setIsMute] = useState(false);

  // Function to set volume state
  const setVolume = async () => {
    const volume = await TrackPlayer.getVolume();
    setIsMute(volume === 0 ? true : false);
  };

  // Effect to handle volume and initial data load
  useEffect(() => {
    setVolume();
    // Load liked songs from storage once when the component mounts
    loadLikedSongs();
  }, [loadLikedSongs]);

  // Effect to check if the current song is liked
  useEffect(() => {
    // const isSongLiked = likedSongs.some(item => currentSong.url === item.url);
    const isSongLiked = isExist(likedSongs, currentSong);
    setIsLiked(isSongLiked);
  }, [likedSongs, currentSong]);

  // Handle track changes
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.type === Event.PlaybackTrackChanged) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      if (track) {
        setCurrentSong(track);
      }
    }
  });
  const handleToggleVolume = () => {
    TrackPlayer.setVolume(isMute ? 1 : 0);
    setIsMute(!isMute);
  };

  // Toggle like/unlike for the current song
  const handleToggleLike = () => {
    if (isLiked) {
      removeFromLiked(currentSong).then(() => setIsLiked(false)); // Remove song from liked songs
    } else {
      addToLiked(currentSong).then(() => setIsLiked(true)); // Add song to liked songs
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign
            name={'arrowleft'}
            color={colors.iconPrimary}
            size={iconSizes.md}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Playing Now</Text>
      </View>
      {/* Image */}
      {currentSong && (
        <View style={styles.coverImageContainer}>
          <Image
            source={{uri: currentSong.artwork}}
            style={styles.coverImage}
          />
        </View>
      )}
      {/* Song Title and artist */}
      {currentSong && (
        <View style={styles.titleRowHeartContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{currentSong.title}</Text>
            <Text style={styles.artist}>{currentSong.artist}</Text>
          </View>
          <TouchableOpacity onPress={handleToggleLike}>
            <AntDesign
              name={isLiked ? 'heart' : 'hearto'}
              color={colors.iconSecondary}
              size={iconSizes.md}
            />
          </TouchableOpacity>
        </View>
      )}
      {/* Controls */}
      <View style={styles.playerControlContainer}>
        <TouchableOpacity
          style={styles.volumeWrapper}
          onPress={handleToggleVolume}>
          <Feather
            name={isMute ? 'volume-x' : 'volume-1'}
            color={colors.iconSecondary}
            size={iconSizes.lg}
          />
        </TouchableOpacity>
        <View style={styles.repeatShuffleContainer}>
          <PlayerRepeatToggle />
          <PlayerShuffleToggle />
        </View>
      </View>
      {/* Player Progress Bar */}
      {/* <PlayerProgressBar currentSong={currentSong} /> */}
      <PlayerProgressBar />
      <View style={styles.playPauseContainer}>
        <GotoPreviousButton
          size={iconSizes.xl}
          onTrackChange={track => setCurrentSong(track)}
        />
        <PlayPauseButton size={iconSizes.xl} />
        <GotoNextButton
          size={iconSizes.xl}
          onTrackChange={track => setCurrentSong(track)}
        />
      </View>
    </SafeAreaView>
  );
};

export default PlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  headerText: {
    color: colors.textPrimary,
    flex: 1,
    textAlign: 'center',
    fontFamily: fontFamilies.medium,
    fontSize: iconSizes.md,
  },
  coverImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.xl,
  },
  coverImage: {
    height: 260,
    width: 260,
    borderRadius: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: fontSize.xl,
    color: colors.textPrimary,
    fontFamily: fontFamilies.medium,
  },
  artist: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  titleRowHeartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerControlContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  volumeWrapper: {
    flex: 1,
  },
  repeatShuffleContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  playPauseContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xxl,
    marginTop: spacing.xl,
    // marginVertical: spacing.lg,
    // width: '100%',
    // paddingHorizontal: spacing.lg,
    // paddingVertical: spacing.sm,
  },
});
