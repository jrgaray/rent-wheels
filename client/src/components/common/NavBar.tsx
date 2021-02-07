import React, { FC } from 'react'
import styled from 'styled-components'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Link, useLocation } from 'react-router-dom'
// import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'

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
    const { pathname } = useLocation()
    return (
        <StyledAppBar position='sticky'>
            <Toolbar>
                {/* <IconButton edge='start' color='inherit' aria-label='menu'>
                    <MenuIcon />
                </IconButton> */}
                <StyledTypography variant='h6'>Rent Wheels</StyledTypography>
                {pathname !== '/' && (
                    <StyledLink to='/'>
                        <Button color='inherit'>Logout</Button>
                    </StyledLink>
                )}
            </Toolbar>
        </StyledAppBar>
    )
}
export default NavBar
