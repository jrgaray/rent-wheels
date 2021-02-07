import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Car } from 'gql/types'

type CarState = Omit<Car, 'User' | 'userID'>

const initialState = {} as CarState

const carSlice = createSlice({
    name: 'carList',
    initialState,
    reducers: {
        setCar(state, { payload }: PayloadAction<CarState>) {
            state.id = payload.id
            state.make = payload.make
            state.model = payload.model
            state.year = payload.year
            state.vin = payload.vin
            state.isActive = payload.isActive
        },
        clearCar: () => initialState,
    },
})

export const { setCar, clearCar } = carSlice.actions

export default carSlice.reducer
