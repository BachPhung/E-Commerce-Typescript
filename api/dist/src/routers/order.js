"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const order_1 = require("../controllers/order");
const router = express_1.default.Router();
router.post('/', verifyToken_1.default.verifyToken, order_1.addOrder);
router.get('/', verifyToken_1.default.verifyTokenAndAdmin, order_1.findAll);
router.get('/:id', verifyToken_1.default.verifyTokenAndAuthorization, order_1.findById);
router.put('/:id', verifyToken_1.default.verifyTokenAndAuthorization, order_1.updateOrder);
router.delete('/:id', verifyToken_1.default.verifyTokenAndAuthorization, order_1.deleteOrder);
router.get('/stats', verifyToken_1.default.verifyTokenAndAdmin, order_1.findMonthlyOrder);
exports.default = router;
//# sourceMappingURL=order.js.map