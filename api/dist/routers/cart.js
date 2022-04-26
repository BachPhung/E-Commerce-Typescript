"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const cart_1 = require("../controllers/cart");
const router = express_1.default.Router();
router.get('/', verifyToken_1.default.verifyTokenAndAdmin, cart_1.findAll);
router.get('/:id', verifyToken_1.default.verifyTokenAndAuthorization, cart_1.findById);
router.get('/find/:id', verifyToken_1.default.verifyTokenAndAuthorization, cart_1.findByUserId);
router.post('/', verifyToken_1.default.verifyToken, cart_1.addCart);
router.put('/:id', verifyToken_1.default.verifyTokenAndAuthorization, cart_1.updateCart);
router.delete('/:id', verifyToken_1.default.verifyTokenAndAuthorization, cart_1.deleteCart);
exports.default = router;
//# sourceMappingURL=cart.js.map