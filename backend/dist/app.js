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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db_1 = require("./src/db");
const _db = db_1.db;
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.status(200).send("Hello World!");
});
app.listen(port, () => {
    return console.log(`Backend works! Listening on port: ${port}`);
});
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapData = [];
        const snapshot = yield _db.collection('products').get();
        snapshot.forEach((doc) => {
            const data = doc.data();
            snapData.push({ id: doc.id, name: data.name, desc: data.desc, price: data.price });
        });
        res.status(200).send({ msg: "Ok", snapData });
    }
    catch (error) {
        res.status(500).send({ msg: "Whoops! Something died", error });
    }
}));
//# sourceMappingURL=app.js.map