"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../middlewares/config"));
const userFromJWT = (jwtToken) => {
    try {
        if (config_1.default.TOKENSECRET) {
            let { isAdmin, id } = jsonwebtoken_1.default.verify(jwtToken, config_1.default.TOKENSECRET);
            return {
                isAdmin,
                id
            };
        }
    }
    catch (err) {
        return undefined;
    }
};
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];
        req.user = userFromJWT(token);
        next();
    }
    else {
        res.status(401).json(`You are not authenticated !`);
    }
};
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        var _a, _b;
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) {
            next();
        }
        else {
            res.status(403).json(req.params.id + ` ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.id}`);
        }
    });
};
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        var _a, _b;
        if ((_a = req.user) === null || _a === void 0 ? void 0 : _a.isAdmin) {
            next();
        }
        else {
            res.status(403).json(`verifyTokenAndAdmin: ${(_b = req.user) === null || _b === void 0 ? void 0 : _b.isAdmin}`);
        }
    });
};
exports.default = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
};
//# sourceMappingURL=verifyToken.js.map