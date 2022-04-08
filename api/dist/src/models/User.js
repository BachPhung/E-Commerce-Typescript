"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
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
        unique: true
    },
    password: {
        type: String,
        minlength: 8
    },
    avatar: {
        type: String,
        default: ""
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isBanned: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
UserSChema.plugin(uniqueValidator);
exports.default = mongoose_1.model('User', UserSChema);
//# sourceMappingURL=User.js.map