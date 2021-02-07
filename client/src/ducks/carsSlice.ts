import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CarsOutput } from 'gql/types'

interface CarsState extends CarsOutput {}

const initialState = { cars: [] } as CarsState

const carsSlice = createSlice({
    name: 'carsSlice',
    initialState,
    reducers: {
        setCars(state, action: PayloadAction<CarsState['cars']>) {
            state.cars = action.payload
        },
        clearCars: () => initialState,
    },
})

export const { setCars, clearCars } = carsSlice.actions

export default carsSlice.reducer
