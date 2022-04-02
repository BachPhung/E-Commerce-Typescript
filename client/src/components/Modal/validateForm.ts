import { SignUpForm } from "../../types";

export const validateForm = (inputs: SignUpForm) => {
    if(inputs.username.length < 8)
        throw new Error('Username must be at least 8 characters')
    else if(inputs.password !== inputs.repeatPassword)
        throw new Error('Password does not match')
}