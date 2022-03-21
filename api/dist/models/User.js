"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSChema = new mongoose_1.Schema({
    first_name: {
        type: String,
        required: true,
        maxlength: 20
    },
    last_name: {
        type: String,
        required: true,
        maxlength: 20
    },
    username: {
        type: String,
        minlength: 8,
        required: true
    },
    password: {
        type: String,
        minlength: 8
    },
    email: {
        type: String
    },
    avatar: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.default = mongoose_1.model('User', UserSChema);
//# sourceMappingURL=User.js.map