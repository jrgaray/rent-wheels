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

export const CARS = gql`
    query cars {
        cars {
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
