import { ApolloServer } from 'apollo-server'
import db from './db'
import typeDefs from './schema'
import { resolvers } from './resolvers'

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
        context: db,
    })

    // The `listen` method launches a web server.
    server.listen().then(({ url }) => {
        console.log(`🚀  Server ready at ${url}`)
    })
}

initDatabaseAndGraphQLServer()
