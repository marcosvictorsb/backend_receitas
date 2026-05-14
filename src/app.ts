import express, { Express, Request, Response } from 'express';
import 'dotenv/config';
import routers from './configs/routers';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './configs/swagger';
import cors from 'cors';
import { corsOptions } from './configs/cors';

const app: Express = express();

app.use(cors(corsOptions));
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(routers);
app.use((_request: Request, response: Response) => {
  response.status(404).json({ message: 'Endpoint não encontrado' });
});

export { app };
