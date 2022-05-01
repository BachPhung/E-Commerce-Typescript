import { publicRequest, userRequest } from "./requestMethod";
import { loginFailure, loginStart, loginSuccess, logOut } from "./redux/userSlice";
import { setCart } from "./redux/cartSlice";
import { fetchProductFailure, fetchProductSuccess, fetchProductStart } from "./redux/productSlice";
import { FetchProduct, FetchUser, SignUpForm } from "./types";
import {initialCartStateType} from './redux/cartSlice'
export type LoginCredential = {
    username: string,
    password: string
}

export const login = async (dispatch: any, userCredential: LoginCredential) => {
    dispatch(loginStart);
    try{
        const res = await publicRequest.post('/auth/login', userCredential)
        dispatch(loginSuccess(res.data))
        dispatch(setCart(res.data.cart))
    }
    catch(err){
        dispatch(loginFailure(err))
    }
}

export const logout = async(dispatch: any) => {
    dispatch(logOut());
    dispatch(setCart(JSON.parse(localStorage.getItem('cart') || '{}') as initialCartStateType))
}

export const fetchProducts = async (dispatch: any) => {
    dispatch(fetchProductStart);
    try{
        const res = await publicRequest.get('/products')
        dispatch(fetchProductSuccess(res.data))
    }
    catch(err){
        dispatch(fetchProductFailure(err))
    }
}

export const fetchProduct =  async (id:string | undefined): Promise<FetchProduct> => {
    return (await publicRequest.get(`/products/${id}`)).data
}

export const register = async (signupCredential: SignUpForm)=>{
    const res = await publicRequest.post('/auth/register', signupCredential)
    return res.data
}

export const getAllUser = async (): Promise<FetchUser[]> => {
    const res = await userRequest.get('/users')
    return res.data
}