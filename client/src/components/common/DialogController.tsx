import React, { FC } from 'react'
import { useDispatch, useSelector } from 'app/store'

import { closeDialog } from 'ducks/dialogSlice'

import { Dialog, Slide } from '@material-ui/core'
import CreateCarDialog from 'components/common/CreateCarDialog'
import UpdateCarDialog from 'components/common/UpdateCarDialog'
import CreateUserDialog from 'components/common/CreateUserDialog'

import { TransitionProps } from '@material-ui/core/transitions'
import {
    DialogComponents,
    DialogComponentTypes,
    DialogComponentPropTypes,
} from 'components/common/types'

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement<any, any> },
    ref: React.Ref<unknown>
) {
    return <Slide direction='up' ref={ref} {...props} />
})

const DIALOG_COMPONENTS: DialogComponents = {
    createCar: CreateCarDialog,
    updateCar: UpdateCarDialog,
    createUser: CreateUserDialog,
}

const selectDialog = (
    type: DialogComponentTypes,
    props: DialogComponentPropTypes | null
) => {
    switch (type) {
        case 'updateCar':
            const UpdateDialog = DIALOG_COMPONENTS[type]
            return (
                <UpdateDialog
                    {...(props as React.ComponentProps<typeof UpdateCarDialog>)}
                />
            )
        case 'createCar':
        case 'createUser':
        default:
            let ComponentDialog = DIALOG_COMPONENTS[type]
            return <ComponentDialog />
    }
}

const DialogController: FC = () => {
    const dispatch = useDispatch()
    const { type, props } = useSelector(state => state.dialog)
    const handleClose = () => dispatch(closeDialog())

    if (!type) return null

    return (
        <Dialog TransitionComponent={Transition} open onClose={handleClose}>
            {selectDialog(type, props)}
        </Dialog>
    )
}

export default DialogController
