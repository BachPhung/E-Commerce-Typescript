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
exports.addProduct = exports.findById = exports.deleteProduct = exports.updateProduct = exports.findAll = void 0;
const products_1 = __importDefault(require("../services/products"));
const Product_1 = __importDefault(require("../models/Product"));
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const queryNewProduct = req.query.new;
    const queryCategory = (_a = req.query.category) === null || _a === void 0 ? void 0 : _a.toString();
    try {
        let foundProducts;
        if (queryNewProduct) {
            foundProducts = yield products_1.default.findQueryNew();
        }
        else if (queryCategory) {
            foundProducts = yield products_1.default.findQueryCategory(queryCategory);
        }
        else {
            foundProducts = yield products_1.default.findAll();
        }
        res.status(200).json(foundProducts);
    }
    catch (err) {
        next(err);
    }
});
exports.updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProductInfo = req.body;
        const productId = req.params.id;
        const updatedProduct = yield products_1.default.update(productId, newProductInfo);
        res.status(200).json(updatedProduct);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield products_1.default.deleteProduct(req.params.id);
        res.status(200).json("Delete product success");
    }
    catch (err) {
        next(err);
    }
});
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundProduct = yield products_1.default.findById(req.params.id);
        res.status(200).json(foundProduct);
    }
    catch (err) {
        next(err);
    }
});
exports.addProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = yield products_1.default.create(new Product_1.default(req.body));
        res.status(200).json(newProduct);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=product.js.map