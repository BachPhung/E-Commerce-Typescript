"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./middlewares/config"));
const auth_1 = __importDefault(require("./routers/auth"));
const user_1 = __importDefault(require("./routers/user"));
const product_1 = __importDefault(require("./routers/product"));
const cart_1 = __importDefault(require("./routers/cart"));
const order_1 = __importDefault(require("./routers/order"));
const stripe_1 = __importDefault(require("./routers/stripe"));
const unknownEndpoints_1 = __importDefault(require("./middlewares/unknownEndpoints"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const logger_1 = __importDefault(require("./middlewares/logger"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
mongoose_1.default.connect(config_1.default.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
    console.log('Connect to database successfully');
    console.log(`Database: ${config_1.default.MONGODB_URI}`);
}).catch(err => console.log(err));
// Routers
app.use(logger_1.default);
app.use('/api/auth', auth_1.default);
app.use('/api/users', user_1.default);
app.use('/api/products', product_1.default);
app.use('/api/carts', cart_1.default);
app.use('/api/orders', order_1.default);
app.use('/api/checkout', stripe_1.default);
app.use(unknownEndpoints_1.default);
app.use(errorHandler_1.default);
app.listen(config_1.default.PORT, () => {
    console.log(`Server is running on port ${config_1.default.PORT}`);
});
//# sourceMappingURL=server.js.map