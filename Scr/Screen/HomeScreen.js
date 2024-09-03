import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import {HomeStyle} from './HomeStyle';
import React from 'react';
import {FlatList, ScrollView} from 'react-native';
import SongCardWithCategory from '../../Components/SongCardWithCategory';
import FloatingPlayer from '../../Components/FloatingPlayer';
import {
  ShortSongsWithCategory,
  songsWithCategory,
} from '../data/songsWithCategory';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import ArtistCard from '../../Components/ArtistCard';
import ShortsCardwithCategory from '../../Components/ShortsCardwithCategory';
import {useSetupPlayer} from '../../hook/useSetupTrackPlayer';
import {useLikeSongs} from '../store/likeStore';
export default function Home() {
  const {loadLikedSongs} = useLikeSongs();
  const handlePlayerLoaded = () => {
    console.log('TrackPlayer is ready!');
    loadLikedSongs(); // Load initial songs like data when player is ready.
  };

  useSetupPlayer({onLoad: handlePlayerLoaded});

  const [currentSong, setCurrentSong] = React.useState(null);
  // Update currentSong when track changes
  useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
    if (event.nextTrack !== null) {
      const track = await TrackPlayer.getTrack(event.nextTrack);
      setCurrentSong(track); // Update current song
    }
  });
  return (
    <SafeAreaView style={HomeStyle.container}>
      <Header />
      <ArtistCard />
      <ScrollView>
        <FlatList
          data={songsWithCategory}
          renderItem={({item}) => (
            <SongCardWithCategory
              item={item}
              onPlay={setCurrentSong} // Pass function to update current song
            />
          )}
        />
        <FlatList
          data={ShortSongsWithCategory}
          renderItem={({item}) => (
            <ShortsCardwithCategory
              item={item}
              onPlay={setCurrentSong} // Pass function to update current song
            />
          )}
        />
      </ScrollView>
      <FloatingPlayer song={currentSong} />
    </SafeAreaView>
  );
}
