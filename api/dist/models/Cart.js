"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        ref: "User"
    },
    products: [
        {
            product: {
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
    ]
});
exports.default = mongoose_1.model('Cart', CartSchema);
//# sourceMappingURL=Cart.js.map