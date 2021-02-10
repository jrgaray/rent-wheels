import { gql } from '@apollo/client'

export const LOGIN = gql`
    query user($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            refresh
            user {
                id
                email
                username
            }
        }
    }
`

export const CARS_BY_USER_ID = gql`
    query carByUser {
        carsByUserID {
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
