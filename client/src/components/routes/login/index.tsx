import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core'

const Login: FC = () => {
    const history = useHistory()
    const handleClick = () => {
        history.push('/cars')
    }
    return (
        <div>
            <Button onClick={handleClick}>Login</Button>
        </div>
    )
}

export default Login
