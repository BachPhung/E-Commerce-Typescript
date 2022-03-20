import {Schema, model, Document} from 'mongoose'
import { ProductOrderDocument } from './Order'


export type CartDocument = Document & {
    userId: string,
    products: Array<ProductOrderDocument>,
}

const CartSchema = new Schema<CartDocument>({
    userId:{
        type:String,
        required:true
    },
    products:[
        {
            productId:{
                type: String,
            },
            quantity:{
                type: Number,
                default:1
            }
        }
    ]
})

export default model<CartDocument>('Cart', CartSchema);