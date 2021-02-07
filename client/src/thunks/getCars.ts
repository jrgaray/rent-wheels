import { Action, ThunkAction } from '@reduxjs/toolkit'
import { RootState } from 'app/types'
import client from 'app/client'
import { CARS } from 'gql/queries'
import { CarsOutput } from 'gql/types'
import { setCars } from 'ducks/carsSlice'

const getCars = (): ThunkAction<void, RootState, null, Action> => {
    return async (dispatch, getState) => {
        try {
            const { data } = await client.query<CarsOutput>({
                query: CARS,
                fetchPolicy: 'network-only',
            })
            dispatch(setCars(data.cars))
        } catch (err) {
            // dispatch notification
            console.error(err.message)
        }
    }
}
export default getCars
