import express, { Request, Response } from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get('/', (req: Request, res: Response ) => {
  res.status(200).send("Hello World!");
});

app.listen(port, () => {
  return console.log(`Backend works! Listening on port: ${port}`);
});
