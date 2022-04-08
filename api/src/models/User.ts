import { Schema, model, Document } from 'mongoose'
const uniqueValidator = require('mongoose-unique-validator')
type User = {
    first_name: string,
    last_name: string,
    username: string,
    password:string,
    avatar?:string,
    isAdmin: boolean,
    isBanned: boolean
}

export interface UserDocument extends User, Document{}

export interface SimpleUser extends Omit<User, 'avatar' | 'password'>, Document{}

const UserSChema = new Schema<UserDocument>({
    first_name:{
        type:String,
        required:true,
        maxlength:20
    },
    last_name:{
        type:String,
        required:true,
        maxlength:20
    },
    username:{
        type:String,
        minlength:8,
        unique:true
    },
    password:{
        type:String,
        minlength:8
    },
    avatar:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    isBanned:{
        type:Boolean,
        default:false
    }
}, {timestamps:true})

UserSChema.plugin(uniqueValidator)

export default model<UserDocument>('User', UserSChema);
