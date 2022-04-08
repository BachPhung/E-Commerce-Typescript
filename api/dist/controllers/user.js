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
exports.bannedUser = exports.findAll = exports.findById = exports.deleteUser = exports.updateUser = void 0;
const users_1 = __importDefault(require("../services/users"));
//PUT /users/:id
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateInfo = req.body;
        const userId = req.params.id;
        const updatedUser = yield users_1.default.update(userId, updateInfo);
        res.status(200).json(updatedUser);
    }
    catch (err) {
        next(err);
    }
});
// DELETE /users/:id
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield users_1.default.deleteUser(req.params.id);
        res.status(200).json("Deleted user success");
    }
    catch (err) {
        next(err);
    }
});
//GET /users/:id
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield users_1.default.findById(req.params.id);
        res.status(200).json(foundUser);
    }
    catch (err) {
        next(err);
    }
});
//GET /users
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUsers = yield users_1.default.findAll();
        res.status(200).json(foundUsers);
    }
    catch (err) {
        next(err);
    }
});
//PUT /users/banned/:id
exports.bannedUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundUser = yield users_1.default.bannedUser(req.params.id);
        res.status(200).json(foundUser);
    }
    catch (err) {
        next(err);
    }
});
//# sourceMappingURL=user.js.map