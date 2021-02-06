import React, { FunctionComponent } from 'react'
import Dialog from '@material-ui/core/Dialog'
import { closeDialog } from 'ducks/dialogSlice'
import { useDispatch, useSelector } from 'app/store'
import { DialogComponents } from 'components/common/types'
import CreateCarDialog from './CreateCarDialog'

export const DIALOG_COMPONENTS: DialogComponents = {
    createCar: CreateCarDialog,
    // updateCar: UpdateCarDialog,
    // deleteCar: DeleteCarDialog,
}

const DialogController: FunctionComponent = () => {
    const dispatch = useDispatch()
    const { type } = useSelector(state => state.dialog)

    const handleClose = () => {
        dispatch(closeDialog())
    }

    if (!type) {
        return null
    }

    const ComponentDialog = DIALOG_COMPONENTS[type]

    return (
        <Dialog open onClose={handleClose} aria-labelledby='form-dialog-title'>
            <ComponentDialog />
        </Dialog>
    )
}

export default DialogController
