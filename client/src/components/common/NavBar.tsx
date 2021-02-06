import React, { FC } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import styled from 'styled-components'

const StyledTypography = styled(Typography)`
    && {
        flex-grow: 1;
    }
`

const NavBar: FC = () => {
    return (
        <AppBar position='sticky'>
            <Toolbar>
                <IconButton edge='start' color='inherit' aria-label='menu'>
                    <MenuIcon />
                </IconButton>
                <StyledTypography variant='h6'>Rent Wheels</StyledTypography>
                <Button color='inherit'>Logout</Button>
            </Toolbar>
        </AppBar>
    )
}
export default NavBar