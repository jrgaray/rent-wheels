import { Action, ThunkAction } from '@reduxjs/toolkit'
import { RootState } from 'app/types'
import client from 'app/client'
import { CARS_BY_USER_ID } from 'gql/queries'
import { CarsByUserIDQueryOutput } from 'gql/types'
import { setCars } from 'ducks/carListSlice'
import { openNotification } from 'ducks/notificationSlice'

const getCars = (): ThunkAction<void, RootState, null, Action> => {
    return async (dispatch, getState) => {
        try {
            const { data } = await client.query<CarsByUserIDQueryOutput>({
                query: CARS_BY_USER_ID,
                fetchPolicy: 'no-cache',
            })
            dispatch(setCars(data.carsByUserID))
        } catch (err) {
            dispatch(openNotification({ type: 'error', message: err.message }))
        }
    }
}
export default getCars
