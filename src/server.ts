import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import routers from './configs/routers';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_request: Request, response: Response) => {
  response.send({
    message: 'projeto receitas'
  });
});

app.use(routers);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
