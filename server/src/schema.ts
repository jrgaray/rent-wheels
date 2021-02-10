import { gql } from 'apollo-server'

const schema = gql`
    # --------------------------
    #           Types
    # --------------------------
    type User {
        id: String
        username: String
        password: String
        email: String
        createdAt: String
        updatedAt: String
    }

    type Car {
        id: String
        isActive: Boolean
        make: String
        model: String
        year: String
        userID: String
        User: User
        vin: String
        createdAt: String
        updatedAt: String
    }

    type TokenAuth {
        token: String!
        refresh: String!
        user: User!
    }

    # --------------------------
    #           Inputs
    # --------------------------
    input CreateCarInput {
        isActive: Boolean!
        make: String!
        model: String!
        year: String!
        vin: String!
        userID: String!
    }

    input UpdateCarInput {
        isActive: Boolean!
        make: String!
        model: String!
        year: String!
        id: String!
        vin: String!
    }

    input CreateUserInput {
        username: String!
        password: String!
        email: String!
    }

    # --------------------------
    #          Queries
    # --------------------------
    type Query {
        carsByUserID: [Car]!
        login(username: String!, password: String!): TokenAuth!
    }

    # --------------------------
    #          Mutations
    # --------------------------
    type Mutation {
        createCar(data: CreateCarInput!): Car!
        updateCar(data: UpdateCarInput!): Car!
        deleteCar(id: String!): String!
        createUser(data: CreateUserInput!): TokenAuth!
    }
`

export default schema
