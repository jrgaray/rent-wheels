import React, { FC } from 'react'
import { Controller } from 'react-hook-form'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { ControlledCheckboxProps } from 'components/common/types'

const ControlledCheckbox: FC<ControlledCheckboxProps> = ({
    control,
    name,
    label,
}) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={props => (
                <FormControlLabel
                    label={label}
                    value={true}
                    control={<Checkbox />}
                />
            )}
        />
    )
}

export default ControlledCheckbox
