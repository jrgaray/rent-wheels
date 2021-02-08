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
import { CREATE_USER } from 'gql/mutations'
import { CreateUserMutationInput, CreateUserMutationOutput } from 'gql/types'
import { useDispatch } from 'app/store'
import { closeDialog } from 'ducks/dialogSlice'
import { CreateUserFormValues } from './types'
import { openNotification } from 'ducks/notificationSlice'

const CreateUserDialog: FC = () => {
    const dispatch = useDispatch()
    const [createUser] = useMutation<
        CreateUserMutationOutput,
        CreateUserMutationInput
    >(CREATE_USER, {
        onCompleted: data => {
            dispatch(closeDialog())
        },
        onError: error =>
            dispatch(
                openNotification({ type: 'error', message: error.message })
            ),
    })
    const { handleSubmit, register, errors } = useForm()
    const onSubmit: SubmitHandler<CreateUserFormValues> = ({
        username,
        password,
        email,
    }) => {
        createUser({ variables: { data: { username, password, email } } })
    }
    return (
        <>
            <DialogTitle id='form-dialog-title'>Create an Account</DialogTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <DialogContent>
                    <ControlledText
                        register={() => register({ required: true })}
                        label='Email'
                        name='email'
                        errors={errors}
                    />
                    <ControlledText
                        register={() => register({ required: true })}
                        label='Username'
                        name='username'
                        errors={errors}
                    />
                    <ControlledText
                        register={() => register({ required: true })}
                        label='Password'
                        name='password'
                        errors={errors}
                        textFieldProps={{ type: 'password' }}
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

export default CreateUserDialog
