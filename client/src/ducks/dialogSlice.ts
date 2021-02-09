import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
    DialogComponentPropTypes,
    DialogComponentTypes,
} from 'components/common/types'

interface DialogState {
    type: DialogComponentTypes | null
    props: DialogComponentPropTypes | null
}

const initialState = { type: null, props: null } as DialogState

const dialogSlice = createSlice({
    name: 'dialogSlice',
    initialState,
    reducers: {
        openDialog(
            state,
            { payload: { type, props } }: PayloadAction<DialogState>
        ) {
            state.type = type
            state.props = props
        },
        closeDialog: state => initialState,
    },
})

export const { openDialog, closeDialog } = dialogSlice.actions

export default dialogSlice.reducer
