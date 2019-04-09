import gql from "graphql-tag";

export const GET_USER_BOARDS = gql`
    query GetBoardsForUser($userId: ID!) {
        getBoardsForUser(userId: $userId) {
            id
            name
        }
    }
`;