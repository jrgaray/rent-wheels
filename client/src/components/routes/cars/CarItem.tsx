import React, { FC } from 'react'
import {
    IconButton,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
} from '@material-ui/core'
import styled from 'styled-components'
import { Delete } from '@material-ui/icons'
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

type CarItemProps = {
    divider: boolean
    image: string
    vin: string
    isActive: boolean
    make: string
    model: string
    year: string
    id: string
    userId: string
}

const CarItem: FC<CarItemProps> = ({
    divider,
    image,
    vin,
    isActive,
    make,
    model,
    year,
    id,
    userId,
}) => {
    return (
        <StyledListItem
            onClick={() => console.log('listItem')}
            button
            divider={true}>
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
                <IconButton onClick={() => console.log('delete')} edge='end'>
                    <Delete />
                </IconButton>
            </ListItemSecondaryAction>
        </StyledListItem>
    )
}

export default CarItem
