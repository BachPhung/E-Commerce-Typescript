import {configureStore, combineReducers} from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import userReducer from './userSlice'
import productReducer from './productSlice'


const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    product: productReducer
})


export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch