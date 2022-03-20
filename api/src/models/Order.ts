import { Schema, model, Document } from 'mongoose'

export type ProductOrderDocument = Document & {
    productId: string,
    quantity: number
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
        type: String,
        required: true
    },
    products: [
        {
            productId: {
                type: String
            },
            quantity: {
                type: Number,
                default:1
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