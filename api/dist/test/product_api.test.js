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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const test_helper_1 = __importDefault(require("../utils/test_helper"));
const supertest_1 = __importDefault(require("supertest"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("../app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../middlewares/config"));
const api = supertest_1.default(app_1.default);
let token;
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    if (config_1.default.SALTROUNDS && config_1.default.TOKENSECRET) {
        yield Product_1.default.deleteMany({});
        yield User_1.default.deleteMany({});
        const password = yield bcrypt_1.default.hash('123456789', Number(config_1.default.SALTROUNDS));
        const user = new User_1.default({
            username: 'rootuser',
            password,
            first_name: "Root",
            last_name: "User",
            email: "root@gmail.com",
            isAdmin: true
        });
        const savedUser = yield user.save();
        token = jsonwebtoken_1.default.sign({
            id: savedUser._id,
            isAdmin: user.isAdmin
        }, config_1.default.TOKENSECRET);
        yield Product_1.default.insertMany(test_helper_1.default.initialProducts);
    }
}));
test('products are returned as json', () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield api
        .get('/api/products')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    expect(res.body).toHaveLength(test_helper_1.default.initialProducts.length);
}));
test('HTTP POST request', () => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = {
        title: "Timberland Core Tree Logo hoodie in dark blue",
        desc: "Act casual, Drawstring hood, Large logo print to chest, Pouch pocket, Regular fit",
        img: [
            "https://images.asos-media.com/products/timberland-core-tree-logo-hoodie-in-dark-blue/200615178-1-midblue?$n_640w$&wid=513&fit=constrain",
            "https://images.asos-media.com/products/timberland-core-tree-logo-hoodie-in-dark-blue/200615178-2?$n_640w$&wid=513&fit=constrain"
        ],
        categories: ["Hoodie", "Men"],
        size: ["XS", "S", "M", "L", "XL", "XXL"],
        color: ["darkblue"],
        price: 79.90
    };
    yield api
        .post('/api/products')
        .send(newProduct)
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .set('authorization', `Bearer ${token}`);
    const res = yield api.get('api/products');
    expect(res.body.length).toBe(3);
}));
afterAll(() => {
    mongoose_1.default.connection.close();
});
//# sourceMappingURL=product_api.test.js.map