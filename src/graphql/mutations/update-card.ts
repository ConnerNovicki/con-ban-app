import gql from "graphql-tag";

export const UPDATE_CARD = gql`
    mutation UpdateCard($id: ID!, $name: String, $color: String) {
        updateCard(id: $id, color: $color, name: $name) {
            id
        }
    }
`