import { createSlice } from "@reduxjs/toolkit";
import { CartProduct, FetchProduct } from "../components/ProductList/ProductList";
const cartSlice = createSlice({
    name:'cart',
    initialState:{
        products:<CartProduct[]>[],
        quantity: 0,
        total:0
    },
    reducers:{
        addProduct: (state, action) => {
            state.quantity += action.payload.quantity
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity
        }
    }
})

export const {addProduct} = cartSlice.actions
export default cartSlice.reducer