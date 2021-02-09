import { Resolvers } from './generated/graphql'
import { v4 as uuidv4 } from 'uuid'
import { ApolloError } from 'apollo-server'
import bcrypt from 'bcrypt'

const saltRounds = 10
// Resolvers define the technique for fetching the types defined in the
// schema.

// Info: Contains information about the operation's execution state,
// including the field name, the path to the field from the root, and more.
export const resolvers: Resolvers = {
    Query: {
        carsByUserID: (parent, { id }, { sequelize, User, Car }, info) => {
            try {
                return Car.findAll({
                    order: [['createdAt', 'DESC']],
                    include: [{ model: User }],
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
                    where: { username },
                })
                if (user) {
                }
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
        createUser: async (parent, { data }, { User }, info) => {
            try {
                const { username, password, ...rest } = data
                const prevUser = await User.findOne({
                    where: { username },
                })
                if (prevUser)
                    throw new Error(
                        'Username is already associated to another user.'
                    )
                const salt = await bcrypt.genSalt(saltRounds)
                const hashedPassword = await bcrypt.hash(password, salt)
                const id = uuidv4()
                return User.create({
                    id,
                    username,
                    password: hashedPassword,
                    ...rest,
                })
            } catch (err) {
                throw new ApolloError(err)
            }
        },
    },
}
