import gql from 'graphql-tag';

export const CREATE_COLUMN = gql`
    mutation CreateColumn($boardId: ID!, $name: String!) {
        createColumn(boardId: $boardId, name: $name) {
            id
        }
    }
`