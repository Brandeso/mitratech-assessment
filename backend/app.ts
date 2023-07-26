import express, { Request, Response } from "express";
import dotenv from 'dotenv';
dotenv.config();

import { db } from "./src/db";
import { productModel } from "./models/product";

const _db = db;

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response ) => {
  res.status(200).send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Backend works! Listening on port: ${port}`);
});

app.get('/products', async (req: Request, res: Response) => {
  try {
    const snapData: productModel[] = [];
    const snapshot = await _db.collection('products').get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      snapData.push({ id: doc.id, name: data.name, desc: data.desc, price: data.price });
    })
    res.status(200).send({ msg: "Ok", snapData})
  } catch(error) {
    res.status(500).send({ msg: "Whoops! Something died", error})
  }
})