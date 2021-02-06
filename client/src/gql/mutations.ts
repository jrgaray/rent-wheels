import { gql } from '@apollo/client'

export const CREATE_CAR = gql`
    mutation createCar($data: CreateCarInput!) {
        createCar(data: $data) {
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
