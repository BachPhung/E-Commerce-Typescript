import { createSlice } from "@reduxjs/toolkit";

type currentUserType = {
    accessToken:string,
    first_name:string,
    last_name:string,
    username:string,
    isAdmin:boolean
}
export type initialUserStateType = {
    currentUser: null | currentUserType,
    isFetching: boolean,
    error: null | string
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser:null,
        isFetching:false,
        error:null
    } as initialUserStateType,
    reducers: {
        loginStart: (state) => {
            state.isFetching =true
        },
        loginSuccess: (state,action) => {
            state.isFetching = false
            state.currentUser = action.payload
        },
        loginFailure: (state,action) => {
            state.isFetching = false
            state.error = action.payload
        }
    }
})

export const {loginStart, loginSuccess, loginFailure} = userSlice.actions
export default userSlice.reducer