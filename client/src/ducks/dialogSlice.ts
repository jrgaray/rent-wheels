import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    DialogComponentTypes,
    DialogComponentProps,
} from 'components/common/types'

interface DialogState {
    type: DialogComponentTypes | null
    props: DialogComponentProps | null
}

const initialState = { type: null } as DialogState

const dialogSlice = createSlice({
    name: 'dialogSlice',
    initialState,
    reducers: {
        openDialog(state, action: PayloadAction<DialogComponentTypes>) {
            state.type = action.payload
        },
        closeDialog: state => initialState,
    },
})

export const { openDialog, closeDialog } = dialogSlice.actions

export default dialogSlice.reducer