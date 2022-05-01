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
        currentUser: JSON.parse(localStorage.getItem('user')|| 'null')?.currentUser || null as null | currentUserType,
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
            console.log(state.currentUser);
            localStorage.setItem('user', JSON.stringify(state))
            window.location.reload()
        },
        loginFailure: (state,action) => {
            state.isFetching = false
            state.error = action.payload
        },
        logOut: (state) =>{
            localStorage.removeItem('user')
            state.currentUser = null
            window.location.reload()
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        }
    }
})

export const {loginStart, loginSuccess, loginFailure, logOut, setCurrentUser} = userSlice.actions
export default userSlice.reducer