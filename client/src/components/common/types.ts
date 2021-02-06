import { TextField } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { DeepMap, FieldError, UseFormMethods } from 'react-hook-form'

export type DialogComponents = {
    createCar: FunctionComponent
    // updateCar: FunctionComponent
    // deleteCar: FunctionComponent
}

export type DialogComponentTypes = keyof DialogComponents

export interface ControlledTextProps {
    errors: DeepMap<Record<string, any>, FieldError>
    register: UseFormMethods['register']
    label: string
    name: string
    textFieldProps?: React.ComponentProps<typeof TextField>
}

export interface CreateCarInputValues {
    make: string
    model: string
    year: string
    vin: string
}
