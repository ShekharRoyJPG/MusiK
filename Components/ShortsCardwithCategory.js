import {Text, View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {spacing} from '../Scr/Constants/dimensions';
import SongCard from './SongCard';
import {HomeStyle} from '../Scr/Screen/HomeStyle';
import TrackPlayer from 'react-native-track-player';
const ShortsCardwithCategory = ({item, onPlay}) => {
    // const [headerName, setHeaderName] = React.useState("");
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
    // await TrackPlayer.setRate(1);// play back speed up by default 1
    // await TrackPlayer.pause();
    onPlay(selectedTrack); // Update current song
  };
  return (
    <View style={styles.container}>
      <Text style={HomeStyle.headingText}>{item.title}</Text>
      {/* <SongCard /> */}
      <FlatList
        data={item.songs}
        renderItem={({item}) => (
          <SongCard
            item={item}
            handlePlay={selectedTrack => {
              handlePlayTrack(selectedTrack);
            }}
            containerStyle={styles.containerStyle}
            imageStyle={styles.imageStyle}
          />
        )}
        // horizontal={true}
        numColumns={2}
        columnWrapperStyle={{
          marginVertical: spacing.sm,
        }}
        
      />
    </View>
  );
};

export default ShortsCardwithCategory;

const styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    height: 80,
    width: 250,
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    // borderColor: 'white',
    // borderWidth: 2,
  },
  imageStyle: {
    width: 80,
    height: 80,
    borderRadius: 10,

  },
});
