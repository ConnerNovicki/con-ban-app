import gql from "graphql-tag";

export const DELETE_CARD = gql`
    mutation DeleteCard($id: ID!) {
        deleteCard(id: $id) {
            id
        }
    }
`