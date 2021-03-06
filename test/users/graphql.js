const { gql } = require('apollo-server');

const getUser = id => gql`
    query {
        user(id: ${id}) {
          firstName,
          lastName,
          email
        }
      }`;

const getUsers = () => gql`
  query {
    users {
      firstName
      lastName
      email
    }
  }
`;

const createUser = userInput => ({
  mutation: gql`
    mutation createUser($userInput: UserInput!) {
      createUser(user: $userInput) {
        firstName
        lastName
        id
        username
        password
        email
      }
    }
  `,
  variables: { userInput }
});

const login = loginInput => ({
  mutation: gql`
    mutation login($loginInput: LoginInput!) {
      login(credentials: $loginInput) {
        accessToken
        expiresIn
      }
    }
  `,
  variables: { loginInput }
});

const buyAlbum = albumId => ({
  mutation: gql`
    mutation buyAlbum($albumId: Int!) {
      buyAlbum(albumId: $albumId) {
        originalUserId
        originalAlbumId
        title
      }
    }
  `,
  variables: { albumId }
});

module.exports = { getUser, getUsers, createUser, login, buyAlbum };
