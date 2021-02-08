import { Resolvers } from './generated/graphql'
import { v4 as uuidv4 } from 'uuid'
import { ApolloError } from 'apollo-server'

// Resolvers define the technique for fetching the types defined in the
// schema.

// Info: Contains information about the operation's execution state,
// including the field name, the path to the field from the root, and more.
export const resolvers: Resolvers = {
    Query: {
        carsByUserID: (parent, { id }, { User, Car }, info) => {
            try {
                return Car.findAll({
                    order: [['createdAt', 'DESC']],
                    include: User,
                    where: { userID: id },
                })
            } catch (err) {
                throw new ApolloError('Could not get car list.')
            }
        },
        cars: (parent, args, { User, Car }, info) => {
            try {
                return Car.findAll({ include: User })
            } catch (err) {
                throw new ApolloError('Could not get car list.')
            }
        },
        user: async (parent, { username, password }, { User }, info) => {
            try {
                if (!username || !password)
                    throw new Error('Missing username/password.')
                const user = await User.findOne({
                    where: { username, password },
                })
                if (user) return user
                throw new Error('No user with those credentials')
            } catch (err) {
                throw new ApolloError(err)
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
