import axios from "axios";
import { initialUserStateType } from "./redux/userSlice";
const BASE_URL = 'http://localhost:5000/api'
const dataFromLocalStorage  = JSON.parse(JSON.parse(localStorage.getItem('persist:root') || '{}').user) as initialUserStateType

export const publicRequest = axios.create({
    baseURL: BASE_URL
})


export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {authorization: `Bearer ${dataFromLocalStorage.currentUser?.accessToken}`}
})