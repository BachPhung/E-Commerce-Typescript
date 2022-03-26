import axios from "axios";

const BASE_URL = 'http://localhost:5000/api'
const token = 'Bearer'

export const publicRequest = axios.create({
    baseURL: BASE_URL
})


export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {authorization: token}
})