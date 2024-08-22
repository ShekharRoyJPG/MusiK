import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../Components/Header';
import {HomeStyle} from './HomeStyle';
import React from 'react';
import {FlatList} from 'react-native';
import SongCardWithCategory from '../../Components/SongCardWithCategory';
import FloatingPlayer from '../../Components/FloatingPlayer';
import { songsWithCategory } from '../data/songsWithCategory';
export default function () {
  return (
    <SafeAreaView style={HomeStyle.container}>
      <Header />
      <FlatList
        data={songsWithCategory}
        renderItem={SongCardWithCategory}
        contentContainerStyle={{paddingBottom: 400}}
      />
      <FloatingPlayer />
    </SafeAreaView>
  );
}
