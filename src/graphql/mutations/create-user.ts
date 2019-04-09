import gql from 'graphql-tag';

export const CREATE_USER = gql`
  mutation CreateUser($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!) {
    createUser(firstName: $firstName, lastName: $lastName, email: $email, username: $username, password: $password) {
      token
      user {
          id
          firstName
          lastName
      }
    }
  }
`;