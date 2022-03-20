import { Schema, model, Document } from 'mongoose'

export type ProductDocument = Document & {
    title: string,
    desc:string,
    img:string,
    categories: Array<string>,
    size: string[],
    color: string[],
    price: number,
    inStock: boolean
}

const ProductSchema = new Schema<ProductDocument>({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    img:{
        type:String,
        default:""
    },
    categories:{
        type: [String],
        required:true
    },
    size:{
        type: [String],
        required:true
    },
    color:{
        type: [String],
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    inStock:{
        type: Boolean,
        default:true
    }
}, {timestamps:true})

export default model<ProductDocument>("Product", ProductSchema);

