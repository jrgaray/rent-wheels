import React, { FC } from 'react'
import { Container, List, Paper } from '@material-ui/core'
import CarItem from 'components/routes/cars/CarItem'

const Cars: FC = () => {
    return (
        <Container component={Paper}>
            <List>
                <CarItem
                    divider={false}
                    image='https://images.dog.ceo/breeds/shihtzu/n02086240_1205.jpg'
                    vin={'1asdfas1'}
                    isActive={true}
                    make='Mazda'
                    model='Mazda3'
                    year='2015'
                    id={'asdlkfj12dkj'}
                    userId='12kjhdsajk123jk'
                />
            </List>
        </Container>
    )
}

export default Cars
