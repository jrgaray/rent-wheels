import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    username: string | null
    id: string | null
    email: string | null
}

const initialState = { username: null, id: null, email: null } as UserState
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(
            state,
            { payload: { username, email, id } }: PayloadAction<UserState>
        ) {
            state.email = email
            state.id = id
            state.username = username
        },
        clearUser: state => initialState,
    },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
