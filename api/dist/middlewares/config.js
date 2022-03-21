"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.MONGODB_URI_TEST
    : process.env.MONGODB_URI;
let PORT = process.env.PORT;
let TOKENSECRET = process.env.TOKENSECRET;
let SALTROUNDS = process.env.SALTROUNDS;
const config = {
    MONGODB_URI,
    PORT,
    TOKENSECRET,
    SALTROUNDS
};
exports.default = config;
//# sourceMappingURL=config.js.map