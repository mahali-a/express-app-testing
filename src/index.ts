/* eslint-disable no-console */
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { errorMiddleware } from 'middleware/error-middleware';
import morgan from 'morgan';
import authenticationRoute from 'routes/authentication-routes';
import taskRoute from 'routes/task-routes';
import { LOG_FORMAT, PORT } from 'utils/config';
import validateEnviromentalVariables from 'utils/validate-enviromental-variables';

const app = express();

validateEnviromentalVariables();

// Middlewares
app.use(morgan(LOG_FORMAT));
app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));

app.use(cookieParser());

app.use(errorMiddleware);

app.get('/', (_, response) => response.send('App is running!'));

// API Routes
app.use('/auth', authenticationRoute);
app.use('/task', taskRoute);

app.listen(PORT, () => {
  console.log(`🚀 App is up`);
});

export default app;
