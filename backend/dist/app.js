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
const cors = require("cors");
app.use(express_1.default.json());
app.use(cors({
    origin: true,
    credentials: true,
    methods: 'GET,POST,PUT,DELETE'
}));
app.get('/', (req, res) => {
    res.status(200).send("Hello World!");
});
app.listen(port, () => {
    return console.log(`Backend works! Listening on port: ${port}`);
});
app.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('----- GET -----');
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
app.post('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('----- POST -----');
    try {
        const { name, desc, price } = req.body;
        const validation = validateProduct(name, desc, price);
        if (validation.valid) {
            const snapshot = yield _db.collection('products').add({
                name, desc, price
            });
            res.status(200).send({ msg: "Ok", product: { id: snapshot.id, body: req.body } });
        }
        else {
            res.status(403).send({ msg: validation.msg });
        }
    }
    catch (error) {
        res.status(500).send({ msg: "Whoops! Something died", error });
    }
}));
app.put('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('----- PUT -----');
    try {
        const { id } = req.params, { name, desc, price } = req.body;
        const validation = validateProduct(name, desc, price);
        if (validation.valid) {
            const snapshot = yield _db.collection('products').doc(id).set({
                name, desc, price
            });
            res.status(200).send({ msg: "Ok", snapshot });
        }
        else {
            res.status(403).send({ msg: validation.msg });
        }
    }
    catch (error) {
        res.status(500).send({ msg: "Whoops! Something died", error });
    }
}));
app.delete('/products/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('----- DELETE -----');
    try {
        res.status(200).send({ msg: "Ok", todo: 'MISSING IMPLEMENTATION!' });
    }
    catch (error) {
        res.status(500).send({ msg: "Whoops! Something died", error });
    }
}));
// Added product validation, this shouldnt be used ever as from the front end 
// we also validate the fields, but we never know!
const validateProduct = (name, desc, price) => {
    if (name.length < 3 || name.length > 100) {
        return { valid: false, msg: "Name must be between 3 and 100 chars!" };
    }
    else if (desc.length < 5 || desc.length > 1000) {
        return { valid: false, msg: "Description must be between 5 and 1000 chars!" };
    }
    else if (price < 1 || price > 20000) {
        return { valid: false, msg: "Price must be in the range of 1 and 20,000!" };
    }
    return { valid: true, msg: "Ok!" };
};
//# sourceMappingURL=app.js.map