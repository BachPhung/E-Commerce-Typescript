"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../models/Order"));
// CREATE
const create = (order) => __awaiter(void 0, void 0, void 0, function* () {
    return order.save();
});
// CHANGE
const update = (orderId, updatedOrder) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrder = yield Order_1.default.findByIdAndUpdate(orderId, updatedOrder, { new: true });
    if (!foundOrder) {
        throw new Error(`Product ${orderId} not found`);
    }
    return foundOrder;
});
const findById = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrder = yield Order_1.default.findById(orderId);
    if (!foundOrder) {
        throw new Error(`Product ${orderId} not found`);
    }
    return foundOrder;
});
const deleteOrder = (orderId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundOrder = yield Order_1.default.findByIdAndDelete(orderId);
    if (!foundOrder) {
        throw new Error(`product ${orderId} not found`);
    }
    return foundOrder;
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Order_1.default.find();
});
// MONTHLY INCOME
const findMonthlyOrder = () => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const preMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
    return Order_1.default.aggregate([
        { $match: { createdAt: { $gte: preMonth } } },
        {
            $project: {
                month: { $month: '$createdAt' },
                sales: '$amount'
            },
            $group: {
                _id: '$month',
                total: { $sum: '$sale' }
            }
        }
    ]);
});
exports.default = {
    create,
    update,
    findById,
    findAll,
    deleteOrder,
    findMonthlyOrder
};
//# sourceMappingURL=orders.js.map