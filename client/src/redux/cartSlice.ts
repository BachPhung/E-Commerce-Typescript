import { createSlice } from "@reduxjs/toolkit";
import { addProductCall, decreaseQuantityCall, increaseQuantityCall } from "../apiCalls";
import { CartProduct } from "../types";

export type initialCartStateType = {
  products: CartProduct[],
  quantity: number,
  total: number,
  cartId: string
}
const login = Object.keys(JSON.parse(localStorage.getItem("user") || "{}")).length != 0 ? true : false;
console.log(login);

const cart = login
  ? JSON.parse(localStorage.getItem("user") || '{}').currentUser.cart
  : JSON.parse(localStorage.getItem('cart') || '{}') as initialCartStateType
console.log(cart);


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: cart.products || [],
    quantity: cart.quantity || 0,
    total: cart.total || 0,
    cartId: JSON.parse(localStorage.getItem("user") || '{}')?.currentUser?.cart._id || ''
  } as initialCartStateType,
  reducers: {
    addProduct: (state, action) => {
      let productPayload: CartProduct = action.payload;
      if (state.cartId.length === 0) {
        localStorage.setItem('cart', JSON.stringify(state));
        state.quantity += productPayload.quantity;
        state.products.push(productPayload);
        state.total += productPayload.price * productPayload.quantity;
        state.total = Math.round(state.total * 100) / 100;
      }
      else {
        let userStorage = JSON.parse(localStorage.getItem("user") || '{}');
        const cartStorage = userStorage.currentUser.cart
        cartStorage.products = state.products
        cartStorage.quantity = state.quantity
        cartStorage.total = state.total
        localStorage.setItem("user", JSON.stringify(userStorage));
      }
    },
    addQuantity: (state, action) => {
      let productPayload: CartProduct = action.payload
      const index = state.products.findIndex(product => {
        return product.product === productPayload.product
          && product.color === productPayload.color
          && product.size === productPayload.size
      });
      state.quantity += 1
      state.products[index].quantity += 1
      state.total += action.payload.price
      state.total = Math.round(state.total * 100) / 100

      if (state.cartId.length === 0) {
        localStorage.setItem('cart', JSON.stringify(state))
      }
      else {
        increaseQuantityCall(state.cartId, productPayload.product, productPayload.size, productPayload.color, productPayload.price)
        let userStorage = JSON.parse(localStorage.getItem("user") || '{}');
        const cartStorage = userStorage.currentUser.cart
        cartStorage.products[index].quantity++;
        cartStorage.quantity++
        cartStorage.total += action.payload.price
        cartStorage.total = Math.round(userStorage.currentUser.cart.total * 100) / 100
        localStorage.setItem("user", JSON.stringify(userStorage));
      }
    },
    decreaseQuantity: (state, action) => {
      state.quantity -= 1
      let productPayload: CartProduct = action.payload
      const index = state.products.findIndex(product => {
        return product.product === productPayload.product
          && product.color === productPayload.color
          && product.size === productPayload.size
      });
      state.products[index].quantity -= 1
      state.total -= action.payload.price
      state.total = Math.round(state.total * 100) / 100
      state.products = state.products.filter(product => product.quantity > 0)
      console.log(state.cartId);
      if (state.cartId.length === 0) {
        localStorage.setItem('cart', JSON.stringify(state))
      }
      else {
        let userStorage = JSON.parse(localStorage.getItem("user") || '{}');
        decreaseQuantityCall(state.cartId, productPayload.product, productPayload.size, productPayload.color, productPayload.price)
        userStorage.currentUser.cart.products[index].quantity--;
        console.log(state.products);
        userStorage.currentUser.cart.products = state.products
        userStorage.currentUser.cart.quantity = state.quantity
        userStorage.currentUser.cart.total = state.total
        localStorage.setItem("user", JSON.stringify(userStorage));
        console.log(state.cartId);
      }
    },
    setCart: (state, action) => {
      state.products = action.payload.products || []
      state.quantity = action.payload.quantity || 0
      state.total = action.payload.total || 0
      state.cartId = action.payload._id
      console.log(action.payload._id);
    }
  }
})

export const { addProduct, addQuantity, decreaseQuantity, setCart } = cartSlice.actions
export default cartSlice.reducer