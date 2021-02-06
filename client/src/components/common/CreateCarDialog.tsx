import React from 'react'
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
import { CreateCarOutput } from 'gql/types'
import { CreateCarInputValues } from './types'
const CreateCarDialog = () => {
    const [createCar] = useMutation<CreateCarOutput>(CREATE_CAR, {
        onCompleted: data => {
            console.log(data)
        },
    })
    const { handleSubmit, register, errors } = useForm()
    const onSubmit: SubmitHandler<CreateCarInputValues> = ({
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
                Login
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
