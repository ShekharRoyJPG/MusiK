import {create} from 'zustand';
import {isExist} from '../data/Check';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {db, auth} from '../../Firebase/config';
import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from 'firebase/firestore';
export const useLikeSongs = create(set => ({
  likedSongs: [],

  addToLiked: async newSong => {
    const user = auth.currentUser;
    if (!user) return; // Exit if no user is authenticated

    let updatedSongs;
    let alreadyExist;
    await set(state => {
      alreadyExist = isExist(state.likedSongs, newSong);
      updatedSongs = alreadyExist
        ? state.likedSongs.filter(item => item.url !== newSong.url) // Remove if exists
        : [newSong, ...state.likedSongs]; // Add if not exists

      return {
        likedSongs: updatedSongs,
      };
    });

    // Save updated liked songs to AsyncStorage
    await AsyncStorage.setItem(
      'likedSongs',
      JSON.stringify(updatedSongs),
    ).catch(console.error);

    // Reference to the user's liked songs in Firestore
    const userLikedSongsRef = collection(db, 'users', user.uid, 'likedSongs');

    if (!alreadyExist) {
      // Add new song to Firebase
      await addDoc(userLikedSongsRef, newSong).catch(console.error);
    } else {
      // Remove song from Firebase
      const q = query(userLikedSongsRef, where('url', '==', newSong.url));
      getDocs(q).then(querySnapshot => {
        querySnapshot.forEach(doc => {
          deleteDoc(doc.ref).catch(console.error);
        });
      });
    }
  },

  removeFromLiked: async songToRemove => {
    const user = auth.currentUser; // Access current user
    if (!user) return; // Exit if no user is authenticated

    let updatedSongs;
    await set(state => {
      updatedSongs = state.likedSongs.filter(
        item => item.url !== songToRemove.url,
      );
      return {
        likedSongs: updatedSongs,
      };
    });

    // Save updated liked songs to AsyncStorage
    await AsyncStorage.setItem(
      'likedSongs',
      JSON.stringify(updatedSongs),
    ).catch(console.error);

    // Reference to the user's liked songs in Firestore
    const userLikedSongsRef = collection(db, 'users', user.uid, 'likedSongs');

    // Remove from Firebase
    const q = query(userLikedSongsRef, where('url', '==', songToRemove.url));
    getDocs(q).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        deleteDoc(doc.ref).catch(console.error);
      });
    });
  },

  loadLikedSongs: async () => {
    const user = auth.currentUser;
    if (!user) return; // Exit if no user is authenticated
    try {
      // Try to load liked songs from Firestore first
      const userLikedSongsRef = collection(db, 'users', user.uid, 'likedSongs');

      // Query to get all songs from Firestore user's likedSongs collection
      const q = query(userLikedSongsRef);
      const querySnapshot = await getDocs(q);
      // console.log('querySnapshot : ', querySnapshot);
      if (!querySnapshot.empty) {
        // If songs are found in Firestore
        const songsFromFirebase = [];
        querySnapshot.forEach(doc => {
          songsFromFirebase.push(doc.data());
        });

        // Update Zustand state with songs from Firestore
        set({likedSongs: songsFromFirebase});

        // Save the fetched songs to AsyncStorage for offline access
        await AsyncStorage.setItem(
          'likedSongs',
          JSON.stringify(songsFromFirebase),
        ).catch(console.error);
      } else {
        // If no songs are found in Firestore, fallback to AsyncStorage
        const likeSongs = await AsyncStorage.getItem('likedSongs');
        if (likeSongs) {
          set({likedSongs: JSON.parse(likeSongs)});
        }
      }
    } catch (error) {
      console.error('Failed to load liked songs', error);
    }
  },
  resetLikedSongs: () => {
    set({likedSongs: []});
    AsyncStorage.removeItem('likedSongs').catch(console.error); // Clear from AsyncStorage
  },
}));

// Automatically load liked songs when the store is created
// useLikeSongs.getState().loadLikedSongs();
