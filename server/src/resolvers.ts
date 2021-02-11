import { Resolvers } from './generated/graphql'
import { v4 as uuidv4 } from 'uuid'
import { ApolloError } from 'apollo-server'
import { isValidPassword, hashPassword, createJWT } from './utils'

// Resolvers define the technique for fetching the types defined in the
// schema.

// Info: Contains information about the operation's execution state,
// including the field name, the path to the field from the root, and more.
export const resolvers: Resolvers = {
    Query: {
        carsByUserID: (parent, args, { user, db: { User, Car } }, info) => {
            try {
                if (!user)
                    throw new Error('Invalid action. User not logged in.')
                return Car.findAll({
                    order: [['createdAt', 'DESC']],
                    include: [{ model: User }],
                    where: { userID: user?.id },
                })
            } catch (err) {
                throw new ApolloError(err)
            }
        },
        login: async (
            parent,
            { username, password },
            { db: { User } },
            info
        ) => {
            try {
                const user = await User.findOne({
                    where: { username },
                })
                if (!user) throw new Error('No user with those credentials')
                if (!isValidPassword(password, user.password))
                    throw new Error('Invalid Password')
                return {
                    ...createJWT(user.username, user.id, user.email),
                    user,
                }
            } catch (err) {
                throw new ApolloError(err)
            }
        },
    },
    Mutation: {
        createCar: (parent, { data }, { user, db: { Car } }, info) => {
            try {
                if (!user)
                    throw new Error('Invalid action. User not logged in.')
                const id = uuidv4()
                const { ...args } = data
                return Car.create({ id, ...args })
            } catch (err) {
                throw new ApolloError(err)
            }
        },
        updateCar: (
            parent,
            { data: { id, ...rest } },
            { user, db: { Car } },
            info
        ) => {
            try {
                if (!user)
                    throw new Error('Invalid action. User not logged in.')
                return Car.update({ ...rest }, { where: { id } })
            } catch (err) {
                throw new ApolloError(err)
            }
        },
        deleteCar: async (parent, { id }, { user, db: { Car } }, info) => {
            try {
                if (!user)
                    throw new Error('Invalid action. User not logged in.')
                await Car.destroy({ where: { id } })
                return id
            } catch (err) {
                throw new ApolloError(err)
            }
        },
        createUser: async (parent, { data }, { db: { User } }, info) => {
            try {
                const { password, ...userInfo } = data
                const prevUser = await User.findOne({
                    where: { username: data.username },
                })
                if (prevUser)
                    throw new Error(
                        'Username is already associated to another user.'
                    )

                const hashedPassword = await hashPassword(password)
                const newUser = await User.create({
                    id: uuidv4(),
                    password: hashedPassword,
                    ...userInfo,
                })

                return {
                    ...createJWT(newUser.username, newUser.id, newUser.email),
                    user: newUser,
                }
            } catch (err) {
                throw new ApolloError(err)
            }
        },
    },
}
