import { Schema, model, Document, Types } from 'mongoose'
import { ProductDocument } from './Product'

export type ProductOrderDocument = Document & {
    productId: string,
    quantity: number,
    product: ProductDocument,
    price: number,
    size: string,
    color: string
}

export type OrderDocument = Document & {
    userId: string,
    products: Array<ProductOrderDocument>,
    amount: number,
    address: Object,
    status: string
}

const OrderSchema = new Schema<OrderDocument>({
    userId: {
        type: Types.ObjectId,
        ref:"User"
    },
    products: [
        {
            productId: {
                type: Types.ObjectId,
                ref: "Product"
            },
            quantity: {
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
    ],
    amount: {
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }
}, {timestamps:true})

export default model<OrderDocument>("Order", OrderSchema);