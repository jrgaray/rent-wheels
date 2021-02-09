import React, { FunctionComponent } from 'react'
import { Snackbar } from '@material-ui/core'
import { useDispatch, useSelector } from 'app/store'
import { clearNotification } from 'ducks/notificationSlice'
import { Alert } from '@material-ui/lab'

const Notification: FunctionComponent = () => {
    const dispatch = useDispatch()
    const { type, message } = useSelector(state => state.notification)

    const handleClose = () => dispatch(clearNotification())

    if (!type) return null
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            autoHideDuration={3000}
            open
            onClose={handleClose}
            message={message}>
            <Alert onClose={handleClose} severity={type}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default Notification
