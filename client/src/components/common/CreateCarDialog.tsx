import React, { FC } from 'react'
import { useMutation } from '@apollo/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'
import ControlledText from 'components/common/ControlledText'
import ControlledCheckbox from 'components/common/ControlledCheckbox'
import { CREATE_CAR } from 'gql/mutations'
import { CreateCarMutationInput, CreateCarMutationOutput } from 'gql/types'
import { useDispatch } from 'app/store'
import { closeDialog } from 'ducks/dialogSlice'
import getCars from 'thunks/getCars'
import { CreateCarFormValues } from './types'
import { openNotification } from 'ducks/notificationSlice'

const CreateCarDialog: FC = () => {
    const dispatch = useDispatch()

    const [createCar] = useMutation<
        CreateCarMutationOutput,
        CreateCarMutationInput
    >(CREATE_CAR, {
        onCompleted: () => {
            dispatch(getCars())
            dispatch(closeDialog())
        },
        onError: error =>
            dispatch(
                openNotification({ type: 'error', message: error.message })
            ),
    })
    const { handleSubmit, register, errors, control } = useForm()

    // Submit handler
    const onSubmit: SubmitHandler<CreateCarFormValues> = formValues =>
        createCar({
            variables: {
                data: {
                    ...formValues,
                },
            },
        })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle>Add Car</DialogTitle>
            <DialogContent>
                <ControlledText
                    register={() => register({ required: true })}
                    label='Make'
                    name='make'
                    errors={errors}
                />
                <ControlledText
                    register={() => register({ required: true })}
                    label='Model'
                    name='model'
                    errors={errors}
                />
                <ControlledText
                    register={() =>
                        register({
                            required: true,
                            pattern: {
                                value: /^[0-9]{4}$/,
                                message: 'Must be 4 digit year',
                            },
                            validate: (value: string) => {
                                const numberValue = parseInt(value)
                                if (!numberValue) {
                                    return 'value must be a number'
                                }
                                if (numberValue < 1900)
                                    return 'Must be greater than 1990'
                                if (numberValue > 2021)
                                    return 'Must be less than 2021'
                            },
                        })
                    }
                    label='Year'
                    name='year'
                    errors={errors}
                />
                <ControlledText
                    register={() =>
                        register({
                            required: true,
                            validate: (value: string) => {
                                if (value.length !== 17) {
                                    return 'VIN must be 17 characters'
                                }
                            },
                        })
                    }
                    label='VIN'
                    name='vin'
                    errors={errors}
                />
                <ControlledCheckbox
                    name='isActive'
                    control={control}
                    label='Active'
                />
            </DialogContent>
            <DialogActions>
                <Button type='submit' color='primary' variant='contained'>
                    Submit
                </Button>
            </DialogActions>
        </form>
    )
}

export default CreateCarDialog
