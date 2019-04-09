import gql from "graphql-tag";

export const GET_BOARD = gql`
    query GetBoard($id: ID!) {
        getBoard(boardId: $id) {
            id
            name
            columns {
                id
                name
                cards {
                    id
                    name
                    color
                }
            }
        }
    }
`