import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import routers from './configs/routers';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './configs/swagger';
import { logging } from './configs/logger';
import cors from 'cors';
import { corsOptions } from './configs/cors';

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (_request: Request, response: Response) => {
  response.send({
    message: 'projeto receitas'
  });
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routers);

app.listen(port, () => {
  logging.info(`Server is running on port ${port}`);
});
