import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import decode from 'jwt-decode'
import db, { User } from './db'
import {
    IsValidPasswordFunction,
    HashPasswordFunction,
    CreateJWTFunction,
} from './types'

const SALT_ROUNDS = 10
export const isValidPassword: IsValidPasswordFunction = (password, hash) =>
    bcrypt.compareSync(password, hash)

export const hashPassword: HashPasswordFunction = async password => {
    const salt = await bcrypt.genSalt()
    console.log('after salt')
    return bcrypt.hash(password, salt)
}

export const createJWT: CreateJWTFunction = (username, id, email) => ({
    token: jwt.sign({ username, id, email }, process.env.TOKEN_SECRET ?? '', {
        expiresIn: 60 * 5,
    }),
    refresh: jwt.sign(
        { username, id, email },
        process.env.REFRESH_TOKEN_SECRET ?? '',
        {
            expiresIn: '1 day',
        }
    ),
})

export const getUser: (jwt: string) => Promise<User | null> = async (
    jwt: string
) => {
    const decodedJWT: {
        username: string
        id: string
        email: string
    } = decode(jwt)
    return db.User.findByPk(decodedJWT.id)
}
