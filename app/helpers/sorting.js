/* eslint-disable curly */
const sortArray = (albumsArray, key, order) => {
  const ordering =
    {
      DES: -1,
      ASC: 1
    }[order] || -1;

  const fieldIsString = typeof albumsArray[0][key] === 'string';

  albumsArray.sort((a, b) => {
    let keyA = a[key];
    let keyB = b[key];

    if (fieldIsString) {
      keyA = keyA.toUpperCase();
      keyB = keyB.toUpperCase();
    }

    if (keyA < keyB) return -ordering;
    if (keyA > keyB) return ordering;
    return 0;
  });
};

module.exports = { sortArray };
