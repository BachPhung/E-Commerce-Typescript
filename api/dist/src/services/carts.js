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
const Cart_1 = __importDefault(require("../models/Cart"));
// CREATE
const create = (cart) => __awaiter(void 0, void 0, void 0, function* () {
    return cart.save();
});
// CHANGE
const update = (cartId, updatedCart) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCart = yield Cart_1.default.findByIdAndUpdate(cartId, updatedCart, { new: true });
    if (!foundCart) {
        throw new Error(`Product ${cartId} not found`);
    }
    return foundCart;
});
const findById = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCart = yield Cart_1.default.findById(cartId);
    if (!foundCart) {
        throw new Error(`Product ${cartId} not found`);
    }
    return foundCart;
});
const deleteCart = (cartId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCart = yield Cart_1.default.findByIdAndDelete(cartId);
    if (!foundCart) {
        throw new Error(`product ${cartId} not found`);
    }
    return foundCart;
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Cart_1.default.find();
});
exports.default = {
    create,
    update,
    findById,
    findAll,
    deleteCart
};
//# sourceMappingURL=carts.js.map