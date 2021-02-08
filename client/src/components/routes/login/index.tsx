import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import {
    Link,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
} from '@material-ui/core'
import { SubmitHandler, useForm } from 'react-hook-form'
import ControlledText from 'components/common/ControlledText'
import styled from 'styled-components'
import { useDispatch } from 'app/store'
import { openDialog } from 'ducks/dialogSlice'
import { setUser } from 'ducks/userSlice'

import { useLazyQuery } from '@apollo/client'
import { USER } from 'gql/queries'
import { UserQueryInput, UserQueryOutput } from 'gql/types'
import { UserFormValues } from './types'
import { openNotification } from 'ducks/notificationSlice'

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
    const { handleSubmit, register, errors } = useForm()
    const [getUser] = useLazyQuery<UserQueryOutput, UserQueryInput>(USER, {
        onCompleted: ({ user }) => {
            dispatch(setUser(user))
            history.push('/cars')
        },
        onError: err => {
            dispatch(openNotification({ type: 'error', message: err.message }))
        },
    })
    const onSubmit: SubmitHandler<UserFormValues> = ({
        username,
        password,
    }) => {
        getUser({ variables: { username, password } })
    }
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
                                dispatch(openDialog({ type: 'createUser' }))
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
