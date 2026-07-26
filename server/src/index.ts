import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { ENV } from './config/env';
import apiRoutes from './routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

app.use(cors({ origin: ENV.CORS_ORIGIN }));
app.use(express.json());
app.use(morgan('dev'));

// Mount API routes under /api/v1
app.use('/api/v1', apiRoutes);

// Global Error Handler
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(ENV.PORT, () => {
    console.log(`[Buniyad API Engine] Running at http://localhost:${ENV.PORT}/api/v1/health`);
  });
}

export default app;
