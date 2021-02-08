import React, { FC } from 'react'
import { useMutation } from '@apollo/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@material-ui/core'
import ControlledText from './ControlledText'
import { CREATE_CAR } from 'gql/mutations'
import { CreateCarMutationInput, CreateCarMutationOutput } from 'gql/types'
import { useDispatch } from 'app/store'
import { closeDialog } from 'ducks/dialogSlice'
import getCars from 'thunks/getCars'
import { CreateCarFormValues } from './types'

const CreateCarDialog: FC = () => {
    const dispatch = useDispatch()
    const [createCar] = useMutation<
        CreateCarMutationOutput,
        CreateCarMutationInput
    >(CREATE_CAR, {
        onCompleted: data => {
            dispatch(getCars())
            dispatch(closeDialog())
        },
    })
    const { handleSubmit, register, errors } = useForm()
    const onSubmit: SubmitHandler<CreateCarFormValues> = ({
        make,
        model,
        year,
        vin,
    }) => {
        createCar({
            variables: {
                data: {
                    make,
                    model,
                    year,
                    vin,
                    isActive: true,
                    userID: 'test',
                },
            },
        })
    }
    return (
        <>
            <DialogTitle
                id='form-dialog-title'
                data-testid='login-dialog-header'>
                Add Car
            </DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                        register={() => register({ required: true })}
                        label='Year'
                        name='year'
                        errors={errors}
                    />
                    <ControlledText
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

export default CreateCarDialog
