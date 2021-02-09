import React, { FunctionComponent, ReactElement } from 'react'
import { useDispatch, useSelector } from 'app/store'

import { closeDialog } from 'ducks/dialogSlice'

import { Dialog, Slide } from '@material-ui/core'
import CreateCarDialog from 'components/common/CreateCarDialog'
import UpdateCarDialog from 'components/common/UpdateCarDialog'
import CreateUserDialog from 'components/common/CreateUserDialog'

import { TransitionProps } from '@material-ui/core/transitions'
import { DialogComponents } from 'components/common/types'

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
type dialogComponentProps = {
    createCar: { testProps: string }
}

// const getComponent = (type: 'createCar' | 'updateCar' | 'createUser') => {
//     let component:
//         | typeof CreateCarDialog
//         | typeof UpdateCarDialog
//         | typeof CreateUserDialog

//     switch (type) {
//         case 'createCar':
//             const props = { testProp: 'test' }
//             return React.cloneElement(CreateCarDialog, props)
//         case 'updateCar':
//             return DIALOG_COMPONENTS['updateCar']
//         default:
//             break
//     }
// }

type CreateCarDialogProps = {
    testProp: string
}
const DialogController: FunctionComponent = () => {
    const dispatch = useDispatch()
    const { type } = useSelector(state => state.dialog)
    const handleClose = () => dispatch(closeDialog())
    const props = {}

    if (!type) return null

    let ComponentDialog = DIALOG_COMPONENTS[type]
    const teest = { testProp: 'asDf' }

    if (type === 'createCar') {
        ComponentDialog = DIALOG_COMPONENTS[type]
        return (
            <Dialog
                TransitionComponent={Transition}
                open
                onClose={handleClose}
                aria-labelledby='form-dialog-title'>
                <ComponentDialog {...teest} />
            </Dialog>
        )
    } else {
        let ComponentDialog = DIALOG_COMPONENTS[type]
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
}

export default DialogController
