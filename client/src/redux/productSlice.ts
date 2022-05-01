import { createSlice } from "@reduxjs/toolkit";
import { FetchProduct } from "../types";

const productStorage = JSON.parse(localStorage.getItem("products")||'[]');

const productSlice = createSlice({
  name: 'cart',
  initialState: {
    products: productStorage as FetchProduct[],
    isFetching: false,
    error: null
  }
  ,
  reducers: {
    fetchProductStart: (state) => {
      state.isFetching = true
    },
    fetchProductSuccess: (state, action) => {
      state.products = action.payload
      state.isFetching = false
      localStorage.setItem("products",JSON.stringify(state.products));
    },
    fetchProductFailure: (state, action) => {
      state.error = action.payload
      state.isFetching = false
    },
    addNewProduct: (state, action) => {
      state.products.push(action.payload)
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(product => product._id !== action.payload)
    },
    updateProduct:(state,action)=>{
      const preProductIndex = state.products.findIndex(p=>p._id=== action.payload.id)
      state.products[preProductIndex] = action.payload.updatedProduct
    }
  }
})

export const { fetchProductStart, fetchProductSuccess, fetchProductFailure, addNewProduct, deleteProduct, updateProduct } = productSlice.actions
export default productSlice.reducer

