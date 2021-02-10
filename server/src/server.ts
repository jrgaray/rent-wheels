import { ApolloServer } from 'apollo-server'
import db, { User } from './db'
import typeDefs from './schema'
import { resolvers } from './resolvers'
import { getUser } from './utils'

export interface Context {
    user: User | null
    db: typeof db
}

const setUpDatabase: () => Promise<void> = async () => {
    try {
        // Authenticate our connection to the database.
        await db.sequelize.authenticate()
        console.log('Connection has been established successfully.')

        // Sync between the models in sequelize and the tables in
        // the database. If there are tables in sequelize that aren't
        // already present in the database, create the table.
        await db.sequelize.sync()
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

const initDatabaseAndGraphQLServer: () => Promise<void> = async () => {
    await setUpDatabase()
    // The ApolloServer constructor requires two parameters: your schema
    // definition and your set of resolvers.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: async ({ req, res }) => {
            const user = req.headers.authorization
                ? await getUser(req.headers.authorization)
                : null

            return { user, db }
        },
    })

    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`)
    })
}

initDatabaseAndGraphQLServer()
