const { users: User } = require('../models');
const { albums: Album } = require('../models');

const getAlbumsFromUser = async user => {
  const usersObject = await User.findAll({
    where: user,
    include: [{ model: Album, as: 'albums' }]
  });

  return usersObject.map(userObject =>
    userObject.get().albums.map(albumObject => ({
      id: albumObject.id,
      originalAlbumId: albumObject.originalAlbumId,
      originalUserId: albumObject.originalUserId,
      title: albumObject.title
    }))
  );
};

// const buyAlbumToUser = async user => {
//   const createdUser = await User.createModel(user, {
//     include: [{ model: Album, as: 'albums', through: { attributes: [] } }]
//   });
//   console.log(createdUser);
// };

const buyAlbum = async () => {
  console.log('hola');
  console.log(await getAlbumsFromUser({ firstName: 'John' }));
  const user = await User.getOne({ id: 1 });
  console.log(user);
  const album = await Album.createModel({
    originalAlbumId: 553,
    originalUserId: 33,
    title: 'asdfasfa'
  });
  console.log(album);
  console.log(await user.addAlbum(album));
  // console.log(await buyAlbumToUser({ user }));
  console.log('chau');
};

module.exports = { buyAlbum };
