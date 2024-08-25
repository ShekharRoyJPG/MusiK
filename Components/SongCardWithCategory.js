import {Text, View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {spacing} from '../Scr/Constants/dimensions';
import SongCard from './SongCard';
import {HomeStyle} from '../Scr/Screen/HomeStyle';
import TrackPlayer from 'react-native-track-player';
const SongCardWithCategory = ({item, onPlay}) => {
  // create a function that will play a song in queue
  const handlePlayTrack = async selectedTrack => {
    // console.log(selectedTrack);
    const Songs = item.songs;
    const trackIndex = Songs.findIndex(
      track => track.url === selectedTrack.url,
    );
    if (trackIndex === -1) {
      return;
    } // if track doesn't exist
    const beforeSong = Songs.slice(0, trackIndex);
    const afterSong = Songs.slice(trackIndex + 1);
    await TrackPlayer.reset();
    await TrackPlayer.add(selectedTrack);
    await TrackPlayer.add(afterSong);
    await TrackPlayer.add(beforeSong);
    await TrackPlayer.play();
    // await TrackPlayer.pause();
    onPlay(selectedTrack); // Update current song
  };
  return (
    <View style={styles.container}>
      <Text style={HomeStyle.headingText}> {item.title}</Text>
      {/* <SongCard /> */}
      <FlatList
        data={item.songs}
        renderItem={({item}) => (
          <SongCard
            item={item}
            handlePlay={selectedTrack => {
              handlePlayTrack(selectedTrack);
            }}
          />
        )}
        horizontal={true}
        ItemSeparatorComponent={<View style={{marginHorizontal: 15}} />}
        contentContainerStyle={{paddingHorizontal: spacing.lg}}
      />
    </View>
  );
};

export default SongCardWithCategory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
