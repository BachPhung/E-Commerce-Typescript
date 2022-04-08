"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = __importDefault(require("../controllers/verifyToken"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.get('/', verifyToken_1.default.verifyTokenAndAdmin, user_1.findAll);
router.get('/:id', verifyToken_1.default.verifyTokenAndAuthorization, user_1.findById);
router.put('/:id', verifyToken_1.default.verifyTokenAndAuthorization, user_1.updateUser);
router.delete('/:id', verifyToken_1.default.verifyTokenAndAuthorization, user_1.deleteUser);
router.put('/banned/:id', verifyToken_1.default.verifyTokenAndAdmin, user_1.bannedUser);
exports.default = router;
//# sourceMappingURL=user.js.map