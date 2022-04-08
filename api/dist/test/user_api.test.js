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
const User_1 = __importDefault(require("../src/models/User"));
const test_helper_1 = __importDefault(require("../src/utils/test_helper"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../src/middlewares/config"));
const api = supertest_1.default(app_1.default);
describe('when there is initial one user in db', () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.deleteMany({});
        if (config_1.default.SALTROUNDS) {
            const password = yield bcrypt_1.default.hash('123456789', Number(config_1.default.SALTROUNDS));
            const user = new User_1.default({
                username: 'rootuser',
                password,
                first_name: "Root",
                last_name: "User",
                email: "root@gmail.com"
            });
            yield user.save();
        }
    }));
    test('creation succeeds with a fresh username', () => __awaiter(void 0, void 0, void 0, function* () {
        const usersAtStart = yield test_helper_1.default.usersInDb();
        const newUser = new User_1.default({
            first_name: "Bach",
            last_name: "Phung",
            username: "quangbach4",
            password: "123456789",
            email: "quangbach4@gmail.com"
        });
        yield api
            .post('/api/auth/register')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const usersAtEnd = yield test_helper_1.default.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    }));
    test('creation fail with existed username', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            first_name: "Bach",
            last_name: "Phung",
            username: "rootuser",
            password: "123456789",
            email: "quangbach4@gmail.com"
        };
        const res = yield api
            .post('/api/auth/register')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/);
        expect(res.body.error).toContain('username or email has already existed');
    }));
    test('creation fail with length of username < 8', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = {
            first_name: "Bach",
            last_name: "Phung",
            username: "root",
            password: "123456789",
            email: "quangbach4@gmail.com"
        };
        const res = yield api
            .post('/api/auth/register')
            .send(newUser)
            .expect(401)
            .expect('Content-Type', /application\/json/);
        expect(res.body.error).toContain('Username or Password must be at least 8 chars long');
    }));
    afterAll(() => {
        mongoose_1.default.connection.close();
    });
});
//# sourceMappingURL=user_api.test.js.map