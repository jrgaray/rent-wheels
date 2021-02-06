import { Resolvers } from './generated/graphql'
import { v4 as uuidv4 } from 'uuid'
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

export const resolvers: Resolvers = {
    Query: {
        cars: (parent, args, { User, Car }, info) => {
            try {
                return Car.findAll({ include: User })
            } catch (err) {
                return err.message
            }
        },
        car: async (parent, { id }, { User, Car }, info) => {
            try {
                const thing = await Car.findByPk(id, {
                    include: User,
                })
                if (thing) return thing
                return null
            } catch (err) {
                console.error(err)
            }
        },
        user: (parent, args, { User }, info) => {
            try {
                return User.findByPk(args.id)
            } catch (err) {
                console.error(err)
            }
        },
    },
    Mutation: {
        createCar: (parent, { data }, { Car }, info) => {
            try {
                const id = uuidv4()
                const { ...args } = data
                console.log(args)
                return Car.create({ id, ...args })
            } catch (err) {
                console.error(err)
            }
        },
        updateCar: (parent, { data: { id, ...rest } }, { Car }, info) => {
            try {
                return Car.update({ ...rest }, { where: { id } })
            } catch (err) {
                console.error(err)
            }
        },
        deleteCar: async (parent, { id }, { Car }, info) => {
            try {
                await Car.destroy({ where: { id } })
                return id
            } catch (err) {
                console.error(err)
            }
        },
        createUser: (parent, args, { User }, info) => {
            try {
                return User.create({ ...args })
            } catch (err) {
                console.error(err)
            }
        },
    },
}
