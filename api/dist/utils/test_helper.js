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
const User_1 = __importDefault(require("../models/User"));
const initialProducts = [
    {
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
    },
    {
        title: "Timberland Core Tree Logo hoode",
        desc: "Act casual, Drawstring hood, Large logo pregular fit",
        img: [
            "https://images.asos-media.com/products/timberland-core-tree-log-blue/200615178-1-midblue?$n_640w$&wid=513&fit=constrain",
            "https://images.asos-media.com/products/timberland-core-tree-logo-hood/200615178-2?$n_640w$&wid=513&fit=constrain"
        ],
        categories: ["Hoodie", "Men"],
        size: ["XS", "S", "M", "L", "XL", "XXL"],
        color: ["darkblue"],
        price: 50
    }
];
const usersInDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.default.find({});
    return users.map(u => u.toJSON());
});
exports.default = {
    initialProducts,
    usersInDb
};
//# sourceMappingURL=test_helper.js.map