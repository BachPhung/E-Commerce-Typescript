"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json('malformated id');
    }
    else if (err.name === 'ValidationError') {
        return res.status(400).json(err.message);
    }
    console.log(err.message);
    next();
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map