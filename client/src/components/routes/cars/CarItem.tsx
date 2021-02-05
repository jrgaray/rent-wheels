import React, { FC } from 'react'
import {
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemSecondaryAction,
    ListItemText,
    Typography,
} from '@material-ui/core'
import styled from 'styled-components'
import { MoreVert } from '@material-ui/icons'
const StyledImage = styled.img`
    height: 10em;
    width: 10em;
    object-fit: cover;
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
        <ListItem divider={divider}>
            <ListItemIcon>
                <StyledImage
                    alt='thing'
                    src={image}
                    // src='https://images.dog.ceo/breeds/shihtzu/n02086240_1205.jpg'
                />
            </ListItemIcon>
            <ListItemText
                secondary={
                    <Typography>
                        {vin}, {isActive ? 'ACTIVE' : 'INACTIVE'}
                    </Typography>
                }
                primary={`${make} ${model} ${year}`}
            />
            <ListItemSecondaryAction>
                <IconButton edge='end'>
                    <MoreVert />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export default CarItem
