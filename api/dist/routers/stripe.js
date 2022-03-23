"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_1 = require("../controllers/stripe");
const router = express_1.default.Router();
router.post('/payment', stripe_1.stripeCharge);
exports.default = router;
//# sourceMappingURL=stripe.js.map