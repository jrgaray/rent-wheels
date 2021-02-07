import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DialogComponentTypes } from 'components/common/types'

interface DialogState {
    type: DialogComponentTypes | null
}

const initialState = { type: null, props: null } as DialogState

const dialogSlice = createSlice({
    name: 'dialogSlice',
    initialState,
    reducers: {
        openDialog(state, { payload: { type } }: PayloadAction<DialogState>) {
            state.type = type
        },
        closeDialog: state => initialState,
    },
})

export const { openDialog, closeDialog } = dialogSlice.actions

export default dialogSlice.reducer
