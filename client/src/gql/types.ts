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

//*****************************************************************/
//                          Queries
//*****************************************************************/
export interface CarsByUserIDQueryInput {
    id: string
}

export interface CarsByUserIDQueryOutput {
    carsByUserID: Omit<Car, 'User'>[]
}
export interface CarQueryInput {
    id: string
}
export interface CarQueryOutput {
    car: Omit<Car, 'user'>
}
export interface UserQueryInput extends Omit<User, 'id' | 'email'> {}
export interface UserQueryOutput {
    user: Omit<User, 'password'>
}

//*****************************************************************/
//                          Mutations
//*****************************************************************/

export interface CreateCarMutationInput {
    data: Omit<Car, 'id' | 'User'>
}

export interface UpdateCarMutationInput {
    data: Omit<Car, 'userID' | 'User'>
}

export interface CreateCarMutationOutput extends Car {}
export interface UpdateCarMutationOutput extends Car {}

export interface CreateUserMutationInput {
    data: Omit<User, 'id'>
}
export interface CreateUserMutationOutput {
    createUser: User
}
