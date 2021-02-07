import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { Container as MuiContainer, List, Paper, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CarItem from 'components/routes/cars/CarItem'
import { useDispatch, useSelector } from 'app/store'
import { openDialog } from 'ducks/dialogSlice'
import getCars from 'thunks/getCars'

const Container = styled(MuiContainer)`
    && {
        height: calc(100vh - 64px);
        transform: translate3d(0, 0, 0);
    }
` as typeof MuiContainer

// https://stackoverflow.com/questions/21091958/css-fixed-child-element-positions-relative-to-parent-element-not-to-the-viewpo
// Interesting css trick that I found to get the Fab to be fixed relative to the div.
const StyledFab = styled(Fab)`
    && {
        position: fixed;
        bottom: 20px;
        right: 20px;
    }
`

const Cars: FC = () => {
    const dispatch = useDispatch()
    const { cars } = useSelector(state => state.cars)
    useEffect(() => {
        dispatch(getCars())
    }, [dispatch])
    return (
        <Container component={Paper}>
            <List>
                {cars.map(carDetails => {
                    return (
                        <CarItem
                            key={carDetails.id}
                            divider={false}
                            image='https://img.hmn.com/fit-in/900x506/filters:upscale()/stories/2019/08/66765526-770-0@2X.jpg'
                            {...carDetails}
                        />
                    )
                })}
            </List>
            <StyledFab onClick={() => dispatch(openDialog('createCar'))}>
                <AddIcon />
            </StyledFab>
        </Container>
    )
}

export default Cars
