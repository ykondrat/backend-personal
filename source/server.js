// Core
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import dg from 'debug';

// Routes
import * as domains from './domains';

// Instruments
import { requireJsonContent, NotFoundError, errorLogger } from './helpers';

// Config
import { corsOptions, sessionOptions } from './config';

const app = express();
const debug = dg('server:init');

// change cookie max age for development
if (process.env.NODE_ENV === 'development') {
    sessionOptions.cookie.maxAge = 8 * 60 * 60 * 1000; // 8 hours
}

// secure cookie for production
if (process.env.NODE_ENV === 'production') {
    sessionOptions.cookie.secure = true;
}

app.use(helmet());
app.use(cors(corsOptions));
app.use(
    express.json({
        limit: '10kb',
    }),
);
app.use(session(sessionOptions));
app.use(requireJsonContent);

if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        const body
            = req.method === 'GET' ? 'Body not supported for GET' : JSON.stringify(req.body, null, 2);

        debug(`${req.method}\n${body}`);
        next();
    });
}

app.use('/api/auth', domains.auth);
app.use('/api/staff', domains.staff);
app.use('/api/customers', domains.customers);
app.use('/api/products', domains.products);
app.use('/api/orders', domains.orders);

app.use('*', (req, res, next) => {
    const error = new NotFoundError(
        `Can not find right route for method ${req.method} and path ${req.originalUrl}`,
        404,
    );
    next(error);
});

if (process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-unused-vars
    app.use((error, req, res, next) => {
        const { name, message, statusCode } = error;
        const errorMessage = `${name}: ${message}`;

        debug(`Error: ${errorMessage}`);

        const status = statusCode ? statusCode : 500;
        res.status(status).json({ message: message });
    });
}

// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (error, promise) => {
    errorLogger.error(`${new Date().toISOString()} ${error.name}: ${error.message}`);
});

process.on('uncaughtException', (error) => {
    errorLogger.error(`${new Date().toISOString()} ${error.name}: ${error.message}`);
});

export { app };
