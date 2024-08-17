import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import {HomeStyle} from './HomeStyle';
import React from 'react';
import {FlatList} from 'react-native';
import SongCard from '../../Components/SongCard';
import SongCardWithCategory from '../../Components/SongCardWithCategory';
import FloatingPlayer from '../../Components/FloatingPlayer';
export default function () {
  return (
    <SafeAreaView style={HomeStyle.container}>
      <Header />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={SongCardWithCategory}
        contentContainerStyle={{paddingBottom: 400}}
      />
      <FloatingPlayer />
    </SafeAreaView>
  );
}
