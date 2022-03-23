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
exports.stripeCharge = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../middlewares/config"));
const stripe = new stripe_1.default(config_1.default.STRIPE_KEY, {
    apiVersion: '2020-08-27'
});
exports.stripeCharge = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: 'eur'
    });
});
//# sourceMappingURL=stripe.js.map