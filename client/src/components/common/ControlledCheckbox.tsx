import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { ControlledCheckboxProps } from 'components/common/types'

const ControlledCheckbox: FC<ControlledCheckboxProps> = ({
    control,
    name,
    label,
    defaultValue,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue ?? false}
            render={props => (
                <FormControlLabel
                    checked={props.value}
                    label={label}
                    onChange={(event, checked) => {
                        props.onChange(checked)
                    }}
                    control={<Checkbox />}
                />
            )}
        />
    )
}

export default ControlledCheckbox
