import { Schema, model, Document } from 'mongoose'

export type UserDocument = Document & {
    first_name: string,
    last_name: string,
    username: string,
    password:string,
    email:string,
    avatar:string,
    isAdmin: boolean
}

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
        minlength:8
    },
    password:{
        type:String,
        minlength:8
    },
    email:{
        type:String
    },
    avatar:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
}, {timestamps:true})

export default model<UserDocument>('User', UserSChema);
