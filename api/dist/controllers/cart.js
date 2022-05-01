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
exports.cleanCart = exports.addCart = exports.findByUserId = exports.findById = exports.deleteCart = exports.decreaseQuantity = exports.increaseQuantity = exports.updateCart = exports.findAll = void 0;
const carts_1 = __importDefault(require("../services/carts"));
const Cart_1 = __importDefault(require("../models/Cart"));
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundCarts = yield carts_1.default.findAll();
        res.status(200).json(foundCarts);
    }
    catch (err) {
        next(err);
    }
});
// Add product to cart
exports.updateCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let quantity = 0;
        let total = 0;
        let products;
        const cartId = req.params.id;
        const fetchedCart = yield carts_1.default.findById(cartId);
        if (req.body.products) {
            products = fetchedCart.products.concat(req.body.products);
            products.forEach(p => {
                if (p.quantity) {
                    quantity += p.quantity;
                    total += p.price * p.quantity;
                }
                else {
                    quantity += 1;
                    total += p.price;
                }
            });
        }
        const newCart = {
            products,
            quantity,
            total: Math.round(total * 100) / 100
        };
        const updatedCart = yield carts_1.default.update(cartId, newCart);
        res.status(200).json(updatedCart);
    }
    catch (err) {
        next(err);
    }
});
//Increase quantity of product
exports.increaseQuantity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = req.params.id;
        const fetchedCart = yield carts_1.default.findById(cartId);
        const body = req.body;
        const size = body.size;
        const color = body.color;
        const price = body.price;
        const productId = body.productId;
        let products = fetchedCart.products;
        const updatedProductIndex = products.findIndex(p => {
            console.log(p.product.id, productId);
            return (p.product.id === productId && p.size === size && p.color === color);
        });
        console.log(updatedProductIndex);
        products[updatedProductIndex].quantity++;
        const newCart = {
            products,
            quantity: fetchedCart.quantity + 1,
            total: Math.round((fetchedCart.total + price) * 100) / 100
        };
        const updatedCart = yield carts_1.default.update(cartId, newCart);
        res.status(200).json(updatedCart);
    }
    catch (err) {
        next(err);
    }
});
// Decrease quantity of product
exports.decreaseQuantity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = req.params.id;
        const fetchedCart = yield carts_1.default.findById(cartId);
        const body = req.body;
        const size = body.size;
        const color = body.color;
        const price = body.price;
        const productId = body.productId;
        let products = fetchedCart.products;
        const updatedProductIndex = products.findIndex(p => {
            console.log(p.product.id, productId);
            return (p.product.id === productId && p.size === size && p.color === color);
        });
        console.log(updatedProductIndex);
        const updatedProduct = products[updatedProductIndex];
        if (updatedProduct.quantity === 1) {
            products = products.filter(p => {
                return !(p.size === size && p.color === color);
            });
        }
        else {
            products[updatedProductIndex].quantity--;
        }
        const newCart = {
            products,
            quantity: fetchedCart.quantity - 1,
            total: Math.round((fetchedCart.total - price) * 100) / 100
        };
        const updatedCart = yield carts_1.default.update(cartId, newCart);
        res.status(200).json(updatedCart);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield carts_1.default.deleteCart(req.params.id);
        res.status(200).json("Delete cart success");
    }
    catch (err) {
        next(err);
    }
});
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundCart = yield carts_1.default.findById(req.params.id);
        res.status(200).json(foundCart);
    }
    catch (err) {
        next(err);
    }
});
exports.findByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundCart = yield carts_1.default.findByUserId(req.params.id);
        res.status(200).json(foundCart);
    }
    catch (err) {
        next(err);
    }
});
exports.addCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCart = yield carts_1.default.create(new Cart_1.default(req.body));
        return res.status(200).json(newCart);
    }
    catch (err) {
        next(err);
    }
});
exports.cleanCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedCart = yield carts_1.default.cleanCart(req.params.id);
        return res.status(200).json(updatedCart);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=cart.js.map