import gql from "graphql-tag";

export const DELETE_COLUMN = gql`
    mutation DeleteColumn($id: ID!) {
        deleteColumn(id: $id) {
            id
        }
    }
`