/* eslint-disable curly */
const sortArray = (objectsArray, key, order) => {
  const ordering =
    {
      DES: -1,
      ASC: 1
    }[order] || -1;

  objectsArray.sort((a, b) => {
    const keyA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
    const keyB = typeof a[key] === 'string' ? b[key].toUpperCase() : b[key];

    if (keyA < keyB) return -ordering;
    if (keyA > keyB) return ordering;
    return 0;
  });
};

module.exports = { sortArray };
