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

const UpdateCarDialog: FC = () => {
    const dispatch = useDispatch()
    const car = useSelector(state => state.car)
    useEffect(
        () => () => {
            dispatch(clearCar())
        },
        [dispatch]
    )
    const [updateCar] = useMutation<UpdateCarMutationOutput>(UPDATE_CAR, {
        onCompleted: data => {
            dispatch(getCars())
            dispatch(closeDialog())
        },
    })
    const { handleSubmit, register, errors } = useForm()
    const onSubmit: SubmitHandler<UpdateCarMutationInput> = ({
        make,
        model,
        year,
        vin,
    }) => {
        console.log('submit edit')
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
