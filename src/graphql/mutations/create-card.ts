import gql from 'graphql-tag';

export const CREATE_CARD = gql`
    mutation CreateCard($columnId: ID!, $name: String!, $color: String) {
        createCard(columnId: $columnId, name: $name, color: $color) {
            id
        }
    }
`