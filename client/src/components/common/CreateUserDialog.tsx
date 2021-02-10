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
import { setUser } from 'ducks/userSlice'
import { batch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const CreateUserDialog: FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    // CreateUser mutation
    const [createUser] = useMutation<
        CreateUserMutationOutput,
        CreateUserMutationInput
    >(CREATE_USER, {
        // Set the user, close the dialog and push the user to the cars page.
        onCompleted: ({ createUser: { refresh, token, user } }) => {
            console.log('createuser', token)

            dispatch(setUser({ ...user, token }))
            dispatch(closeDialog())
            history.push('/cars')
        },
        // Open notification.
        onError: error =>
            dispatch(
                openNotification({ type: 'error', message: error.message })
            ),
        fetchPolicy: 'no-cache',
    })

    // Hook for form.
    const { handleSubmit, register, errors } = useForm()

    // onSubmit handler
    const onSubmit: SubmitHandler<CreateUserFormValues> = formValues =>
        createUser({ variables: { data: { ...formValues } } })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <DialogTitle id='form-dialog-title'>Create an Account</DialogTitle>
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
    )
}

export default CreateUserDialog
