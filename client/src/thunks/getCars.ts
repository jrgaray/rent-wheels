import { Action, ThunkAction } from '@reduxjs/toolkit'
import { RootState } from 'app/types'
import client from 'app/client'
import { CARS } from 'gql/queries'
import { CarsQueryOutput } from 'gql/types'
import { setCars } from 'ducks/carListSlice'

const getCars = (): ThunkAction<void, RootState, null, Action> => {
    return async (dispatch, getState) => {
        try {
            const { data } = await client.query<CarsQueryOutput>({
                query: CARS,
                fetchPolicy: 'no-cache',
            })
            dispatch(setCars(data.cars))
        } catch (err) {
            // dispatch notification
            console.error(err.message)
        }
    }
}
export default getCars
