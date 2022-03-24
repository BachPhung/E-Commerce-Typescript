"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
router.get('/', product_1.findAll);
router.get('/:id', product_1.findById);
router.post('/', verifyToken_1.default.verifyTokenAndAdmin, product_1.addProduct);
router.put('/:id', verifyToken_1.default.verifyTokenAndAdmin, product_1.updateProduct);
router.delete('/:id', verifyToken_1.default.verifyTokenAndAdmin, product_1.deleteProduct);
exports.default = router;
//# sourceMappingURL=product.js.map