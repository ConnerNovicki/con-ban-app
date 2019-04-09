import gql from 'graphql-tag';

export const DELETE_USER_BOARD = gql`
    mutation DeleteUserBoard($boardId: ID!) {
        deleteUserBoard(boardId: $boardId) {
            id
        }
    }
`