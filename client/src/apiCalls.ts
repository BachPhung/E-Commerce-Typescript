import { publicRequest } from "./requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./redux/userSlice";
import { fetchProductFailure, fetchProductSuccess, fetchProductStart } from "./redux/productSlice";
import { FetchProduct, SignUpForm } from "./types";

export type LoginCredential = {
    username: string,
    password: string
}

export const login = async (dispatch: any, userCredential: LoginCredential) => {
    dispatch(loginStart);
    try{
        const res = await publicRequest.post('/auth/login', userCredential)
        dispatch(loginSuccess(res.data))
    }
    catch(err){
        dispatch(loginFailure(err))
    }
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