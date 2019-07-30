const filterAlbums = (array, query) =>
  array.filter(element => element.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);

module.exports = { filterAlbums };
