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
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../middlewares/config"));
dotenv_1.default.config();
const saltRound = Number(process.env.SALTROUNDS);
const tokenSecret = config_1.default.TOKENSECRET;
exports.userRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, username, password, email } = req.body;
        if (saltRound) {
            const savedUser = new User_1.default({
                first_name,
                last_name,
                username,
                password: yield bcrypt_1.default.hash(password, saltRound),
                email
            });
            console.log("savedUser", savedUser);
            yield users_1.default.create(savedUser);
            return res.status(200).json(savedUser);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        }
        else {
            next(error);
        }
    }
});
exports.userLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findByCredential({ username: req.body.username });
        const passwordCorrect = user === null
            ? false
            : yield bcrypt_1.default.compare(req.body.password, user.password);
        if (!(user && passwordCorrect)) {
            res.status(401).json({
                error: 'invalid username or password'
            });
        }
        if (tokenSecret) {
            const accessToken = jsonwebtoken_1.default.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, tokenSecret, { expiresIn: '2d' });
            const { first_name, last_name, username } = user;
            res.status(200).json({
                accessToken,
                first_name,
                last_name,
                username
            });
        }
    }
    catch (err) {
        res.status(400).json(err);
        //next(err)
    }
});
//# sourceMappingURL=auth.js.map