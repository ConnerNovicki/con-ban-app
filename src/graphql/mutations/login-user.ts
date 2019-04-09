import gql from 'graphql-tag';

export const LOGIN_USER = gql`
  mutation LoginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
          id
          firstName
          lastName
      }
    }
  }
`;