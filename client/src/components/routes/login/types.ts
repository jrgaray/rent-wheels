import { User } from 'gql/types'
export interface UserFormValues extends Omit<User, 'id' | 'email'> {}
