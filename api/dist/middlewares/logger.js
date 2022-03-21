"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const requestLogger = (req, res, next) => {
    console.log('Method:', req.method);
    console.log('Path', req.path);
    console.log('Body:', req.body);
    console.log('Time:', new Date());
    console.log('------');
    next();
};
exports.default = requestLogger;
//# sourceMappingURL=logger.js.map