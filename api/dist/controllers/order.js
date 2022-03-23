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
exports.addOrder = exports.findMonthlyOrder = exports.findById = exports.deleteOrder = exports.updateOrder = exports.findAll = void 0;
const orders_1 = __importDefault(require("../services/orders"));
const Order_1 = __importDefault(require("../models/Order"));
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundOrders = yield orders_1.default.findAll();
        res.status(200).json(foundOrders);
    }
    catch (err) {
        next(err);
    }
});
exports.updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrderInfo = req.body;
        const orderId = req.params.id;
        const updatedOrder = yield orders_1.default.update(orderId, newOrderInfo);
        res.status(200).json(updatedOrder);
    }
    catch (err) {
        next(err);
    }
});
exports.deleteOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield orders_1.default.deleteOrder(req.params.id);
        res.status(200).json("Delete order success");
    }
    catch (err) {
        next(err);
    }
});
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundOrder = yield orders_1.default.findById(req.params.id);
        res.status(200).json(foundOrder);
    }
    catch (err) {
        next(err);
    }
});
exports.findMonthlyOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundOrders = yield orders_1.default.findMonthlyOrder();
        res.status(200).json(foundOrders);
    }
    catch (err) {
        next(err);
    }
});
exports.addOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newOrder = orders_1.default.create(new Order_1.default(req.body));
        res.status(200).json(newOrder);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=order.js.map