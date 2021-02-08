import { Action, ThunkAction } from '@reduxjs/toolkit'
import { RootState } from 'app/types'
import client from 'app/client'
import { CARS_BY_USER_ID } from 'gql/queries'
import { CarsByUserIDQueryInput, CarsByUserIDQueryOutput } from 'gql/types'
import { setCars } from 'ducks/carListSlice'
import { openNotification } from 'ducks/notificationSlice'

const getCars = (): ThunkAction<void, RootState, null, Action> => {
    return async (dispatch, getState) => {
        try {
            const { id } = getState().user
            if (!id) throw Error('User is not logged in.')
            const { data } = await client.query<
                CarsByUserIDQueryOutput,
                CarsByUserIDQueryInput
            >({
                query: CARS_BY_USER_ID,
                variables: {
                    id,
                },
                fetchPolicy: 'no-cache',
            })
            dispatch(setCars(data.carsByUserID))
        } catch (err) {
            dispatch(openNotification({ type: 'error', message: err.message }))
        }
    }
}
export default getCars
