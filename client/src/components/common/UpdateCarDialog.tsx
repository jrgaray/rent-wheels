import React, { FC, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'
import ControlledText from './ControlledText'
import { useDispatch, useSelector } from 'app/store'
import { closeDialog } from 'ducks/dialogSlice'
import getCars from 'thunks/getCars'
import { UpdateCarMutationInput, UpdateCarMutationOutput } from 'gql/types'
import { UPDATE_CAR } from 'gql/mutations'
import { clearCar } from 'ducks/carSlice'
import { UpdateCarFormValues } from './types'
import { openNotification } from 'ducks/notificationSlice'

const UpdateCarDialog: FC = () => {
    const dispatch = useDispatch()
    const car = useSelector(state => state.car)
    useEffect(
        () => () => {
            dispatch(clearCar())
        },
        [dispatch]
    )
    // Mutation Hook
    const [updateCar] = useMutation<
        UpdateCarMutationOutput,
        UpdateCarMutationInput
    >(UPDATE_CAR, {
        onCompleted: () => {
            dispatch(getCars())
            dispatch(closeDialog())
        },
        onError: error =>
            dispatch(
                openNotification({ type: 'error', message: error.message })
            ),
    })

    // Form Hook
    const { handleSubmit, register, errors } = useForm()

    // Submit handler.
    const onSubmit: SubmitHandler<UpdateCarFormValues> = ({
        make,
        model,
        year,
        vin,
    }) => {
        updateCar({
            variables: {
                data: {
                    id: car.id,
                    isActive: true,
                    make,
                    model,
                    year,
                    vin,
                },
            },
        })
    }
    return (
        <>
            <DialogTitle id='form-dialog-title'>Update Car</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <ControlledText
                        textFieldProps={{ defaultValue: car.make }}
                        register={() => register({ required: true })}
                        label='Make'
                        name='make'
                        errors={errors}
                    />
                    <ControlledText
                        textFieldProps={{ defaultValue: car.model }}
                        register={() => register({ required: true })}
                        label='Model'
                        name='model'
                        errors={errors}
                    />
                    <ControlledText
                        textFieldProps={{ defaultValue: car.year }}
                        register={() => register({ required: true })}
                        label='Year'
                        name='year'
                        errors={errors}
                    />
                    <ControlledText
                        textFieldProps={{ defaultValue: car.vin }}
                        register={() => register({ required: true })}
                        label='VIN'
                        name='vin'
                        errors={errors}
                    />
                </DialogContent>
                <DialogActions>
                    <Button type='submit' color='primary' variant='contained'>
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </>
    )
}

export default UpdateCarDialog
