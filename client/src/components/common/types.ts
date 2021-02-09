import { TextField } from '@material-ui/core'
import { Car, User } from 'gql/types'
import { DeepMap, FieldError, UseFormMethods } from 'react-hook-form'
import CreateCarDialog from './CreateCarDialog'
import CreateUserDialog from './CreateUserDialog'
import UpdateCarDialog from './UpdateCarDialog'

export type DialogComponents = {
    createCar: typeof CreateCarDialog
    updateCar: typeof UpdateCarDialog
    createUser: typeof CreateUserDialog
}

export type DialogComponentTypes = keyof DialogComponents

export interface ControlledTextProps {
    errors: DeepMap<Record<string, any>, FieldError>
    register: UseFormMethods['register']
    label: string
    name: string
    textFieldProps?: React.ComponentProps<typeof TextField>
}

export interface ControlledCheckboxProps {
    control: UseFormMethods['control']
    name: string
    label: string
}

export interface CreateUserFormValues extends Omit<User, 'id'> {}
export interface CreateCarFormValues extends Omit<Car, 'id' | 'User'> {}
export interface UpdateCarFormValues
    extends Omit<Car, 'userID' | 'User' | 'id' | 'isActive'> {}
