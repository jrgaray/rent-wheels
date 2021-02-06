import React, { FunctionComponent } from 'react'
import { TextField } from '@material-ui/core'
import { ControlledTextProps } from './types'

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
            helperText={errors[name] && `${label} is required.`}
            {...textFieldProps}
        />
    )
}
export default ControlledText
