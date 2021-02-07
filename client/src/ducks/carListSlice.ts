import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Car } from 'gql/types'

interface CarListState {
    cars: Omit<Car, 'User'>[]
}

const initialState = { cars: [] } as CarListState

const carListSlice = createSlice({
    name: 'carList',
    initialState,
    reducers: {
        setCars(state, action: PayloadAction<CarListState['cars']>) {
            state.cars = action.payload
        },
        clearCars: () => initialState,
    },
})

export const { setCars, clearCars } = carListSlice.actions

export default carListSlice.reducer
