import { createSlice } from "@reduxjs/toolkit";

type currentUserType = {
    accessToken:string,
    first_name:string,
    last_name:string,
    username:string,
    isAdmin:boolean
}

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser:null as currentUserType | null,
        isFetching:false,
        error:null
    },
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