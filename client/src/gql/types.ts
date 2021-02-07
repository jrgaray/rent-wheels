interface User {
    id: string
    username: string
    password: string
    email: string
}
interface Car {
    id: string
    isActive: boolean
    make: string
    model: string
    year: string
    vin: string
    userID: string
    User: User
}
export interface CreateCarInput extends Omit<Car, 'id' | 'User'> {}

export interface CreateCarOutput extends Car {}

export interface CarsOutput {
    cars: Omit<Car, 'User'>[]
}
