"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unknowEndpoint = (req, res) => {
    res.status(404).json('unknown endpoint');
};
exports.default = unknowEndpoint;
//# sourceMappingURL=unknownEndpoints.js.map