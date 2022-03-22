import Order, {OrderDocument} from '../models/Order'

// CREATE
const create = async (order: OrderDocument): Promise<OrderDocument> =>{
    return order.save();
}

// CHANGE
const update = async(orderId:string, updatedOrder: Partial<OrderDocument>): Promise<OrderDocument | null> =>{
    const foundOrder = await Order.findByIdAndUpdate(orderId, updatedOrder, {new: true});
    if(!foundOrder) {
        throw new Error(`Product ${orderId} not found`);
    }
    return foundOrder
}

const findById = async (orderId: string): Promise<OrderDocument> =>{
    const foundOrder = await Order.findById(orderId);
    if(!foundOrder){
        throw new Error(`Product ${orderId} not found`);
    }
    return foundOrder;
}

const deleteOrder = async (orderId: string): Promise<OrderDocument | null> =>{
    const foundOrder = await Order.findByIdAndDelete(orderId)
    if(!foundOrder){
        throw new Error(`product ${orderId} not found`);
    }
    return foundOrder;
}

const findAll = async (): Promise<OrderDocument[]> => {
    return Order.find()
}

// MONTHLY INCOME
const findMonthlyOrder = async () => {
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const preMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))
    return Order.aggregate([
        {$match: {createdAt:{$gte:preMonth}}},
        {
            $project:{
                month:{$month: '$createdAt'},
                sales: '$amount'
            },
            $group:{
                _id:'$month',
                total:{$sum:'$sale'}
            }
        }
    ])
}

export default {
    create,
    update,
    findById,
    findAll,
    deleteOrder,
    findMonthlyOrder
}

