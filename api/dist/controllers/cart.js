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
exports.addCart = exports.findById = exports.deleteCart = exports.updateCart = exports.findAll = void 0;
const carts_1 = __importDefault(require("../services/carts"));
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundCarts = yield carts_1.default.findAll();
        res.status(200).json(foundCarts);
    }
    catch (err) {
        next(err);
    }
});
exports.updateCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCartInfo = req.body;
        const cartId = req.params.id;
        const updatedCart = yield carts_1.default.update(cartId, newCartInfo);
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
exports.addCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newCart = carts_1.default.create(req.body);
        res.status(200).json(newCart);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=cart.js.map