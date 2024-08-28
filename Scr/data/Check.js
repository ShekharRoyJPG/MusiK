export const isExist = (songs, item) => {
  return songs.some(song => song.url === item.url);
};
