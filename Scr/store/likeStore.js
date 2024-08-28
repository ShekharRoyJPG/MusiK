import {create} from 'zustand';
import {isExist} from '../data/Check';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useLikeSongs = create(set => ({
  likedSongs: [],
  addToLiked: async newSong => {
    set(state => {
      let alreadyExist = isExist(state.likedSongs, newSong);
      const updatedSong = alreadyExist
        ? state.likedSongs.filter(item => item.url !== newSong.url)
        : [newSong, ...state.likedSongs];
      AsyncStorage.setItem('likedSongs', JSON.stringify(updatedSong));
      return {
        likedSongs: updatedSong,
      };
    });
  },
  loadLikedSongs: async () => {
    try {
      const likeSongs = await AsyncStorage.getItem('likedSongs');
      if (likeSongs) {
        set({likedSongs: JSON.parse(likeSongs)});
      }
    } catch (error) {}
  },
}));
