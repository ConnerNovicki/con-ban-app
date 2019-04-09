import gql from 'graphql-tag';

export const SAVE_USER = gql`
  mutation saveUser($user: String!) {
    saveUser(user: $user) @client
  }
`;