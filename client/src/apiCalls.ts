import { publicRequest } from "./requestMethod";
import { loginFailure, loginStart, loginSuccess } from "./redux/userSlice";

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