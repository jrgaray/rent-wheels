import { TextField } from '@material-ui/core'
import { Car, User } from 'gql/types'
import { FunctionComponent } from 'react'
import { DeepMap, FieldError, UseFormMethods } from 'react-hook-form'

export type DialogComponents = {
    createCar: FunctionComponent
    updateCar: FunctionComponent
    createUser: FunctionComponent
}

export type DialogComponentTypes = keyof DialogComponents

export interface ControlledTextProps {
    errors: DeepMap<Record<string, any>, FieldError>
    register: UseFormMethods['register']
    label: string
    name: string
    textFieldProps?: React.ComponentProps<typeof TextField>
}

export interface CreateUserFormValues extends Omit<User, 'id'> {}
export interface CreateCarFormValues extends Omit<Car, 'id' | 'User'> {}
export interface UpdateCarFormValues
    extends Omit<Car, 'userID' | 'User' | 'id' | 'isActive'> {}
