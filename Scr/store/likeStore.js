import {create} from 'zustand';
import {isExist} from '../data/Check';

export const useLikeSongs = create(set => ({
  likedSongs: [],
  addToLiked: newSong => {
    set(state => {
      let alreadyExist = isExist(state.likedSongs, newSong);
      const updatedSong = alreadyExist
        ? state.likedSongs
        : [newSong, ...state.likedSongs];
      return {
        likedSongs: updatedSong,
      };
    });
  },
}));
