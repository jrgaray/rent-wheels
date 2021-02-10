import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    token: string | null
    username: string | null
    id: string | null
    email: string | null
}

const initialState = {
    token: null,
    username: null,
    id: null,
    email: null,
} as UserState
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(
            state,
            {
                payload: { id, email, username, token },
            }: PayloadAction<UserState>
        ) {
            state.token = token
            state.username = username
            state.id = id
            state.email = email
        },
        clearUser: state => initialState,
    },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
