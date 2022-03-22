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
const Product_1 = __importDefault(require("../models/Product"));
const create = (product) => __awaiter(void 0, void 0, void 0, function* () {
    return product.save();
});
const findById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = yield Product_1.default.findById(productId);
    if (!foundProduct) {
        throw new Error(`Product ${productId} not found`);
    }
    return foundProduct;
});
const findByCredential = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = yield Product_1.default.findOne(Object.assign({}, obj));
    if (!foundProduct) {
        throw new Error(`Product not found`);
    }
    return foundProduct;
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return Product_1.default.find();
});
const findQueryNew = () => __awaiter(void 0, void 0, void 0, function* () {
    return Product_1.default.find().sort({ createdAt: -1 }).limit(20);
});
const findQueryCategory = (qCategory) => __awaiter(void 0, void 0, void 0, function* () {
    return Product_1.default.find({
        categories: {
            $in: [qCategory]
        }
    });
});
const update = (productId, updatedProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = yield Product_1.default.findByIdAndUpdate(productId, updatedProduct, { new: true });
    if (!foundProduct) {
        throw new Error(`Product ${productId} not found`);
    }
    return foundProduct;
});
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundProduct = yield Product_1.default.findByIdAndDelete(productId);
    if (!foundProduct) {
        throw new Error(`product ${productId} not found`);
    }
    return foundProduct;
});
exports.default = {
    create,
    findById,
    findAll,
    update,
    deleteProduct,
    findByCredential,
    findQueryNew,
    findQueryCategory
};
//# sourceMappingURL=products.js.map