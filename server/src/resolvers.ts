import { Resolvers } from './generated/graphql'
import { v4 as uuidv4 } from 'uuid'
import { ApolloError } from 'apollo-server'
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

export const resolvers: Resolvers = {
    Query: {
        cars: (parent, args, { User, Car }, info) => {
            try {
                return Car.findAll({ include: User })
            } catch (err) {
                throw new ApolloError('Could not get car list.')
            }
        },
        user: async (parent, { username, password }, { User }, info) => {
            try {
                const user = await User.findOne({
                    where: { username, password },
                })
                if (user) return user
                throw new Error()
            } catch (err) {
                throw new ApolloError('Invalid credentials. No user was found.')
            }
        },
    },
    Mutation: {
        createCar: (parent, { data }, { Car }, info) => {
            try {
                const id = uuidv4()
                const { ...args } = data
                return Car.create({ id, ...args })
            } catch (err) {
                throw new ApolloError('Could not create car.')
            }
        },
        updateCar: (parent, { data: { id, ...rest } }, { Car }, info) => {
            try {
                return Car.update({ ...rest }, { where: { id } })
            } catch (err) {
                throw new ApolloError('Could not update car.')
            }
        },
        deleteCar: async (parent, { id }, { Car }, info) => {
            try {
                await Car.destroy({ where: { id } })
                return id
            } catch (err) {
                throw new ApolloError('Could not delete car.')
            }
        },
        createUser: (parent, { data }, { User }, info) => {
            try {
                const id = uuidv4()
                return User.create({ id, ...data })
            } catch (err) {
                throw new ApolloError('Could not create user.')
            }
        },
    },
}
