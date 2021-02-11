//*****************************************************************/
//                          Models
//*****************************************************************/
export interface User {
    id: string
    username: string
    password: string
    email: string
}

export interface Car {
    id: string
    isActive: boolean
    make: string
    model: string
    year: string
    vin: string
    userID: string
    User: User
}
export interface JWTTokens {
    token: string
    refresh: string
    user: User
}

//*****************************************************************/
//                          Queries
//*****************************************************************/
export interface CarsByUserIDQueryOutput {
    carsByUserID: Omit<Car, 'User'>[]
}

export interface LoginQueryInput extends Omit<User, 'id' | 'email'> {}
export interface LoginQueryOutput {
    login: JWTTokens
}

//*****************************************************************/
//                          Mutations
//*****************************************************************/

export interface CreateCarMutationInput {
    data: Omit<Car, 'id' | 'User' | 'userID'>
}
export interface CreateCarMutationOutput extends Car {}

export interface UpdateCarMutationInput {
    data: Omit<Car, 'userID' | 'User'>
}
export interface UpdateCarMutationOutput extends Car {}

export interface CreateUserMutationInput {
    data: Omit<User, 'id'>
}
export interface CreateUserMutationOutput {
    createUser: JWTTokens
}
