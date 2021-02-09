import { gql } from '@apollo/client'

export const USER = gql`
    query user($username: String!, $password: String!) {
        user(username: $username, password: $password) {
            id
            username
            email
        }
    }
`

export const CARS_BY_USER_ID = gql`
    query carByUser($id: String!) {
        carsByUserID(id: $id) {
            id
            isActive
            make
            model
            year
            userID
            vin
        }
    }
`
