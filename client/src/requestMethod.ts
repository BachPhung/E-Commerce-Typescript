import axios from "axios";
const BASE_URL = 'https://bachphung-ecommerce.herokuapp.com/api'


export const getToken = ():string =>{
    return JSON.parse(localStorage.getItem("user")||'{}').currentUser?.accessToken || ''
}

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {authorization: `Bearer ${getToken()}` }
})

