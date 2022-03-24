"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
        return response.status(400).json('malformatted id');
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json(error.message);
    }
    else if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({
            error: 'invalid token'
        });
    }
    else if (error.name === 'TokenExpiredError') {
        return response.status(401).json({
            error: 'token expired'
        });
    }
    console.log(error.message);
    next(error);
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map