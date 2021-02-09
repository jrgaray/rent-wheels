import { ComponentProps } from 'react'
import { TextField } from '@material-ui/core'
import { Car, User } from 'gql/types'
import { DeepMap, FieldError, UseFormMethods } from 'react-hook-form'
import CreateCarDialog from './CreateCarDialog'
import CreateUserDialog from './CreateUserDialog'
import UpdateCarDialog from './UpdateCarDialog'

// ********************************************************
//          Typing for Dialog Component
// ********************************************************
export type DialogComponents = {
    createCar: typeof CreateCarDialog
    updateCar: typeof UpdateCarDialog
    createUser: typeof CreateUserDialog
}

export type DialogComponentTypes = keyof DialogComponents

export type DialogComponentPropTypes =
    | ComponentProps<typeof CreateCarDialog>
    | ComponentProps<typeof UpdateCarDialog>
    | ComponentProps<typeof CreateUserDialog>

// ********************************************************
//          Typing for Component Props
// ********************************************************
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
    defaultValue?: boolean
}

export interface UpdateCarDialogProps {
    id: string
    make: string
    model: string
    year: string
    vin: string
    isActive: boolean
}

// ********************************************************
//          Typing for Form Values
// ********************************************************
export interface CreateUserFormValues extends Omit<User, 'id'> {}
export interface CreateCarFormValues extends Omit<Car, 'id' | 'User'> {}
export interface UpdateCarFormValues
    extends Omit<Car, 'userID' | 'User' | 'id'> {}
