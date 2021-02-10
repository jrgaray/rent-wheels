import React, { FC, useEffect } from 'react'
import styled from 'styled-components'
import { List, Fab } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import CarItem from 'components/common/CarItem'
import { useDispatch, useSelector } from 'app/store'
import { openDialog } from 'ducks/dialogSlice'
import { clearCars } from 'ducks/carListSlice'
import getCars from 'thunks/getCars'

const StyledFab = styled(Fab)`
    && {
        position: fixed;
        bottom: 20px;
        right: 20px;
    }
`

const StyledList = styled(List)`
    && {
        height: 100%;
        overflow: scroll;
    }
`

const Container = styled.div`
    height: calc(100vh - 84px);
`

const Cars: FC = () => {
    const dispatch = useDispatch()
    const { cars } = useSelector(state => state.carList)
    useEffect(() => {
        dispatch(getCars())
        return () => {
            dispatch(clearCars())
        }
    }, [dispatch])
    return (
        <Container>
            <StyledList>
                {cars.map(carDetails => {
                    return (
                        <CarItem
                            key={carDetails.id}
                            image='https://img.hmn.com/fit-in/900x506/filters:upscale()/stories/2019/08/66765526-770-0@2X.jpg'
                            {...carDetails}
                        />
                    )
                })}
            </StyledList>
            <StyledFab
                onClick={() =>
                    dispatch(openDialog({ type: 'createCar', props: null }))
                }>
                <AddIcon />
            </StyledFab>
        </Container>
    )
}

export default Cars
