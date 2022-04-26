import {Schema, model, Document, Types} from 'mongoose'
import { ProductOrderDocument } from './Order'


export type CartDocument = Document & {
    userId: string,
    products: Array<ProductOrderDocument>,
}

const CartSchema = new Schema<CartDocument>({
    userId:{
        type:Types.ObjectId,
        ref:"User"
    },
    products:[
        {
            product:{
                type: Types.ObjectId,
                ref: "Product"
            },
            quantity:{
                type: Number,
                default:1
            },
            size:{
                type: String,
            },
            color:{
                type:String
            }
        }
    ]
})

export default model<CartDocument>('Cart', CartSchema);