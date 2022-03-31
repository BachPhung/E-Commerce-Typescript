import axios from "axios";
const BASE_URL = 'http://localhost:5000/api'


export const getToken = ():string =>{
    return JSON.parse(
        JSON.parse(localStorage.getItem("persist:root")||'{}').user || '{}'
    ).currentUser?.accessToken || ''
}

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
})
userRequest.defaults.headers.common['authorization'] = `Bearer ${getToken()}`

