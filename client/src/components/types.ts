import { User } from 'gql/types'
export interface UserFormValues extends Omit<User, 'id' | 'email'> {}

export type CarItemProps = {
    image: string
    vin: string
    isActive: boolean
    make: string
    model: string
    year: string
    id: string
    userID: string
}
