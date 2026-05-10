import express, { Express, Request, Response  } from 'express';
import 'dotenv/config';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (_request: Request, response: Response) => {
  response.send({
    message: 'projeto receitas'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});