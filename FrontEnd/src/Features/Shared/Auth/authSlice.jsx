import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
   
    name: 'auth',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials: (state, action) => {
            const { get_user, accsess_token } = action.payload
            state.user = get_user
            state.token = accsess_token
        },
        logOut: (state, action) => {
            state.user = null
            state.token = null
        }
    },
})

export const { setCredentials, logOut } = authSlice.actions

export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.user
export const selectCurrentToken = (state) => state.auth.token