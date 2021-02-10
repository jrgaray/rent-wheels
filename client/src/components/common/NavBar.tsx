import React, { FC } from 'react'
import styled from 'styled-components'

import { useDispatch } from 'app/store'
import { Link, useLocation } from 'react-router-dom'

import { clearUser } from 'ducks/userSlice'

import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const StyledTypography = styled(Typography)`
    && {
        flex-grow: 1;
    }
`

const StyledAppBar = styled(AppBar)`
    && {
        height: 64px;
    }
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
`

const NavBar: FC = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    return (
        <StyledAppBar position='sticky'>
            <Toolbar>
                <StyledTypography variant='h6'>Rent Wheels</StyledTypography>
                {pathname !== '/' && (
                    <StyledLink to='/'>
                        <Button
                            onClick={() => dispatch(clearUser())}
                            color='inherit'>
                            Logout
                        </Button>
                    </StyledLink>
                )}
            </Toolbar>
        </StyledAppBar>
    )
}
export default NavBar
