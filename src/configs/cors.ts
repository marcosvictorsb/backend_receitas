import { CorsOptions } from 'cors';

const getCorsOptions = (): CorsOptions => {
  const nodeEnv = process.env.NODE_ENV || 'development';
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:8080',
    'https://receita.gunno.io'
  ];

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      const originTrimmed = origin.trim();

      if (nodeEnv === 'development') {
        return callback(null, true);
      }

      if (allowedOrigins.includes(originTrimmed)) {
        return callback(null, true);
      }

      callback(new Error('CORS not allowed for this origin'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'x-request-id'
    ],
    exposedHeaders: ['x-request-id'],
    maxAge: 86400
  };

  return corsOptions;
};

export default getCorsOptions;
