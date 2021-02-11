import React, { FunctionComponent } from 'react'
import { TextField } from '@material-ui/core'
import { ControlledTextProps } from './types'

const getErrorText = (errors: any, name: string, label: string) => {
    if (!errors[name]) return
    if (errors[name].type === 'required') return `${label} is required.`
    return errors[name].message
}

const ControlledText: FunctionComponent<ControlledTextProps> = ({
    errors,
    label,
    register,
    name,
    textFieldProps,
}) => {
    return (
        <TextField
            inputRef={register()}
            label={label}
            type='text'
            name={name}
            variant='outlined'
            margin='dense'
            defaultValue=''
            error={errors[name] ? true : false}
            fullWidth
            helperText={getErrorText(errors, name, label)}
            {...textFieldProps}
        />
    )
}
export default ControlledText
