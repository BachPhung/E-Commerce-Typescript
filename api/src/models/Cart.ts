import {Schema, model, Document, Types} from 'mongoose'
import { ProductOrderDocument } from './Order'


export type CartDocument = Document & {
    userId: string,
    products: Array<ProductOrderDocument>,
    quantity: number,
    total:number
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
            },
            price:{
                type: Number
            }
        }
    ],
    quantity: {
        type: Number,
        default:0
    },
    total:{
        type: Number,
        default:0
    }
})

export default model<CartDocument>('Cart', CartSchema);