import React, { FC } from 'react'
import styled from 'styled-components'

import { useHistory } from 'react-router-dom'
import { useLazyQuery } from '@apollo/client'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch } from 'app/store'

import {
    Link,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@material-ui/core'
import ControlledText from 'components/common/ControlledText'

import { openDialog } from 'ducks/dialogSlice'
import { setUser } from 'ducks/userSlice'
import { openNotification } from 'ducks/notificationSlice'

import { LOGIN } from 'gql/queries'
import { LoginQueryInput, LoginQueryOutput } from 'gql/types'
import { UserFormValues } from './types'

const Container = styled.div`
    display: flex;
    height: calc(100vh - 64px);
    justify-content: center;
    align-items: center;
    background-color: #c51162;
`

const StyledCard = styled(Card)`
    && {
        min-width: 300px;
        min-height: 275px;
        max-width: 600px;
        margin: 10px;
        padding: 20px 0;
    }
`

const StyledCardActions = styled(CardActions)`
    && {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr;
    }
`

const Login: FC = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    // Wait to get the user.
    const [getUser] = useLazyQuery<LoginQueryOutput, LoginQueryInput>(LOGIN, {
        fetchPolicy: 'cache-and-network',
        onCompleted: ({ login: { refresh, token, user } }) => {
            dispatch(setUser({ ...user, token }))
            history.push('/cars')
        },
        onError: err => {
            dispatch(openNotification({ type: 'error', message: err.message }))
        },
    })

    // Form Hook
    const { handleSubmit, register, errors } = useForm()

    // onSubmit handler
    const onSubmit: SubmitHandler<UserFormValues> = ({ username, password }) =>
        getUser({ variables: { username, password } })

    return (
        <Container>
            <StyledCard>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <CardContent>
                        <Typography variant='h4'>Rent Wheels</Typography>
                        <ControlledText
                            errors={errors}
                            label={'Username'}
                            name={'username'}
                            register={() => register({ required: true })}
                            textFieldProps={{
                                autoComplete: 'off',
                                defaultValue: '',
                                variant: 'standard',
                            }}
                        />
                        <ControlledText
                            errors={errors}
                            label={'Password'}
                            name={'password'}
                            register={() => register({ required: true })}
                            textFieldProps={{
                                type: 'password',
                                variant: 'standard',
                            }}
                        />
                    </CardContent>
                    <StyledCardActions>
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'>
                            Login
                        </Button>
                        <Link
                            component='button'
                            type='button'
                            variant='caption'
                            onClick={() =>
                                dispatch(
                                    openDialog({
                                        type: 'createUser',
                                        props: null,
                                    })
                                )
                            }>
                            Create Account
                        </Link>
                    </StyledCardActions>
                </form>
            </StyledCard>
        </Container>
    )
}

export default Login
