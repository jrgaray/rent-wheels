import { gql } from '@apollo/client'

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
