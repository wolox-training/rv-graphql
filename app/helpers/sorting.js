/* eslint-disable curly */
const sortAlbums = (albumsArray, key, order) => {
  albumsArray.sort((a, b) => {
    let keyA = a.id;
    let keyB = b.id;
    if (key === 'title') {
      keyA = a.title.toUpperCase();
      keyB = b.title.toUpperCase();
    }
    if (key === 'userId') {
      keyA = a.userId;
      keyB = b.userId;
    }

    if (keyA < keyB) {
      if (order === 'DES') return 1;
      return -1;
    }
    if (keyA > keyB) {
      if (order === 'DES') return -1;
      return 1;
    }
    return 0;
  });
};

module.exports = { sortAlbums };
