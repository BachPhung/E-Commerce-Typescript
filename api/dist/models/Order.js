"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            productId: {
                type: mongoose_1.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            },
            size: {
                type: String,
            },
            color: {
                type: String
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
}, { timestamps: true });
exports.default = mongoose_1.model("Order", OrderSchema);
//# sourceMappingURL=Order.js.map