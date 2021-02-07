import React, { FC } from 'react'
import {
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core'
import styled from 'styled-components'
import { Delete } from '@material-ui/icons'
import { CarItemProps } from './types'
import { DELETE_CAR } from 'gql/mutations'
import { useMutation } from '@apollo/client'
import { useDispatch } from 'app/store'
import getCars from 'thunks/getCars'
const StyledImage = styled.img`
    object-fit: cover;
    margin-right: 8px;
    max-width: 140px;
    @media (min-width: 576px) {
        max-width: 300px;
    }
`

const StyledListItem = styled(ListItem)`
    && {
    }
`

const CarItem: FC<CarItemProps> = ({
    divider,
    image,
    vin,
    isActive,
    make,
    model,
    year,
    id,
    userID,
}) => {
    const dispatch = useDispatch()
    const [deleteCar] = useMutation<string>(DELETE_CAR, {
        onCompleted: () => {
            dispatch(getCars())
        },
    })
    const handleDelete = () => {
        deleteCar({ variables: { id } })
    }
    return (
        <StyledListItem
            onClick={() => console.log('listItem')}
            button
            divider={divider}>
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
        </StyledListItem>
    )
}

export default CarItem
