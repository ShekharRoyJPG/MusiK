import {useCallback, useEffect, useState} from 'react';
import TrackPlayer from 'react-native-track-player';

export const useTrackPlayerRepeatMode = () => {
  // repeatMadeState
  const [repeatMode, setRepeatMode] = useState(null);
  //to change repeat
  const changeRepeatMode = useCallback(async repeatMode => {
    await TrackPlayer.setRepeatMode(repeatMode);
    setRepeatMode(repeatMode);
  }, []);
  useEffect(() => {
    TrackPlayer.getRepeatMode().then(setRepeatMode);
  }, []);
  return {repeatMode, changeRepeatMode};
};
