import React, { FunctionComponent } from 'react'
import { Dialog, Slide } from '@material-ui/core'
import { closeDialog } from 'ducks/dialogSlice'
import { useDispatch, useSelector } from 'app/store'
import { DialogComponents } from 'components/common/types'
import { TransitionProps } from '@material-ui/core/transitions'
import CreateCarDialog from 'components/common/CreateCarDialog'
import UpdateCarDialog from 'components/common/UpdateCarDialog'
import CreateUserAccount from 'components/common/CreateUserAccountDialog'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction='up' ref={ref} {...props} />
})

export const DIALOG_COMPONENTS: DialogComponents = {
    createCar: CreateCarDialog,
    updateCar: UpdateCarDialog,
    createUser: CreateUserAccount,
}

const DialogController: FunctionComponent = () => {
    const dispatch = useDispatch()
    const { type } = useSelector(state => state.dialog)
    const handleClose = () => dispatch(closeDialog())

    if (!type) return null

    const ComponentDialog = DIALOG_COMPONENTS[type]

    return (
        <Dialog
            TransitionComponent={Transition}
            open
            onClose={handleClose}
            aria-labelledby='form-dialog-title'>
            <ComponentDialog />
        </Dialog>
    )
}

export default DialogController
