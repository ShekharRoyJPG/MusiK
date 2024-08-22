import {Text, View, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import {spacing} from '../Scr/Constants/dimensions';
import SongCard from './SongCard';
import {HomeStyle} from '../Scr/Screen/HomeStyle';
const SongCardWithCategory = ({item}) => {
  return (
    <View style={styles.container}>
      <Text style={HomeStyle.headingText}> {item.title}</Text>
      {/* <SongCard /> */}
      <FlatList
        data={item.songs}
        renderItem={SongCard}
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
