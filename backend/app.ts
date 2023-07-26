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
  console.log('----- GET -----');
  try {
    const snapData: productModel[] = [];
    const snapshot = await _db.collection('products').get();
    snapshot.forEach((doc) => {
      const data = doc.data();
      snapData.push({ id: doc.id, name: data.name, desc: data.desc, price: data.price });
    })
    res.status(200).send({ msg: "Ok", snapData});
  } catch(error) {
    res.status(500).send({ msg: "Whoops! Something died", error});
  }
});

app.post('/products', async(req: Request, res: Response) => {
  console.log('----- POST -----');
  try {
    const { name, desc, price } = req.body;
    if(name.length < 3 || name.length > 100) {
      res.status(403).send({ msg: "Name must be between 3 and 100 chars!" });
    } else if (desc.length < 5 || desc.length > 1000) {
      res.status(403).send({ msg: "Description must be between 5 and 1000 chars!"});
    } else if (price < 1 || price > 20000) {
      res.status(403).send({ msg: "Price must be in the range of 1 and 20,000!"})
    } else {
      const snapshot = await _db.collection('products').add({
        name,
        desc,
        price
      });
      res.status(200).send({ msg: "Ok", product: { id: snapshot.id,  body: req.body }});
    }
  } catch(error) {
    res.status(500).send({ msg: "Whoops! Something died", error})
  }
});

app.put('/products', async(req: Request, res: Response) => {
  console.log('----- PUT -----');
  try {
    res.status(200).send({ msg: "Ok", todo: 'MISSING IMPLEMENTATION!'});
  } catch(error) {
    res.status(500).send({ msg: "Whoops! Something died", error})
  }
});

app.delete('/products', async(req: Request, res: Response) => {
  console.log('----- DELETE -----');
  try {
    res.status(200).send({ msg: "Ok", todo: 'MISSING IMPLEMENTATION!'});
  } catch(error) {
    res.status(500).send({ msg: "Whoops! Something died", error})
  }
});