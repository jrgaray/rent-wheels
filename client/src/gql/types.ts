interface User {
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

export interface CarsQueryOutput {
    cars: Omit<Car, 'User'>[]
}
export interface CarQueryInput {
    id: string
}
export interface CarQueryOutput {
    car: Omit<Car, 'user'>
}
export interface UserQueryOutput {
    user: Omit<User, 'password'>
}

export interface CreateCarMutationInput {
    make: string
    model: string
    year: string
    vin: string
}

export interface UpdateCarMutationInput extends CreateCarMutationInput {
    isActive: boolean
}

export interface CreateCarMutationOutput extends Car {}
export interface UpdateCarMutationOutput extends Car {}
