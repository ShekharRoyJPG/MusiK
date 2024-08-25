import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import {HomeStyle} from './HomeStyle';
import React from 'react';
import {FlatList} from 'react-native';
import SongCardWithCategory from '../../Components/SongCardWithCategory';
import FloatingPlayer from '../../Components/FloatingPlayer';
import {songsWithCategory} from '../data/songsWithCategory';
import TrackPlayer, {
  Event,
  useTrackPlayerEvents,
} from 'react-native-track-player';
export default function Home() {
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
      <FlatList
        data={songsWithCategory}
        renderItem={({item}) => (
          <SongCardWithCategory
            item={item}
            onPlay={setCurrentSong} // Pass function to update current song
          />
        )}
        contentContainerStyle={{paddingBottom: 400}}
      />
      <FloatingPlayer song={currentSong} />
    </SafeAreaView>
  );
}
