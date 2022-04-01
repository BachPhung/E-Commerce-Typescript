import { publicRequest } from "./requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./redux/userSlice";
import { fetchProductFailure, fetchProductSuccess, fetchProductStart } from "./redux/productSlice";

export type LoginCredential = {
    username: string,
    password: string
}

export const login = async (dispatch: any, userCredential: LoginCredential) => {
    dispatch(loginStart);
    try{
        const res = await publicRequest.post('/auth/login', userCredential)
        dispatch(loginSuccess(res.data))
        window.location.reload()
    }
    catch(err){
        dispatch(loginFailure(err))
    }
}

export const fetchProduct = async (dispatch: any) => {
    dispatch(fetchProductStart);
    try{
        const res = await publicRequest.get('/products')
        dispatch(fetchProductSuccess(res.data))
    }
    catch(err){
        dispatch(fetchProductFailure(err))
    }
}