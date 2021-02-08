import { AlertProps } from '@material-ui/lab'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotificationState {
    message: string | null
    type: AlertProps['severity']
}

const initialState = { message: null, type: undefined } as NotificationState

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        openNotification(state, action: PayloadAction<NotificationState>) {
            const { message, type } = action.payload
            state.message = message
            state.type = type
        },
        clearNotification: () => initialState,
    },
})

export const { openNotification, clearNotification } = notificationSlice.actions

export default notificationSlice.reducer
