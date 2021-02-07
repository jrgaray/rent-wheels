import { TextField } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { DeepMap, FieldError, UseFormMethods } from 'react-hook-form'
import CreateCarDialog from 'components/common/CreateCarDialog'

export type DialogComponents = {
    createCar: FunctionComponent
    updateCar: FunctionComponent
}

export type DialogComponentTypes = keyof DialogComponents

export interface ControlledTextProps {
    errors: DeepMap<Record<string, any>, FieldError>
    register: UseFormMethods['register']
    label: string
    name: string
    textFieldProps?: React.ComponentProps<typeof TextField>
}
