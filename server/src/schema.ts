import { gql } from 'apollo-server'

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const schema = gql`
    type User {
        id: String
        username: String
        password: String
        email: String
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
    }

    # The "Query" type is special: it lists all of the available queries that
    # clients can execute, along with the return type for each. In this
    # case, the "books" query returns an array of zero or more Books (defined above).
    type Query {
        cars: [Car]!
        # car(id: String!): Car
        user(username: String!, password: String!): User!
    }
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
        username: String
        password: String
        email: String
    }

    type Mutation {
        createCar(data: CreateCarInput!): Car!
        updateCar(data: UpdateCarInput!): Car!
        deleteCar(id: String!): String!
        createUser(data: CreateUserInput!): User
    }
`

export default schema
