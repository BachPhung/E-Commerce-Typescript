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
const User_1 = __importDefault(require("../models/User"));
const create = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return user.save();
});
const findById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findById(userId).populate("cart products.product");
    if (!foundUser) {
        throw new Error(`User ${userId} not found`);
    }
    return foundUser;
});
const findByCredential = (obj) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findOne(Object.assign({}, obj)).populate("cart products.product");
    if (!foundUser) {
        throw new Error(`User not found`);
    }
    return foundUser;
});
const findAll = () => __awaiter(void 0, void 0, void 0, function* () {
    return User_1.default.find();
});
const update = (userId, updatedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findByIdAndUpdate(userId, updatedUser, { new: true });
    if (!foundUser) {
        throw new Error(`User ${userId} not found`);
    }
    return foundUser;
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findByIdAndDelete(userId);
    if (!foundUser) {
        throw new Error(`User ${userId} not found`);
    }
    return foundUser;
});
const bannedUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const foundUser = yield User_1.default.findById(userId);
    if (!foundUser) {
        throw new Error(`User ${userId} not found`);
    }
    foundUser.isBanned = !foundUser.isBanned;
    return update(userId, foundUser);
});
exports.default = {
    create,
    findById,
    findAll,
    update,
    deleteUser,
    findByCredential,
    bannedUser
};
//# sourceMappingURL=users.js.map