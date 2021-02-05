import { Resolvers } from './generated/graphql'
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

export const resolvers: Resolvers = {
    Query: {
        cars: (parent, args, { Car }, info) => {
            try {
                return Car.findAll()
            } catch (err) {
                return err.message
            }
        },
        car: async (parent, { id }, { Car }, info) => {
            try {
                const thing = await Car.findByPk(id)
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
        createCar: (parent, args, { Car }, info) => {
            try {
                // const id = uuid.v4()
                return Car.create({ ...args })
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
