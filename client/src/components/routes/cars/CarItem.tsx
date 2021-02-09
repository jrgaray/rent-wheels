import React, { FC } from 'react'
import { batch } from 'react-redux'
import styled from 'styled-components'

import { useMutation } from '@apollo/client'
import { useDispatch } from 'app/store'

import {
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import getCars from 'thunks/getCars'
import { setCar } from 'ducks/carSlice'
import { openDialog } from 'ducks/dialogSlice'
import { openNotification } from 'ducks/notificationSlice'

import { DELETE_CAR } from 'gql/mutations'
import { CarItemProps } from 'components/routes/cars/types'

const StyledImage = styled.img`
    object-fit: cover;
    margin-right: 8px;
    max-width: 140px;
    @media (min-width: 576px) {
        max-width: 300px;
    }
`

const CarItem: FC<CarItemProps> = ({
    image,
    vin,
    isActive,
    make,
    model,
    year,
    id,
}) => {
    const dispatch = useDispatch()
    const [deleteCar] = useMutation<string>(DELETE_CAR, {
        onCompleted: () => dispatch(getCars()),
        onError: err =>
            dispatch(openNotification({ type: 'error', message: err.message })),
    })
    const handleDelete = () => deleteCar({ variables: { id } })
    const handleEdit = () => {
        batch(() => {
            dispatch(setCar({ id, vin, isActive, make, model, year }))
            dispatch(openDialog({ type: 'updateCar' }))
        })
    }

    return (
        <ListItem onClick={handleEdit} button divider={true}>
            <StyledImage alt='car-image' src={image} />
            <ListItemText
                primaryTypographyProps={{
                    variant: 'subtitle1',
                }}
                secondaryTypographyProps={{
                    variant: 'caption',
                }}
                secondary={
                    <>
                        {`VIN: ${vin}`}
                        <br />
                        {`   STATUS: ${isActive ? 'ACTIVE' : 'INACTIVE'}`}
                    </>
                }
                primary={`${year} ${make} ${model}`}
            />
            <ListItemSecondaryAction>
                <IconButton onClick={handleDelete} edge='end'>
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default CarItem
