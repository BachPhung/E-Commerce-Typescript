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
exports.userLogin = exports.userRegister = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const users_1 = __importDefault(require("../services/users"));
const carts_1 = __importDefault(require("../services/carts"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../middlewares/config"));
const Cart_1 = __importDefault(require("../models/Cart"));
const saltRound = Number(config_1.default.SALTROUNDS);
const tokenSecret = config_1.default.TOKENSECRET;
exports.userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, username, password } = req.body;
        if (username.length < 8 || password.length < 8) {
            return res.status(401).json({
                error: 'Username or Password must be at least 8 chars long'
            });
        }
        if (saltRound) {
            const savedUser = new User_1.default({
                first_name,
                last_name,
                username,
                password: yield bcrypt_1.default.hash(password, saltRound)
            });
            console.log("savedUser", savedUser);
            yield users_1.default.create(savedUser);
            const savedCart = new Cart_1.default({
                userId: savedUser.id
            });
            yield carts_1.default.create(savedCart);
            const updatedUser = yield users_1.default.update(savedUser.id, { cart: savedCart.id });
            return res.status(200).json(updatedUser);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: "username or email has already existed" });
        }
        else {
            next(error);
        }
    }
});
exports.userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json('username or password is missing');
        }
        const user = yield users_1.default.findByCredential({ username: req.body.username });
        const passwordCorrect = user === null
            ? false
            : yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!(user && passwordCorrect)) {
            return res.status(401).json({
                error: 'invalid username or password'
            });
        }
        if (user.isBanned) {
            return res.status(401).json({
                error: 'Your account is banned'
            });
        }
        if (tokenSecret) {
            const accessToken = jsonwebtoken_1.default.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, tokenSecret, { expiresIn: '2d' });
            const { first_name, last_name, username, isAdmin, cart } = user;
            return res.status(200).json({
                accessToken,
                first_name,
                last_name,
                username,
                isAdmin,
                cart
            });
        }
    }
    catch (err) {
        //res.status(400).json('eoor')
        next(err);
    }
});
//# sourceMappingURL=auth.js.map