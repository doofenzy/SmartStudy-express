import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import auth from './routes/UserRoute';
import session from './routes/SessionRoute';

dotenv.config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/auth', auth);
app.use('/api/v1/session', session);

export default app;
