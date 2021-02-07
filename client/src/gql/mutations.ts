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

export const UPDATE_CAR = gql`
    mutation updateCar($data: UpdateCarInput!) {
        updateCar(data: $data) {
            id
        }
    }
`

export const DELETE_CAR = gql`
    mutation deleteCar($id: String!) {
        deleteCar(id: $id)
    }
`
