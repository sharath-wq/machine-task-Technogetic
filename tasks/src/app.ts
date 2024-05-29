import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { NotFoundError, currentUser, errorHandler } from '@scticketscommon/common';

import { createTaskRouter } from './routes/new';
import { indexTasksRouter } from './routes/index';
import { updateTaskRouter } from './routes/update';
import { showTaskRouter } from './routes/show';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    cookieSession({
        signed: false,
        secure: process.env.NODE_ENV !== 'test',
    })
);

app.use(currentUser);

app.use(createTaskRouter);
app.use(indexTasksRouter);
app.use(updateTaskRouter);
app.use(showTaskRouter);

app.all('*', async () => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
