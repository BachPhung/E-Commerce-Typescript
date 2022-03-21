import { Request } from 'express'
import * as jwt from 'jsonwebtoken'

export type decodedUser = {
    id: string,
    isAdmin: string
}
declare module 'jsonwebtoken' {
    export interface UserJwtPayload extends jwt.JwtPayload {
        user: decodedUser
    }
}

export interface CustomRequest extends Request {
    user?: decodedUser | undefined
}