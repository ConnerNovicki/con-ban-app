import gql from "graphql-tag";

export const CREATE_BOARD = gql`
    mutation CreateBoard($userId: ID!, $name: String!) {
        createBoard(name: $name, userId: $userId) {
            id
        }
    }
`;